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
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		try {
			await this.createObjects(objects);
			await this.deleteNonExistentObjects(this.keepList);
			const latlng = await this.getSystemData();
			this.log.debug(JSON.stringify(this.states));

			if (latlng) {
				//const astroEvents = await this.getAstroEvents();
				//this.scheduleForAstro();
			}

			await this.scheduleForTimes();
			await this.scheduleForDates();
		} catch (error) {
			this.log.error(`Could not create objects: ${error}`);
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

	/**
	 * Schedule a job to run every minute to set the times.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>}
	 */
	async scheduleForTimes() {
		const self = this;
		this.scheduleForTimes = schedule.scheduleJob("* * * * *", async function () {
			self.log.debug("[ scheduleForTimes ] Diese Funktion wird jede Minute aufgerufen!");
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
		this.scheduleForDates = schedule.scheduleJob("* * * * *", async function () {
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
		this.scheduleForAstro = schedule.scheduleJob("* * * * *", async function () {
			self.log.debug("[ scheduleForDates ] Set astro times");
		});
	}

	/**
	 * Schedule astro events
	 * @returns {Promise<void>}
	 */
	async getAstroEvents() {
		const times = SunCalc.getTimes(new Date(), this.latitude, this.longitude);

		// Erstelle ein Array mit den Zeiten
		const timeArray = Object.keys(times).map((key) => {
			return { name: key, time: times[key] };
		});

		// Sortiere das Array nach der Uhrzeit
		timeArray.sort((a, b) => {
			return new Date(a.time).getTime() - new Date(b.time).getTime();
		});

		this.log.debug(`[ getAstroTimes ] ${JSON.stringify(timeArray)}`);

		// Gehe alle Zeiten durch
		timeArray.forEach((time) => {
			this.log.debug(`[ getAstroTimes ] ${time.name}: ${time.time}`);
		});

		this.states["04-sunrise"].set("01:00", true);

		for (let i = 0; i < timeArray.length; i++) {
			const astroTime = timeArray[i].time;
			const date = new Date(astroTime);
			const timeString = date.toLocaleTimeString(); // "hh:mm:ss AM/PM"
			// @ts-ignore
			const [time] = timeString.split(" "); // ["hh:mm:ss", "AM/PM"]

			const timeName = timeArray[i].name;
			const stateIndex = (i + 1).toString().padStart(2, "0"); // Index des States z.B. "01", "02", "03"
			const stateName = `${stateIndex}-${timeName}`; // ID des States z.B. "Astro.Times.01-nightEnd"

			this.states[stateName].set(time, true);
		}
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
		this.log.debug(`[ createObjects ] Reaching`);

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
			}
			return true;
		} catch (error) {
			this.log.error(`[ v${this.version} getSystemData ] ${error}`);
			return false;
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
