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
			},
			Astroday: {
				type: "state",
				common: {
					name: {
						en: "Astroday",
						de: "Astrotag",
					},
					type: "boolean",
					role: "state",
					read: true,
					write: false,
					desc: {
						en: "Is now an day?",
						de: "Ist es aktuell Tag?",
					},
					def: true,
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
		},
	},
	Daytimes: {
		type: "channel",
		common: {
			name: {
				en: "daytime",
				de: "Tageszeiten",
			},
			desc: {
				en: "Shows actual daytime in diferent formats",
				de: "Zeigt die aktuelle Tageszeit in versch. Formaten",
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
