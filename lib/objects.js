const objects = {
	channel1: {
		type: "channel",
		common: {
			name: {
				en: "Channel 1 for something",
				de: "Kanal 1 für etwas",
			},
		},
		items: {
			state1: {
				type: "state",
				common: {
					name: {
						en: "State 1",
						de: "Wert 1",
					},
					type: "string",
					role: "value",
					read: true,
					write: true,
					desc: {
						en: "Value for Information",
						de: "Wert für Informationen",
					},
					def: "Test",
				},
			},
			state2: {
				type: "state",
				common: {
					name: {
						en: "State 2",
						de: "Wert 2",
					},
					type: "number",
					role: "value",
					read: true,
					write: true,
					min: 0,
					max: 2000,
					desc: {
						en: "Value for Information",
						de: "Wert für Informationen",
					},
					def: 100,
				},
			},
		},
	},
	state2: {
		type: "state",
		common: {
			name: {
				en: "State 2",
				de: "Wert 2",
			},
			type: "number",
			role: "temperature",
			read: true,
			write: true,
			min: 0,
			max: 100,
			desc: {
				en: "Value for Temperature",
				de: "Wert für Temperatur",
			},
			def: 50,
		},
	},
	state3: {
		type: "state",
		common: {
			name: {
				en: "State 3",
				de: "Wert 3",
			},
			type: "boolean",
			role: "switch",
			read: true,
			write: true,
			desc: {
				en: "Switch for Temperature",
				de: "Schalter für Temperatur",
			},
			def: true,
		},
	},
	device1: {
		type: "device",
		common: {
			name: {
				en: "Device 1 for something",
				de: "Gerät 1 für etwas",
			},
		},
	},
	device2: {
		type: "device",
		common: {
			name: {
				en: "Device 2 for something",
				de: "Gerät 2 für etwas",
			},
		},
	},
};
module.exports = objects;