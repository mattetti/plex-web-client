Handlebars.registerHelper('formatTimestamp', function (timestamp) {
	var msPerMinute = 60 * 1000,
		msPerHour = msPerMinute * 60,
		msPerDay = msPerHour * 24,
		msPerMonth = msPerDay * 30,
		msPerYear = msPerDay * 365,
		today = new Date(),
		date = new Date(timestamp * 1000),
		elapsed = today.getTime() - date.getTime();

	if (elapsed < msPerMinute) {
		return Math.floor(elapsed / 1000) + ' seconds ago';   
	} else if (elapsed < msPerHour) {
		return Math.floor(elapsed / msPerMinute) + ' minutes ago';   
	} else if (elapsed < msPerDay ) {
		return Math.floor(elapsed / msPerHour) + ' hours ago';   
	} else if (elapsed < msPerMonth) {
		return Math.floor(elapsed / msPerDay) + ' days ago';   
	} else if (elapsed < msPerYear) {
		return Math.floor(elapsed / msPerMonth) + ' months ago';   
	} else {
		return Math.floor(elapsed / msPerYear) + ' years ago';   
	}
});