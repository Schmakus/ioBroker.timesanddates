"use strict";

/*
 * Created with @iobroker/create-adapter v2.3.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
const schedule = require("node-schedule");
const SunCalc = require("suncalc2");

const objects = require("./lib/objects.js");
const { daytimes } = require("./lib/daytimes.js");

class Timesanddates extends utils.Adapter {
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "timesanddates",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("unload", this.onUnload.bind(this));

		this.states = {};
		this.keepList = [];
		this.astroScheduleJobs = {};
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		try {
			//check objects.js
			const duplicates = await this.findDuplicateStates(objects);
			if (duplicates.length > 0) {
				this.log.warn(
					`[ onReady ] Duplicate state names found in objects.js, adapter will stop: ${duplicates.join(
						", ",
					)}`,
				);
				this.stop;
				return;
			}
			//Init
			await this.createObjects(objects);
			await this.deleteNonExistentObjects(this.keepList);

			//Get position from system data
			const latlng = await this.getSystemData();

			//Set schedules
			await this.handleEvents(latlng);
		} catch (error) {
			this.log.error(`Could not create objects: ${error}`);
		}
	}

	/**
	 * Go for it
	 * @async
	 * @param {boolean} latlng
	 * @returns {Promise<void>}
	 */
	async handleEvents(latlng) {
		if (!latlng) {
			return;
		}
		const astroTimes = await this.getAstroEvents(); // Heutige Astrozeiten

		if (typeof astroTimes !== "boolean") {
			await this.setCurrentDaytime(astroTimes.timeArray);
			await this.setCurrentSeason();
			await this.setAstroTimes(astroTimes.timeArray);
			await this.setAstroSchedules(astroTimes.timeArray);
		}
		this.scheduleForAstro();
		this.scheduleForTimes();
	}

	/**
	 * Schedule a job to run every minute to set the times.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>}
	 */
	async scheduleForTimes() {
		if (this.scheduleJobForTimes) {
			this.scheduleJobForTimes.cancel();
		}
		await this.setTimes();
		const self = this;
		this.scheduleJobForTimes = schedule.scheduleJob("* * * * *", async function () {
			self.setTimes();
			self.log.debug("[ scheduleForTimes ] Uhrzeit aktualisiert");
		});
	}

	/**
	 * Schedule a job to run every minute to set the dates.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>}
	 */
	async scheduleForDates() {
		const self = this;
		this.scheduleJobForDates = schedule.scheduleJob("* * * * *", async function () {
			self.log.debug("[ scheduleForDates ] Diese Funktion wird jede Minute aufgerufen!");
		});
	}

	/**
	 * Schedule a job to run every minute to set the astro times.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>}
	 */
	async scheduleForAstro() {
		const self = this;
		// CRON every day at 0:00
		this.scheduleForAstro = schedule.scheduleJob("0 0 * * *", async function () {
			const astroTimes = await self.getAstroEvents();
			if (typeof astroTimes !== "boolean") {
				await self.setAstroTimes(astroTimes.timeArray);
				await self.setCurrentSeason();
			}
		});
	}

	/**
	 * Get Astro Events and sorted into array
	 * @param {Date} [date=new Date()] - The date for which to calculate the astro events
	 * @returns {(Promise<object | boolean>)}
	 */
	async getAstroEvents(date = new Date()) {
		try {
			const times = SunCalc.getTimes(date, this.latitude, this.longitude);

			// Erstelle ein Array mit den Zeiten
			const timeArray = Object.keys(times).map((key) => {
				return { name: key, time: times[key] };
			});

			// Sortiere das Array nach der Uhrzeit
			timeArray.sort((a, b) => {
				return new Date(a.time).getTime() - new Date(b.time).getTime();
			});

			this.log.debug(`[ getAstroTimes ] sorted timeArray: ${JSON.stringify(timeArray)}`);

			return {
				timeArray: timeArray,
				times: times,
			};
		} catch (error) {
			this.log.error(`[ v${this.version} getAstroTimes ] Error by getting SunCalc Times: ${error}`);
			return false;
		}
	}

	/**
	 * set astro times
	 * @async
	 * @param {array} timeArray Array with all astro time by name and timeObject
	 * @returns {Promise<void>}
	 */
	async setAstroTimes(timeArray) {
		for (let i = 0; i < timeArray.length; i++) {
			const astroTime = timeArray[i].time;
			const date = new Date(astroTime);
			const hours = String(date.getHours()).padStart(2, "0");
			const minutes = String(date.getMinutes()).padStart(2, "0");
			const timeString = `${hours}:${minutes}`;

			const timeName = timeArray[i].name;
			const stateIndex = (i + 1).toString().padStart(2, "0"); // Index des States z.B. "01", "02", "03"
			const stateName = `${stateIndex}-${timeName}`; // ID des States z.B. "Astro.Times.01-nightEnd"

			await this.states[stateName].set(timeString, true);
		}
	}

	/**
	 * Set astro schedules
	 * @async
	 * @function
	 * @param {array} timeArray Array with all Astro times
	 * @returns {Promise<void>}
	 */
	async setAstroSchedules(timeArray) {
		for (const [index, daytime] of daytimes.entries()) {
			if (this.astroScheduleJobs[daytime.name]) {
				this.astroScheduleJobs[daytime.name].cancel();
			}
			const event = timeArray.find((event) => event.name === daytime.time);
			const scheduleTime = new Date(event.time);
			scheduleTime.setMinutes(scheduleTime.getMinutes() + daytime.shift);

			daytime.scheduleTime = scheduleTime;

			this.astroScheduleJobs[daytime.name] = schedule.scheduleJob(scheduleTime, async () => {
				await this.newDaytime(index);
				this.log.debug(`[ setAstroSchedules ] reached schedule for ${daytime.name} (${daytime.time})`);
				const nextDay = new Date();
				nextDay.setDate(nextDay.getDate() + 1);
				const timeArray = (await this.getAstroEvents(nextDay)).timeArray; // Astrozeiten für morgen
				const event = timeArray.find((event) => event.name === daytime.time);
				const scheduleTime = new Date(event.time);
				scheduleTime.setMinutes(scheduleTime.getMinutes() + daytime.shift);
				this.astroScheduleJobs[daytime.name].reschedule(scheduleTime);
			});

			this.log.debug(`[ setAstroSchedules ] schedule for ${daytime.name} (${daytime.time}) was set`);
		}

		//Set actual an next daytime
		const now = new Date();

		for (let i = 9; i >= 0; i--) {
			if (now >= new Date(daytimes[i].scheduleTime)) {
				await this.newDaytime(i);
				break;
			}
		}
	}

	/**
	 * Set current daytime
	 * @async
	 * @returns {Promise<void>}
	 */
	async setCurrentDaytime(timeArray) {
		const sunset = timeArray.find((time) => time.name === "sunset").time;
		const sunriseEnd = timeArray.find((time) => time.name === "sunriseEnd").time;

		const now = new Date();

		if (now >= new Date(sunriseEnd) && now <= new Date(sunset)) {
			await this.states["Astroday"].set(true, true);
		} else {
			await this.states["Astroday"].set(false, true);
		}
	}

	/**
	 * Set current season
	 * @async
	 * @returns {Promise<void>}
	 */
	async setCurrentSeason() {
		const month = new Date().getMonth() + 1;
		const getSeason = function (month) {
			if (month >= 3 && month <= 5) {
				return { en: "Spring", de: "Frühling" };
			} else if (month >= 6 && month <= 8) {
				return { en: "Summer", de: "Sommer" };
			} else if (month >= 9 && month <= 11) {
				return { en: "Autumn", de: "Herbst" };
			} else {
				return { en: "Winter", de: "Winter" };
			}
		};

		const season = getSeason(month);

		await this.states["Season"].set(this.language === "de" ? season.de : season.en, true);
	}

	/**
	 * Set current and actual daytime
	 * @async
	 * @function
	 * @param {any} daytime
	 * @returns {Promise<void>}
	 * @description "daytimes" beinhaltet die folgenden Tageszeiten: Nacht, Morgendämmerung, Sonnenaufgang, Morgen, Vormittag, Mittag, Nachmittag, Abend, Sonnenuntergang, Abenddämmerung.
	 */
	async newDaytime(daytime) {
		try {
			const current = daytimes[parseInt(daytime, 10)];
			const next = daytime + 1 === daytimes.length ? daytimes[0] : daytimes[parseInt(daytime + 1, 10)];
			await this.states["currentDaytime"].set(this.language === "de" ? current.de : current.en, true);
			await this.states["nextDaytime"].set(this.language === "de" ? next.de : next.en, true);

			this.log.debug(`[ newDaytime ] current: ${current}}, next: ${next}`);
		} catch (error) {
			this.log.error(`[ newDaytime ] ${error}`);
		}
	}

	/**
	 * Set Times
	 *
	 * @async
	 * @returns {Promise<void>} - Resolves when all objects have been created.
	 */
	async setTimes() {
		const date = new Date();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const currentTime = `${hours}:${minutes}`;

		await Promise.all([
			this.states["currentTime"].set(currentTime, true),
			this.states["currentMinute"].set(minutes, true),
			this.states["currentHour"].set(hours, true),
		]);
	}

	/**
	 * Creates objects recursively in the ioBroker object tree.
	 *
	 * @async
	 * @param {Record<string, any>} objects - The objects to be created.
	 * @param {string} [parent=""] - The parent object ID.
	 * @returns {Promise<void>} - Resolves when all objects have been created.
	 */
	async createObjects(objects, parent) {
		for (const [key, value] of Object.entries(objects)) {
			const objectKey = parent ? `${parent}.${key}` : key;

			if (value.type === "state") {
				await this.addStateObject(key, objectKey, value.common);
				this.keepList.push(`${this.namespace}.${objectKey}`);
			} else if (value.type === "folder" || value.type === "device" || value.type === "channel") {
				await this.setObjectNotExistsAsync(objectKey, {
					type: value.type,
					common: value.common,
					native: {},
				});

				this.keepList.push(`${this.namespace}.${objectKey}`);

				if (value.items) {
					// check if the object has child objects
					await this.createObjects(value.items, objectKey);
				}
			}
		}
	}

	/**
	 * Deletes objects that do not exist in the given keepList.
	 *
	 * @async
	 * @param {string[]} keepList - An array of object IDs to keep.
	 * @returns {Promise<void>} - A Promise that resolves after all objects have been deleted.
	 */
	async deleteNonExistentObjects(keepList) {
		this.log.debug(`[ deleteNonExistentObjects ] Reaching`);
		const allObjects = [];
		const objects = await this.getAdapterObjectsAsync();
		for (const o in objects) {
			allObjects.push(objects[o]._id);
		}
		try {
			for (let i = 0; i < allObjects.length; i++) {
				const id = allObjects[i];
				if (keepList.indexOf(id) === -1) {
					await this.delObjectAsync(id, { recursive: true });
					this.log.debug("[ deleteUnusedObjects ] Object deleted " + id);
				}
			}
		} catch (error) {
			this.log.error(error);
		}
	}

	/**
	 * Adds a new state object to the states array and sets a new state if it does not already exist or if the common info has changed.
	 * @async
	 * @param {string} key - The key of the state object to add.
	 * @param {string} objectKey - The object key of the state object to add.
	 * @param {ioBroker.StateCommon} common_new - The new common object for the state object.
	 * @returns {Promise<void>}
	 * @example
	 * await this.addStateObject("myState", "test.0.myState", { type: "number", name: "My State", role: "value" });
	 */
	async addStateObject(key, objectKey, common_new) {
		const common_old = (await this.getObjectAsync(objectKey))?.common || {};

		if (JSON.stringify(common_old) !== JSON.stringify(common_new)) {
			this.log.debug(
				`[ addStateObject ] common_old: ${JSON.stringify(common_old)}, common_new: ${JSON.stringify(
					common_new,
				)}`,
			);
			await this.setObjectAsync(objectKey, {
				type: "state",
				common: common_new,
				native: {},
			});
		}

		this.states[key] = {
			id: objectKey,
			get: async () => {
				try {
					const state = await this.getStateAsync(objectKey);
					if (state) {
						return {
							val: state.val,
							ts: state.ts,
							from: state.from,
							ack: state.ack,
							ls: state.ts,
						};
					}
					return null;
				} catch (error) {
					this.log.error(`Error getting state for ${objectKey}: ${error}`);
				}
			},
			set: async (value, ack) => {
				try {
					await this.setStateAsync(objectKey, value, ack);
				} catch (error) {
					this.log.error(`Error setting state for ${objectKey}: ${error}`);
				}
			},
		};
	}

	/**
	 * Removes the adapter's namespace from a given ID.
	 *
	 * @async
	 * @param {string} id - The ID to remove the namespace from.
	 * @returns {Promise<string>} The ID without the adapter's namespace.
	 */
	async removeNamespace(id) {
		const re = new RegExp(this.namespace + "*\\.", "g");
		return id.replace(re, "");
	}

	/**
	 * Check for duplicates in objects.js
	 *
	 * @async
	 * @function
	 * @param {object} obj Object with all states
	 * @returns {Promise<any>} The ID without the adapter's namespace.
	 */
	async findDuplicateStates(obj, stateSet = new Set(), duplicates = []) {
		for (const key in obj) {
			const value = obj[key];
			if (typeof value === "object") {
				if (value.type === "state") {
					if (stateSet.has(key)) {
						duplicates.push(key);
					} else {
						stateSet.add(key);
					}
				} else {
					await this.findDuplicateStates(value, stateSet, duplicates);
				}
			}
		}
		return duplicates;
	}

	/**
	 * Get System Longitude and Latitute
	 *
	 * @async
	 * @returns {Promise<boolean>}
	 */
	async getSystemData() {
		try {
			const obj = await this.getForeignObjectAsync("system.config");

			if (obj && obj.common) {
				if (obj.common.longitude && obj.common.latitude) {
					this.longitude = obj.common.longitude;
					this.latitude = obj.common.latitude;

					this.log.debug(`[ getSystemData ] longitude: ${this.longitude} | latitude: ${this.latitude}`);
				} else {
					this.log.warn(
						"[ getSystemData ] System settings cannot be called up (Longitute, Latitude). Please check your ioBroker configuration!",
					);
				}

				if (obj.common.dateFormat) {
					this.dateFormat = obj.common.dateFormat;
					this.log.debug(`[ getSystemData ] dateFormat: ${this.dateFormat}`);
				} else {
					this.dateFormat = "DD.MM.YYYY";
					this.log.debug(`[ getSystemData ] dateFormat: ${this.dateFormat}`);
				}

				if (obj.common.language) {
					this.language = obj.common.language;
				} else {
					this.language = "de";
				}
			}
			return true;
		} catch (error) {
			this.log.error(`[ v${this.version} getSystemData ] ${error}`);
			return false;
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			schedule.gracefulShutdown();

			callback();
		} catch (e) {
			callback();
		}
	}

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Timesanddates(options);
} else {
	// otherwise start the instance directly
	new Timesanddates();
}
