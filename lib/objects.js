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
					def: "please wait",
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
					def: "please wait",
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
				en: "Shows actual date values",
				de: "Zeigt aktuelle Datums-Werte",
			},
		},
		items: {
			Date: {
				type: "channel",
				common: {
					name: {
						en: "Date",
						de: "Datum",
					},
					desc: {
						en: "Shows actual date in diferent formats",
						de: "Zeigt das aktuelle Datum in versch. Formaten",
					},
				},
				items: {
					short: {
						type: "state",
						common: {
							name: {
								en: "short date",
								de: "Datum kurzform",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows short date",
								de: "Zeigt das aktuelle Datum in Kurzform",
							},
							def: "01.01.2023",
						},
					},
					dateLong: {
						type: "state",
						common: {
							name: {
								en: "long date",
								de: "Datum langform",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows long date",
								de: "Zeigt das aktuelle Datum in Langform",
							},
							def: "01. Januar 2023",
						},
					},
					veryShortDate: {
						type: "state",
						common: {
							name: {
								en: "very short date",
								de: "Datum sehr kurz",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows very short date",
								de: "Zeigt das aktuelle Datum in sehr kurz",
							},
							def: "1.1.23",
						},
					},
					weekdayDate: {
						type: "state",
						common: {
							name: {
								en: "weekday date",
								de: "Datum mit Wochentag",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows date with weekday",
								de: "Zeigt das aktuelle Datum mit Wochentag",
							},
							def: "Mittwoch, 12. April 2023",
						},
					},
					weekdayTheDate: {
						type: "state",
						common: {
							name: {
								en: "weekday date",
								de: "Datum mit Wochentag",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows date with weekday",
								de: "Zeigt das aktuelle Datum mit Wochentag",
							},
							def: "Mittwoch, der 12. April 2023",
						},
					},
				},
			},
			Year: {
				type: "channel",
				common: {
					name: {
						en: "Year",
						de: "Jahr",
					},
					desc: {
						en: "Shows actual year in diferent formats",
						de: "Zeigt das aktuelle Jahr in versch. Formaten",
					},
				},
				items: {
					year: {
						type: "state",
						common: {
							name: {
								en: "current year",
								de: "aktuelles Jahr",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows current year",
								de: "Zeigt das aktuelle Jahr",
							},
							def: "2023",
						},
					},
					yearShort: {
						type: "state",
						common: {
							name: {
								en: "current year short",
								de: "aktuelles Jahr kurzform",
							},
							type: "string",
							role: "value.time",
							read: true,
							write: false,
							desc: {
								en: "Shows current year in short form",
								de: "Zeigt das aktuelle Jahr in Kurzform",
							},
							def: "23",
						},
					},
					leapYear: {
						type: "state",
						common: {
							name: {
								en: "leap year?",
								de: "Schaltjahr?",
							},
							type: "boolean",
							role: "state",
							read: true,
							write: false,
							desc: {
								en: "It's current year a leap year?",
								de: "Ist das aktuelle Jahr ein Schaltjahr?",
							},
							def: false,
						},
					},
				},
			},
			Month: {
				type: "channel",
				common: {
					name: {
						en: "Month",
						de: "Monat",
					},
					desc: {
						en: "Shows actual month in diferent formats",
						de: "Zeigt den aktuellen Monat in versch. Formaten",
					},
				},
				items: {
					Future: {
						type: "channel",
						common: {
							name: {
								en: "Future",
								de: "Zukunft",
							},

							desc: {
								en: "Shows number of coming months",
								de: "Zeigt die Anzahl der kommenden Monate",
							},
						},
						items: {
							percentageMonthFuture: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of coming months of the year",
										de: "Anteil kommende Monate im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberMonthFuture: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of coming months in the year",
										de: "Anzahl kommende Monate im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					Past: {
						type: "channel",
						common: {
							name: {
								en: "Past",
								de: "Vergangenheit",
							},

							desc: {
								en: "Shows number of the past months",
								de: "Zeigt die Anzahl der vergangenen Monate",
							},
						},
						items: {
							percentageMonthPast: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of previous months of the year",
										de: "Anteil vergangene Monate im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberMonthPast: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of past months in the year",
										de: "Anzahl vergangene Monate im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					numberMonthYear: {
						type: "state",
						common: {
							name: {
								en: "Number",
								de: "Anzahl",
							},
							type: "number",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Number of months in the year",
								de: "Anzahl Monate im Jahr",
							},
							def: 0,
						},
					},
					currentMonthNameLong: {
						type: "state",
						common: {
							name: {
								en: "Month name long",
								de: "Name Monat lang",
							},
							type: "string",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Name of current month - long",
								de: "Name des aktuellen Monats - lang",
							},
							def: "January",
						},
					},
					currentMonthNameShort: {
						type: "state",
						common: {
							name: {
								en: "Month name short",
								de: "Name Monat kurz",
							},
							type: "string",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Name of current month - short",
								de: "Name des aktuellen Monats - short",
							},
							def: "January",
						},
					},
					numberCurrentMonth: {
						type: "state",
						common: {
							name: {
								en: "Number",
								de: "Nummer",
							},
							type: "number",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Number of current months",
								de: "Nummer des aktuellen Monats",
							},
							def: 0,
						},
					},
					stringCurrentMonth: {
						type: "state",
						common: {
							name: {
								en: "Number",
								de: "Nummer",
							},
							type: "string",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Number as string of current months",
								de: "Nummer als String des aktuellen Monats",
							},
							def: "01",
						},
					},
					evenMonth: {
						type: "state",
						common: {
							name: {
								en: "even",
								de: "Gerade",
							},
							type: "boolean",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Current month even?",
								de: "Aktueller Monat gerade?",
							},
							def: false,
						},
					},
				},
			},
			Quarter: {
				type: "channel",
				common: {
					name: {
						en: "Quarter",
						de: "Quartal",
					},
					desc: {
						en: "Shows actual quarter in diferent formats",
						de: "Zeigt das aktuelle Quartal in versch. Formaten",
					},
				},
				items: {
					Future: {
						type: "channel",
						common: {
							name: {
								en: "Future",
								de: "Zukunft",
							},

							desc: {
								en: "Shows number of coming quarters",
								de: "Zeigt die Anzahl der kommenden Quartale",
							},
						},
						items: {
							percentageQuarterFuture: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of coming quarters of the year",
										de: "Anteil kommende Quartale im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberQuarterFuture: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of coming quarters in the year",
										de: "Anzahl kommende Quartale im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					Past: {
						type: "channel",
						common: {
							name: {
								en: "Past",
								de: "Vergangenheit",
							},

							desc: {
								en: "Shows number of the past quarters",
								de: "Zeigt die Anzahl der vergangenen Quartale",
							},
						},
						items: {
							percentageQuarterPast: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of previous quarters of the year",
										de: "Anteil vergangene Quartale im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberQuarterPast: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of past quarters in the year",
										de: "Anzahl vergangene Quartale im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					numberCurrentQuarter: {
						type: "state",
						common: {
							name: {
								en: "Number",
								de: "Nummer",
							},
							type: "number",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Number of current quarter",
								de: "Nummer des aktuellen Quartals",
							},
							def: 0,
						},
					},
					evenQuarter: {
						type: "state",
						common: {
							name: {
								en: "even",
								de: "Gerade",
							},
							type: "boolean",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Current quarter even?",
								de: "Aktuelles Quartal gerade?",
							},
							def: false,
						},
					},
				},
			},
			Day: {
				type: "channel",
				common: {
					name: {
						en: "Week",
						de: "Woche",
					},
					desc: {
						en: "Shows actual day in diferent formats",
						de: "Zeigt den aktuellen Tag in versch. Formaten",
					},
				},
				items: {
					Year: {
						type: "channel",
						common: {
							name: {
								en: "Year",
								de: "Jahr",
							},

							desc: {
								en: "Shows the current day relative to the year",
								de: "Zeigt den aktuellen Tag bezogen auf das Jahr",
							},
						},
						items: {
							Future: {
								type: "channel",
								common: {
									name: {
										en: "Future",
										de: "Zukunft",
									},
									desc: {
										en: "Shows number of coming days",
										de: "Zeigt die Anzahl der kommenden Tage",
									},
								},
								items: {
									percentageDaysYearFuture: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of coming days of the year",
												de: "Anteil kommende Tage im Jahr",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysYearFuture: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of coming days in the year",
												de: "Anzahl kommende Tage im Jahr",
											},
											def: 0,
										},
									},
								},
							},
							Past: {
								type: "channel",
								common: {
									name: {
										en: "Past",
										de: "Vergangenheit",
									},
									desc: {
										en: "Shows number of the past days",
										de: "Zeigt die Anzahl der vergangenen Tage",
									},
								},
								items: {
									percentageDaysYearPast: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of previous days of the year",
												de: "Anteil vergangene Tage im Jahr",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysYearPast: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of past days in the year",
												de: "Anzahl vergangene Tage im Jahr",
											},
											def: 0,
										},
									},
								},
							},
							numberCurrentDayYear: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Nummer",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of current day in the year",
										de: "Nummer des aktuellen Tags im Jahr",
									},
									def: 0,
								},
							},
							numberDaysYear: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of days in the year",
										de: "Anzahl Tage im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					Month: {
						type: "channel",
						common: {
							name: {
								en: "Month",
								de: "Monat",
							},

							desc: {
								en: "Shows the current day relative to the month",
								de: "Zeigt den aktuellen Tag bezogen auf den Monat",
							},
						},
						items: {
							Future: {
								type: "channel",
								common: {
									name: {
										en: "Future",
										de: "Zukunft",
									},
									desc: {
										en: "Shows number of coming days",
										de: "Zeigt die Anzahl der kommenden Tage",
									},
								},
								items: {
									percentageDaysMonthFuture: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of coming days of the month",
												de: "Anteil kommende Tage im Monat",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysMonthFuture: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of coming days in the month",
												de: "Anzahl kommende Tage im Monat",
											},
											def: 0,
										},
									},
								},
							},
							Past: {
								type: "channel",
								common: {
									name: {
										en: "Past",
										de: "Vergangenheit",
									},
									desc: {
										en: "Shows number of the past days",
										de: "Zeigt die Anzahl der vergangenen Tage",
									},
								},
								items: {
									percentageDaysMonthPast: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of previous days of the month",
												de: "Anteil vergangene Tage im Monat",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysMonthPast: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of past days in the month",
												de: "Anzahl vergangene Tage im Monat",
											},
											def: 0,
										},
									},
								},
							},
							numberCurrentDayMonth: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Nummer",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of current day in the month",
										de: "Nummer des aktuellen Tags im Monat",
									},
									def: 0,
								},
							},
							numberDaysMonth: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of days in the month",
										de: "Anzahl Tage im Monat",
									},
									def: 0,
								},
							},
						},
					},
					Week: {
						type: "channel",
						common: {
							name: {
								en: "Week",
								de: "Woche",
							},

							desc: {
								en: "Shows the current day relative to the week",
								de: "Zeigt den aktuellen Tag bezogen auf die Woche",
							},
						},
						items: {
							Future: {
								type: "channel",
								common: {
									name: {
										en: "Future",
										de: "Zukunft",
									},
									desc: {
										en: "Shows number of coming days",
										de: "Zeigt die Anzahl der kommenden Tage",
									},
								},
								items: {
									percentageDaysWeekFuture: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of coming days of the week",
												de: "Anteil kommende Tage in der Woche",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysWeekFuture: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of coming days in the week",
												de: "Anzahl kommende Tage in der Woche",
											},
											def: 0,
										},
									},
								},
							},
							Past: {
								type: "channel",
								common: {
									name: {
										en: "Past",
										de: "Vergangenheit",
									},
									desc: {
										en: "Shows number of the past days",
										de: "Zeigt die Anzahl der vergangenen Tage",
									},
								},
								items: {
									percentageDaysWeekPast: {
										type: "state",
										common: {
											name: {
												en: "Percentage",
												de: "Anteil",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Percentage of previous days of the week",
												de: "Anteil vergangene Tage in der Woche",
											},
											def: 0,
											unit: "%",
										},
									},
									numberDaysWeekPast: {
										type: "state",
										common: {
											name: {
												en: "Number",
												de: "Anzahl",
											},
											type: "number",
											role: "value",
											read: true,
											write: false,
											desc: {
												en: "Number of past days in the week",
												de: "Anzahl vergangene Tage in der Woche",
											},
											def: 0,
										},
									},
								},
							},
							numberCurrentDayWeek: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Nummer",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of current day in the week",
										de: "Nummer des aktuellen Tags in der Woche",
									},
									def: 0,
								},
							},
							numberDaysWeek: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of days in the week",
										de: "Anzahl Tage in der Woche",
									},
									def: 0,
								},
							},
						},
					},
					evenDay: {
						type: "state",
						common: {
							name: {
								en: "even",
								de: "Gerade",
							},
							type: "boolean",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Current day even?",
								de: "Aktueller Tag gerade?",
							},
							def: false,
						},
					},
					dayName: {
						type: "state",
						common: {
							name: {
								en: "name",
								de: "Name",
							},
							type: "string",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "name of the current day",
								de: "Name des aktuellen Tags",
							},
							def: "",
						},
					},
					holiday: {
						type: "state",
						common: {
							name: {
								en: "holiday",
								de: "Feiertag",
							},
							type: "string",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Is current day a holiday?",
								de: "Ist der aktuelle Tag ein Feiertag?",
							},
							def: "",
						},
					},
				},
			},
			Week: {
				type: "channel",
				common: {
					name: {
						en: "Week",
						de: "Woche",
					},
					desc: {
						en: "Shows actual week in diferent formats",
						de: "Zeigt die aktuelle Woche in versch. Formaten",
					},
				},
				items: {
					Future: {
						type: "channel",
						common: {
							name: {
								en: "Future",
								de: "Zukunft",
							},
							desc: {
								en: "Shows number of coming weeks",
								de: "Zeigt die Anzahl der kommenden Wochen",
							},
						},
						items: {
							percentageWeeksFuture: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of coming weeks of the year",
										de: "Anteil kommenden Wochen im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberWeeksFuture: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of coming weeks in the year",
										de: "Anzahl kommenden Wochen im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					Past: {
						type: "channel",
						common: {
							name: {
								en: "Past",
								de: "Vergangenheit",
							},
							desc: {
								en: "Shows number of the past weeks",
								de: "Zeigt die Anzahl der vergangenen Wochen",
							},
						},
						items: {
							percentageWeeksPast: {
								type: "state",
								common: {
									name: {
										en: "Percentage",
										de: "Anteil",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Percentage of previous weeks of the year",
										de: "Anteil vergangener Wochen im Jahr",
									},
									def: 0,
									unit: "%",
								},
							},
							numberWeeksPast: {
								type: "state",
								common: {
									name: {
										en: "Number",
										de: "Anzahl",
									},
									type: "number",
									role: "value",
									read: true,
									write: false,
									desc: {
										en: "Number of past weeks in the year",
										de: "Anzahl vergangener Wochen im Jahr",
									},
									def: 0,
								},
							},
						},
					},
					numberCalendarWeek: {
						type: "state",
						common: {
							name: {
								en: "Calendar week",
								de: "Kalenderwoche",
							},
							type: "number",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Shows current number of calendar week",
								de: "Zeigt die aktuelle Kalenderwoche",
							},
							def: 0,
						},
					},
					evenWeek: {
						type: "state",
						common: {
							name: {
								en: "even",
								de: "Gerade",
							},
							type: "boolean",
							role: "value",
							read: true,
							write: false,
							desc: {
								en: "Current week even?",
								de: "Aktuelle Woche gerade?",
							},
							def: false,
						},
					},
				},
			},
		},
	},
};
module.exports = objects;
