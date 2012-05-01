define(
	function () {
		return {
			truncate: function (str, len) {
				if (str.length > len) {
					var truncated = str.substring(0, len);

					if (truncated.charAt(truncated.length - 1) === ' ') {
						truncated = truncated.slice(0, -1);
					}

					return truncated + '...';
				} else {
					return str;
				}
			}
		}
	}
);