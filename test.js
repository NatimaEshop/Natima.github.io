/*if (document.querySelector("body.in-krok-1")) {
	if (document.body.classList.contains("cs")) {
		if ($('option[value="151"][selected="selected"]').length) {
			$("body").addClass("hiddenCartOptions");
			let appendElement = $(
				"<div class='also-deliver-country'><p>Doručujeme také na Slovensko. Je ovšem potřeba nakoupit na natima.sk. <a href='https://www.natima.sk'>Přejít na natima.sk</a></p></div>"
			);
			appendElement.insertAfter("#select-country-payment");
		}
	}
}
*/

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
			console.info(
				"Doplněk Shoptet: Počet přečtení článku - Nastavení neumožňuje zobrazit statistiky pro veřejné publikum."
			);
		}
	}

	getViewCountCustom();
	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		$("time").wrap("<div class='news-info'></div>");
		getViewCountCustom();
	});
}
