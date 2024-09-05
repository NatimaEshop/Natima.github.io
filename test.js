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

/* 
!function(a, b, c) {
    var d = a("html").attr("lang")
      , e = "";
    if ("cs" === d && (e = "čtení"),
    "en" === d && (e = "reading"),
    "de" === d && (e = "lesen"),
    "sk" === d && (e = "čítanie"),
    "hu" === d && (e = "olvasás"),
    "ru" === d && (e = "чтения"),
    "vi" === d && (e = "đọc"),
    "pl" === d && (e = "czytania"),
    a(b).load(function() {
        var b = function() {
            a(".news-item").length && a(".news-item").each(function() {
                var b = a(this)
                  , c = a(this).find(".description").text()
                  , d = c.replace(/[^\w ]/g, "").split(/\s+/).length
                  , f = Math.floor(d / 200) + 1
                  , g = f + " min";
                if (b.find(".reading-time").length || (b.find("time").length ? a('<div class="reading-time"><img src="https://cdn.myshoptet.com/usr/shoptet.tomashlad.eu/user/documents/extras/reading-time/img/clock.svg?v3" />' + g + " " + e + "</div>").insertAfter(b.find("time")) : a('<div class="reading-time"><img src="https://cdn.myshoptet.com/usr/shoptet.tomashlad.eu/user/documents/extras/reading-time/img/clock.svg?v3" />' + g + " " + e + "</div>").insertAfter(b.find(".title"))),
                b.find("#pobo-all-content").length) {
                    var h = b.find("#pobo-all-content").text()
                      , i = h.replace(/\n/g, "");
                    b.find(".description").html("<p>" + i + "</p>")
                }
                if (b.find(".rc-image-right").length) {
                    var j = b.find(".description").text()
                      , k = j.replace(/\n/g, "");
                    b.find(".description").html("<p>" + k + "</p>")
                }
                if (b.find(".rc-image-half-right").length) {
                    var l = b.find(".description").text()
                      , m = l.replace(/\n/g, "");
                    b.find(".description").html("<p>" + m + "</p>")
                }
            })
        };
        b(),
        c.addEventListener("ShoptetDOMContentLoaded", function() {
            b()
        })
    }),
    a(".type-post").length) {
        var f = a(".news-item-detail .text").text()
          , g = f.replace(/[^\w ]/g, "").split(/\s+/).length
          , h = Math.floor(g / 200) + 1
          , i = h + " min";
        a(".type-post").find("time").length ? a('<div class="reading-time"><img src="https://cdn.myshoptet.com/usr/shoptet.tomashlad.eu/user/documents/extras/reading-time/img/clock.svg?v3" />' + i + " " + e + "</div>").insertAfter(a("time")) : a('<div class="reading-time"><img src="https://cdn.myshoptet.com/usr/shoptet.tomashlad.eu/user/documents/extras/reading-time/img/clock.svg?v3" />' + i + " " + e + "</div>").insertAfter(a('h1[itemprop="headline"]'))
    }
}(window.jQuery, window, document);
*/
