const daytimes = [
	{ name: "Night", time: "nauticalDusk", shift: 45, de: "Nacht", en: "night" },
	{ name: "Dawn", time: "nauticalDawn", shift: -45, de: "Morgendämmerung", en: "dawn" },
	{ name: "Sunrise", time: "sunrise", shift: 0, de: "Sonnenaufgang", en: "sunrise" },
	{ name: "Morning", time: "sunriseEnd", shift: 0, de: "Morgen", en: "morning" },
	{ name: "LateMorning", time: "goldenHourEnd", shift: 60, de: "Vormittag", en: "late morning" },
	{ name: "Midday", time: "solarNoon", shift: -30, de: "Mittag", en: "midday" },
	{ name: "Afternoon", time: "solarNoon", shift: 30, de: "Nachmittag", en: "afternoon" },
	{ name: "Evening", time: "goldenHour", shift: -30, de: "Abend", en: "evening" },
	{ name: "Sunset", time: "sunsetStart", shift: 0, de: "Sonnenuntergang", en: "sunset" },
	{ name: "Dusk", time: "sunset", shift: 0, de: "Abenddämmerung", en: "dusk" },
];

const daytimes2 = {
	Night: { time: "nauticalDusk", shift: 45, de: "Nacht", en: "night" },
	Dawn: { time: "nauticalDawn", shift: -45, de: "Morgendämmerung", en: "dawn" },
	Sunrise: { time: "sunrise", shift: 0, de: "Sonnenaufgang", en: "sunrise" },
	Morning: { time: "sunriseEnd", shift: 0, de: "Morgen", en: "morning" },
	LateMorning: { time: "goldenHourEnd", shift: 60, de: "Vormittag", en: "late morning" },
	Midday: { time: "solarNoon", shift: -30, de: "Mittag", en: "midday" },
	Afternoon: { time: "solarNoon", shift: 30, de: "Nachmittag", en: "afternoon" },
	Evening: { time: "goldenHour", shift: -30, de: "Abend", en: "evening" },
	Sunset: { time: "sunsetStart", shift: 0, de: "Sonnenuntergang", en: "sunset" },
	Dusk: { time: "sunset", shift: 0, de: "Abenddämmerung", en: "dusk" },
};
module.exports = { daytimes, daytimes2 };
