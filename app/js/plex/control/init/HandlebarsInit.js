define(
	[
		'plex/control/Transcoder',

		// Globals
		'use!handlebars'
	],

	function (transcoder) {

		Handlebars.registerHelper('eq', function (arg1, arg2, ok, bad) {
			if (arg1 === arg2)
			{
				return new Handlebars.SafeString(ok);
			}
			
			return new Handlebars.SafeString(bad);
		});

		Handlebars.registerHelper('if_eq', function (item, value, block) {
			if (item === value) {
				return block(item);
			}
		});

		Handlebars.registerHelper('timeAgo', function (timestamp) {
			var msPerMinute = 60 * 1000,
				msPerHour = msPerMinute * 60,
				msPerDay = msPerHour * 24,
				msPerMonth = msPerDay * 30,
				msPerYear = msPerDay * 365,
				today = new Date(),
				date = new Date(timestamp * 1000),
				elapsed = today.getTime() - date.getTime(),
				r;

			if (elapsed < msPerMinute) {
				r = Math.floor(elapsed / 1000);
				return (r === 1) ? (r + ' second ago') : (r + ' seconds ago');
			} else if (elapsed < msPerHour) {
				r = Math.floor(elapsed / msPerMinute);
				return (r === 1) ? (r + ' minute ago') : (r + ' minutes ago');
			} else if (elapsed < msPerDay ) {
				r = Math.floor(elapsed / msPerHour);
				return (r === 1) ? (r + ' hour ago') : (r + ' hours ago');
			} else if (elapsed < msPerMonth) {
				r = Math.floor(elapsed / msPerDay);
				return (r === 1) ? (r + ' day ago') : (r + ' days ago');
			} else if (elapsed < msPerYear) {
				r = Math.floor(elapsed / msPerMonth);
				return (r === 1) ? (r + ' month ago') : (r + ' months ago');
			} else {
				r = Math.floor(elapsed / msPerYear);
				return (r === 1) ? (r + ' year ago') : (r + ' years ago');
			}
		});

		Handlebars.registerHelper('truncate', function (title, len) {
			if (title.length > len) {
				var truncated = title.substring(0, len);

				if (truncated.charAt(truncated.length - 1) === ' ') {
					truncated = truncated.slice(0, -1);
				}

				return truncated + '...';
			} else {
				return title;
			}
		});

		Handlebars.registerHelper('formatDuration', function (milliseconds) {
			var seconds = Math.floor((milliseconds / 1000) % 60),
				minutes = Math.floor((milliseconds / 1000 / 60) % 60),
				hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24),
				duration = '';

			if (seconds < 10) {
				duration = ':0' + seconds;
			} else {
				duration = ':' + seconds;
			}

			if (minutes < 10 && hours > 0) {
				duration = '0' + minutes;
			} else {
				duration = minutes + duration;
			}

			if (hours > 0) {
				duration = hours + ':' + duration;
			}

			return duration;
		});

		Handlebars.registerHelper('formatDate', function (date) {
			var parsed = Date.parse(date);

			if (parsed) {
				return parsed.toString('MMM d, yyyy');
			} else {
				return 'Unknown';
			}
		});

		Handlebars.registerHelper('transcodeImage', function (path, width, height) {
			return transcoder.image(path, width, height);
		});

		Handlebars.registerHelper('starRating', function (rating) {
			// Ratings will usually be 4 or 5 stars so distribute the ratings a little more to give some variety
			var normalized = Math.round(rating - 4);
			var starRating = '';

			for (var i = 0; i < 5; i++) {
				if (i < normalized) {
					starRating += '<span class="star selected">&#9733;</span>';
				} else {
					starRating += '<span class="star">&#9733;</span>';
				}
			}

			return new Handlebars.SafeString(starRating);
		});
	}
);