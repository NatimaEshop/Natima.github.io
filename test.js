/*----------------------------------------------------------------------------Pocet přečtení článků na blogové stránce*/
if (document.body.classList.contains("type-posts-listing")) {
	//every <time> wrap in div with class news-info
	$("time").wrap("<div class='news-info'></div>");

	function isAdminCheckCustom() {
		if (getShoptetDataLayer("traffic_type") === "internal") {
			return false;
		} else {
			return true;
		}
	}
	let shopUrl = window.location.origin;
	function getViewCountCustom() {
		$(".news-item").each(function () {
			let newsItem = $(this);
			let articleUrl = newsItem.find(".image a").attr("href");
			let strippedUrl = articleUrl.replace(shopUrl, "");

			$.ajax({
				url: "https://doplnky.applypark.cz/shoptet/pocet-precteni-clanku/api/getPublicView/",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				type: "GET",
				data: {
					eId: _applypark,
					uP: strippedUrl,
				},
				cache: isAdminCheckCustom(),
				crossDomain: true,
				success: function (data) {
					handleDataGETCustom(data, newsItem);
				},
			});
		});
	}
	function handleDataGETCustom(data, newsItem) {
		var initialDelay = 6000;
		var updatedDelay = 80000;
		var delayChanged = false;

		if (data.response == 200) {
			newsItem.find(".news-info").append('<div class="blog-read"><span>' + data.publicStats + "</span></div>");
		}
		if (data.response == 404) {
			setTimeout(getViewCountCustom, delayChanged ? updatedDelay : initialDelay);
		}
		if (data.response == 403) {
			console.info("Statistiky nejsou veřejné");
		}
	}
	getViewCountCustom();
	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		$("time").wrap("<div class='news-info'></div>");
		getViewCountCustom();
	});
}
/*----------------------------------------------------------------------------KONEC Pocet přečtení článků na blogové stránce*/

/*
if (document.body.classList.contains("type-posts-listing")) {
	!(function (a, b, c) {
		if (
			(
			a(b).load(function () {
				var b = function () {
					a(".news-item").length &&
						a(".news-item").each(function () {
							var b = a(this),
								c = a(this).find(".description").text(),
								d = c.replace(/[^\w ]/g, "").split(/\s+/).length,
								f = Math.floor(d / 200) + 1,
								g = f + " min";
							if (
								(b.find(".reading-time").length ||
									(b.find("time").length
										? a(
												'<div class="reading-time">' +
													g +
													'</div>'
										  ).insertAfter(b.find("time"))
										: a(
											'<div class="reading-time">' +
											g +
											'</div>'
										  ).insertAfter(b.find(".title")))
								)
							) 
						});
				};
				b(),
					c.addEventListener("ShoptetDOMContentLoaded", function () {
						b();
					});
			}),
			a(".type-post").length)
		) 
	})(window.jQuery, window, document);
}
*/

/*-------------------doba cteni až nebude žádný starý článek*/
/*
if (document.body.classList.contains("type-posts-listing")) {
    (function ($, window, document) {
        $(document).ready(function () {
            function calculateReadingTime() {
                $(".news-item").each(function () {
                    var $newsItem = $(this);
                    var descriptionText = $newsItem.find(".description").text();
                    var wordCount = descriptionText.replace(/[^\w ]/g, "").split(/\s+/).length;
                    var readingTime = Math.floor(wordCount / 135)  + " min";

                    if (!$newsItem.find(".reading-time").length) {
                        var $readingTimeDiv = $('<div class="reading-time">' + readingTime + '</div>');
                        if ($newsItem.find("time").length) {
                            $readingTimeDiv.insertAfter($newsItem.find("time"));
                        } else {
                            $readingTimeDiv.insertAfter($newsItem.find(".title"));
                        }
                    }
                });
            }

            calculateReadingTime();
            document.addEventListener("ShoptetDOMContentLoaded", calculateReadingTime);
        });
    })(window.jQuery, window, document);
}
	*/
