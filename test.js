if (document.body.classList.contains("type-category")) {
	document.addEventListener("DOMContentLoaded", function () {
		loadNextPageOfProducts();
	});

	function loadNextPageOfProducts() {
		const loadProducts = document.querySelector(".load-products");

		if (loadProducts) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const viewportHeight = window.innerHeight;
							const elementTop = entry.boundingClientRect.top;

							if (elementTop > (viewportHeight * 2) / 3) {
								loadProducts.click();
							}
						}
					});
				},
				{
					threshold: 0.1,
				}
			);

			observer.observe(loadProducts);
		}
	}
}

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
