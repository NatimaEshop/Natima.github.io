/*-----------------------------------------------------------------------Automatické načtení 2. stránku produktů při scrollingu*/
function loadNextPageOfProducts() {
	let loadProducts;
	loadProducts = document.querySelector(".load-products");

	if ($(".lb-pagination__btn").length) {
		loadProducts = document.querySelector(".lb-pagination__btn");
	}

	if (loadProducts) {
		const observerOptions = {
			root: null,
			rootMargin: "-40% 0px",
			threshold: 0,
		};

		const observerCallback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
					loadProducts.click();
					observer.unobserve(loadProducts);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);
		observer.observe(loadProducts);
	}
}

if (document.body.classList.contains("type-category") || document.body.classList.contains("type-manufacturer-detail")) {
	document.addEventListener(
		"DOMContentLoaded",
		function () {
			loadNextPageOfProducts();
		},
		{ once: true }
	);
}
/*cz a sk varianta*/
if (document.body.classList.contains("in-vyhledavani") || document.body.classList.contains("in-vyhledavanie")) {
	document.addEventListener(
		"resizeEnd",
		function () {
			loadNextPageOfProducts();
		},
		{ once: true }
	);
}

document.addEventListener(
	"ShoptetDOMSearchResultsLoaded",
	function () {
		loadNextPageOfProducts();
	},
	{ once: true }
);
/*-----------------------------------------------------------------------KONEC Automatické načtení 2. stránku produktů při scrollingu*/
/*let homeWelcome = $(".home-welcome");
homeWelcome.parent().parent().remove();*/

/*-----------------------------------------------------------------------Zavření shoptet error message*/
// Function to set a session cookie
function setSessionCookie(name, value) {
	document.cookie = name + "=" + value + "; path=/";
}

// Function to get a session cookie
function getSessionCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

// Function to handle the click event
function handleShoptetErrorClose() {
	const errorDiv = document.querySelector(".error-shoptet");
	if (errorDiv) {
		errorDiv.classList.add("display-none");
		setSessionCookie("errorClosed", "true");
	}
}

// On page load, check if the session cookie exists and hide the error message if it does
document.addEventListener("DOMContentLoaded", function () {
	// Attach the click event to the #error-shoptet-close element
	document.querySelector("#error-shoptet-close").addEventListener("click", handleShoptetErrorClose);

	if (getSessionCookie("errorClosed") === "true") {
		const errorDiv = document.querySelector(".error-shoptet");
		if (errorDiv) {
			errorDiv.classList.add("display-none");
		}
	}
});
/*-----------------------------------------------------------------------KONEC Zavření shoptet error message*/

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
