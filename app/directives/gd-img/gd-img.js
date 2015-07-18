angular.module('espacoVC').directive('gdImage', function($http) {
	return {
		scope: {
			placeholder: '@',
			url: '@',
			width: '@',
			height: '@'
		},
		restrict: 'E',
		link: function(scope, elem, attrs) {
			attrs.$observe('url', function (val) {
				if (val) {
					var img = document.createElement('img');
					img.style.width = attrs.width;
					img.style.height = attrs.height;
					img.src = 'img/placeholder.png';
					elem.replaceWith(img);
					$http.get('/proxy?url=' + encodeURIComponent(attrs.url), {'headers':{ 'X-Api-Token':'ncdyzh2XBzpTwDbrvUlSVHh22IkPsNxZDE5KSVsL0aBjXaNq1yVv1oYd68SDbrPERCR92RQwLTd8oGWTYYj4kQ=='}})
					.success(function (data, status, headers, config) {
						img.src = 'data:' + headers('Content-Type') + ';base64,' + data;
					})
					.error(function (data, status, headers, config) {
						
					});	
				}
			});
		}
	};
});