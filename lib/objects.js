const objects = {
	Astro: {
		type: "channel",
		common: {
			name: {
				en: "Astro times",
				de: "Astro Zeiten",
			},
			desc: {
				en: "All astro times",
				de: "Alle Astro Zeiten",
			},
		},
		items: {
			Times: {
				type: "channel",
				common: {
					name: {
						en: "Astro times",
						de: "Astro Zeiten",
					},
					desc: {
						en: "Shows all daily astro times",
						de: "Zeigt alle täglichen Astrozeiten",
					},
				},
				items: {
					"01-nightEnd": {
						type: "state",
						common: {
							name: {
								en: "next night end time",
								de: "nächstes Ende der Nacht Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"02-nauticalDawn": {
						type: "state",
						common: {
							name: {
								en: "next nautical dawn time",
								de: "nächste nautische Morgendämmerung Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"03-dawn": {
						type: "state",
						common: {
							name: {
								en: "next dawn time",
								de: "nächste Morgendämmerung Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"04-sunrise": {
						type: "state",
						common: {
							name: {
								en: "next sunrise time",
								de: "nächster Sonnenaufgang Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"05-sunriseEnd": {
						type: "state",
						common: {
							name: {
								en: "next sunrise end time",
								de: "nächstes Ende Sonnenaufgang Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"06-goldenHourEnd": {
						type: "state",
						common: {
							name: {
								en: "next golden hour end time",
								de: "nächstes Ende der goldenen Stunde Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"07-solarNoon": {
						type: "state",
						common: {
							name: {
								en: "next solar noon time",
								de: "nächster Sonnenhöchststand Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"08-goldenHour": {
						type: "state",
						common: {
							name: {
								en: "next golden hour time",
								de: "nächste Goldene Stunde (am Abend) Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"09-sunsetStart": {
						type: "state",
						common: {
							name: {
								en: "next start sunset time",
								de: "nächster Beginn Sonnenuntergang Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"10-sunset": {
						type: "state",
						common: {
							name: {
								en: "next sunset time",
								de: "nächster Sonnenuntergang Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"11-dusk": {
						type: "state",
						common: {
							name: {
								en: "next dusk time",
								de: "nächste Abenddämmerung Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"12-nauticalDusk": {
						type: "state",
						common: {
							name: {
								en: "next nautical dusk time",
								de: "nächste nautische Abenddämmerung Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"13-night": {
						type: "state",
						common: {
							name: {
								en: "next night time",
								de: "nächste Nacht Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
					"14-nadir": {
						type: "state",
						common: {
							name: {
								en: "next nadir time",
								de: "nächster Nadir Uhrzeit",
							},
							type: "string",
							role: "time",
							read: true,
							write: false,
							def: "00:00",
						},
					},
				},
			},
			Astroday: {
				type: "state",
				common: {
					name: {
						en: "Astroday",
						de: "Astrologischer Tag",
					},
					type: "boolean",
					role: "state",
					read: true,
					write: false,
					desc: {
						en: "Is now an between sunrise and sunset?",
						de: "Liegt die aktuelle Zeit zwischen Sonnenauf- und untergang?",
					},
					def: false,
				},
			},
			Season: {
				type: "state",
				common: {
					name: {
						en: "Season",
						de: "Jahreszeit",
					},
					type: "string",
					role: "state",
					read: true,
					write: false,
					desc: {
						en: "Shows actual season",
						de: "Zeigt die aktuelle Jahrezeit",
					},
					def: true,
				},
			},
			Astrotime: {
				type: "state",
				common: {
					name: {
						en: "Actial astrotime",
						de: "aktuelle Astrozeit",
					},
					type: "string",
					role: "state",
					read: true,
					write: false,
					desc: {
						en: "Shows actual astrotime",
						de: "Zeigt die aktuelle Astrozeit",
					},
					def: true,
				},
			},
		},
	},
	Times: {
		type: "channel",
		common: {
			name: {
				en: "times",
				de: "Uhrzeiten",
			},
			desc: {
				en: "Shows actual time in diferent formats",
				de: "Zeigt die aktuelle Zeit in versch. Formaten",
			},
		},
		items: {
			currentTime: {
				type: "state",
				common: {
					name: {
						en: "Time",
						de: "Uhrzeit",
					},
					type: "string",
					role: "value.time",
					read: true,
					write: false,
					desc: {
						en: "Shows actual time",
						de: "Zeigt die aktuelle Uhrzeit",
					},
					def: "00:00",
				},
			},
			currentMinute: {
				type: "state",
				common: {
					name: {
						en: "Time - minute",
						de: "Uhrzeit - Minute",
					},
					type: "string",
					role: "value.time",
					read: true,
					write: false,
					desc: {
						en: "Shows actual minute",
						de: "Zeigt die aktuelle Minute",
					},
					def: "00",
				},
			},
			currentHour: {
				type: "state",
				common: {
					name: {
						en: "Time - hour",
						de: "Uhrzeit - Stunde",
					},
					type: "string",
					role: "value.time",
					read: true,
					write: false,
					desc: {
						en: "Shows actual hour",
						de: "Zeigt die aktuelle Stunde",
					},
					def: "00",
				},
			},
			currentDaytime: {
				type: "state",
				common: {
					name: {
						en: "Time - actual daytime",
						de: "Uhrzeit - aktuelle Tageszeit",
					},
					type: "string",
					role: "value.time",
					read: true,
					write: false,
					desc: {
						en: "Shows actual daytime",
						de: "Zeigt die aktuelle Tageszeit",
					},
					def: "",
				},
			},
			nextDaytime: {
				type: "state",
				common: {
					name: {
						en: "Time - next daytime",
						de: "Uhrzeit - nächste Tageszeit",
					},
					type: "string",
					role: "value.time",
					read: true,
					write: false,
					desc: {
						en: "Shows next daytime",
						de: "Zeigt die nächste Tageszeit",
					},
					def: "",
				},
			},
		},
	},
	Dates: {
		type: "channel",
		common: {
			name: {
				en: "Dates",
				de: "Datums",
			},
			desc: {
				en: "Shows actual date in diferent formats",
				de: "Zeigt das aktuelle in versch. Formaten",
			},
		},
	},
};
module.exports = objects;
