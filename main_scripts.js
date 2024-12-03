/*hl stránka*/
let allProducts;
function favoritesMove() {
	/*srdicko*/
	allProducts = document.querySelectorAll(".product .p");
	allProducts.forEach((element) => {
		element.appendChild(element.querySelector(".dkLabFavouriteProductDiv"));
	});
}
if (document.body.classList.contains("in-index")) {
	document.addEventListener("DOMContentLoaded", favoritesMove);
}

document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-index")) {
		/*konkurenční výhody přesunutí*/
		$(".body-banners").before($(".benefitBanner"));

		/*Odkazy na kategorie na hlavní stránce*/
		let links = [];
		if (czechEshop) {
			links = ["/novinky/", "/-akce-mesice/", "/dle-zamereni/", "/blog/"];
		}
		if (slovakEshop) {
			links = ["/novinky/", "/--akcie-mesiaca/", "/dla-zamerania/", "/blog/"];
		}
		if (polishEshop) {
			links = ["/nowosci/", "/promocja-miesiaca/", "/dle-zamereni/", "/blog/"];
		}
		$(".homepage-group-title.h4").each(function (index) {
			if (index < links.length) {
				let novyOdkaz = $("<a></a>").attr("href", links[index]).addClass($(this).attr("class")).html($(this).html());
				$(this).replaceWith(novyOdkaz);
			}
		});
		/*Odkaz na oblíbené značky na hlavní stránce*/
		let oblibeneZnazkyOdkaz = "";
		if (czechEshop) {
			oblibeneZnazkyOdkaz = "/favorite-znacky/";
		}
		if (slovakEshop) {
			oblibeneZnazkyOdkaz = "/oblubene-znacky/";
		}
		if (polishEshop) {
			oblibeneZnazkyOdkaz = "/ulubione-marki/";
		}
		let oblibeneZnacky = $(".footer-banner .h4");
		let novyOdkaz = $("<a></a>")
			.attr("href", oblibeneZnazkyOdkaz)
			.addClass(oblibeneZnacky.attr("class"))
			.html(oblibeneZnacky.html());

		oblibeneZnacky.replaceWith(novyOdkaz);

		/*Presunuti blogu*/
		$(".homepage-blog-wrapper > .h4").insertBefore(".homepage-blog-wrapper");
	}
});

/*-----------------------------------------------------------odstranění skrytých kategorií pro fix hamburgeru, kdy se nezobrazují záložky*/
$(".cs .menu-item-2607").remove(); /*Novinky*/
$(".cs .menu-item-2612").remove(); /*skryta kategorie*/
$(".cs .menu-item-2639").remove(); /*houby*/
$(".cs .menu-item-2647").remove(); /*NATIOS BF*/

$(".sk .menu-item-2384").remove(); /*Novinky*/
$(".sk .menu-item-2387").remove(); /*skryta kategorie*/
$(".sk .menu-item-2404").remove(); /*houby*/
$(".sk .menu-item-2411").remove(); /*NATIOS BF*/

$(".pl .menu-item-4125").remove(); /*Novinky*/
$(".pl .menu-item-4134").remove(); /*skryta kategorie*/
$(".pl .menu-item-4110").remove(); /*houby*/
$(".pl .menu-item-4122").remove(); /*NATIOS BF*/
/*------------------------------------------------------KONEC odstranění skrytých kategorií pro fix hamburgeru, kdy se nezobrazují záložky*/

/*------------------------------------------------------Menu na mobilu a košík přímo do košíku*/
document.addEventListener("DOMContentLoaded", function () {
	/*Vypnutí mezikroku zobrazení košíku na click na mobilu*/
	$("#header .navigation-buttons .cart-count").on("touchstart", function () {
		$(".popup-widget.cart-widget").css("display", "none");
		if (czechEshop) {
			window.location.href = "/kosik";
		}
		if (slovakEshop) {
			window.location.href = "/kosik";
		}
		if (polishEshop) {
			window.location.href = "/koszyk";
		}
	});
	/*Chování navigace na mobilu a tabletu*/
	if (!window.matchMedia("(min-width: " + "768" + "px)").matches) {
		$("#navigation").on("click touch", function (event) {
			if (!$(event.target).closest(".menu-level-1").length) {
				shoptet.menu.hideNavigation();
			}
		});

		$(".menu-level-1 >li.ext").on("click touch ", function () {
			$("body").addClass("submenu-visible");
		});

		/*Slice protože přímé odkazy blbnou na iphonech*/
		$("#navigation .menu-level-1 > li")
			.slice(0, -3)
			.on("click touch mouseenter", function (event) {
				if ($(event.target).is(".submenu-visible .menu-level-1 li.exp a b")) {
					event.stopPropagation();
				} else {
					setTimeout(function () {
						$("#navigation>.navigation-in").scrollTop(0);
					}, 200);
				}
			});

		$("#header .menu-level-1").append('<div class="navigation-back"></div>');

		$(".navigation-back").on("click touch", function () {
			$("body").removeClass("submenu-visible");
			$(".menu-level-1 > li").removeClass("exp");
		});
	}
});
/*------------------------------------------------------KONEC Menu na mobilu a košík přímo do košíku*/

/*for logged in*/
let containsFavorites = false;
if ($(".top-nav-button-account").length > 0) {
	console.log("logged in");
	document.addEventListener("DOMContentLoaded", function () {
		/*srdicko a hl menu - bere se to z databaze a trva nez se to nacte*/
		function handleActionClassChange(event) {
			if (event.target.classList.contains("dklab-favourites") && !containsFavorites) {
				let navigationFavorite = $("#dkLabFavHeaderWrapper");
				let navigationCart = $(".header-top .navigation-buttons");
				navigationFavorite.insertBefore(navigationCart);
				favoritesMove();
				containsFavorites = true;
			}
		}

		const observer = new MutationObserver(function (mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === "attributes" && mutation.attributeName === "class") {
					handleActionClassChange(mutation);
				}
			}
		});

		observer.observe(document.body, { attributes: true, subtree: false });

		$(document).ajaxComplete(function () {
			favoritesMove();
		});
	});
}

/*KATEGORIE*/
let categorySecondDesc;
if (document.querySelector(".type-category")) {
	/*rearrange menu*/
	function rearangeCategory() {
		$("#content .category-top").insertBefore(".content-wrapper-in");
		if (document.querySelector("#category-filter-hover")) {
			document.querySelector("#category-filter-hover").classList.add("visible");
		}
	}
	rearangeCategory();
	document.addEventListener("DOMContentLoaded", favoritesMove);

	/*zmena serazeni a filteru*/
	function editCategoryArrangment() {
		document.addEventListener("ShoptetDOMContentLoaded", function () {
			$("#content .category-top").remove();
			if (document.querySelector("#category-filter-hover")) {
				document.querySelector("#category-filter-hover").classList.add("visible");
			}
			readMoreSecondButton();
		});
	}
	document.addEventListener("DOMContentLoaded", editCategoryArrangment, { once: true });

	document.addEventListener("ShoptetDOMContentLoaded", function () {
		document.addEventListener(
			"ShoptetDOMPageContentLoaded",
			function () {
				/*srdicko*/
				allProducts = document.querySelectorAll(".product .p");
				allProducts.forEach((element) => {
					element.appendChild(element.querySelector(".dkLabFavouriteProductDiv"));
				});
			},
			{ once: true }
		);
	});

	document.addEventListener("ShoptetDOMContentLoaded", function () {
		document.addEventListener(
			"ShoptetDOMPageMoreProductsLoaded",
			function () {
				/*srdicko*/
				allProducts = document.querySelectorAll(".product .p");
				allProducts.forEach((element) => {
					element.appendChild(element.querySelector(".dkLabFavouriteProductDiv"));
				});
			},
			{ once: true }
		);
	});

	/*radit dle mobil*/

	if (czechEshop) {
		$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Řadit dle</span></div>");
	}
	if (slovakEshop) {
		$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Radit podľa</span></div>");
	}
	if (polishEshop) {
		$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Sortuj według</span></div>");
	}

	$(".raditPodle").on("click tap", function () {
		$(".category-header").toggleClass("active");
	});

	/*read more*/
	const categoryPerexReadMore = document.querySelector(".category-perex > table");
	const categorySecondReadMore = document.querySelector(".category__secondDescription > table");

	function readMoreFirstButton() {
		if (categoryPerexReadMore) {
			const showMoreCategory = document.createElement("span");
			const showLessCategory = document.createElement("span");

			let showMoreCategoryContent;
			let showLessCategoryContent;

			if (czechEshop) {
				showMoreCategoryContent = document.createTextNode("Zobrazit více");
				showLessategoryContent = document.createTextNode("Zobrazit méně");
			}
			if (slovakEshop) {
				showMoreCategoryContent = document.createTextNode("Zobraziť viac");
				showLessategoryContent = document.createTextNode("Zobraziť menej");
			}
			if (polishEshop) {
				showMoreCategoryContent = document.createTextNode("Pokaż więcej");
				showLessategoryContent = document.createTextNode("Pokaż mniej");
			}

			showMoreCategory.appendChild(showMoreCategoryContent);
			showLessCategory.appendChild(showLessCategoryContent);

			showMoreCategory.classList.add("category-read", "more");
			showLessCategory.classList.add("category-read", "less");

			let categoryPerex = document.querySelector(".category-perex");
			categoryPerex.appendChild(showMoreCategory);
			categoryPerex.appendChild(showLessCategory);

			showMoreCategory.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessCategory.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}

	function readMoreSecondButton() {
		if (categorySecondReadMore) {
			const showMoreCategorySecond = document.createElement("span");
			const showLessCategorySecond = document.createElement("span");

			let showMoreCategoryContentSecond;
			let showLessategoryContentSecond;

			if (czechEshop) {
				showMoreCategoryContentSecond = document.createTextNode("Zobrazit více");
				showLessategoryContentSecond = document.createTextNode("Zobrazit méně");
			}
			if (slovakEshop) {
				showMoreCategoryContentSecond = document.createTextNode("Zobraziť viac");
				showLessategoryContentSecond = document.createTextNode("Zobraziť menej");
			}
			if (polishEshop) {
				showMoreCategoryContentSecond = document.createTextNode("Pokaż więcej");
				showLessategoryContentSecond = document.createTextNode("Pokaż mniej");
			}

			showMoreCategorySecond.appendChild(showMoreCategoryContentSecond);
			showLessCategorySecond.appendChild(showLessategoryContentSecond);

			showMoreCategorySecond.classList.add("category-read", "more");
			showLessCategorySecond.classList.add("category-read", "less");

			categorySecondDesc = document.querySelector(".category__secondDescription");
			categorySecondDesc.appendChild(showMoreCategorySecond);
			categorySecondDesc.appendChild(showLessCategorySecond);

			showMoreCategorySecond.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessCategorySecond.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}
	readMoreFirstButton();
	readMoreSecondButton();
}

/*Brand page*/
let brandPerexReadMore;
let showMoreBrand;
let showLessBrand;
let showMoreBrandContent;
let showLessBrandContent;
let brandHeader;
let parentNode;

if (document.body.classList.contains("type-manufacturer-detail")) {
	$("#content .category-title").each(function () {
		$(this).nextUntil("#category-header").addBack().wrapAll("<div class='brandPerex'></div>");
	});
	$(".brandPerex").insertBefore(".content-wrapper-in");

	$("#filters-wrapper").addClass("sidebar sidebar-left").insertBefore("#content");
	document.addEventListener("DOMContentLoaded", favoritesMove);

	brandPerexReadMore = document.querySelector(".brandPerex > table");

	function brandReadMoreFirstButton() {
		if (brandPerexReadMore) {
			parentNode = document.querySelector(".brandPerex");

			showMoreBrand = document.createElement("span");
			showLessBrand = document.createElement("span");

			if (czechEshop) {
				showMoreBrandContent = document.createTextNode("Zobrazit více");
				showLessBrandContent = document.createTextNode("Zobrazit méně");
			}
			if (slovakEshop) {
				showMoreBrandContent = document.createTextNode("Zobraziť viac");
				showLessBrandContent = document.createTextNode("Zobraziť menej");
			}
			if (polishEshop) {
				showMoreBrandContent = document.createTextNode("Pokaż więcej");
				showLessBrandContent = document.createTextNode("Pokaż mniej");
			}

			showMoreBrand.appendChild(showMoreBrandContent);
			showLessBrand.appendChild(showLessBrandContent);

			showMoreBrand.classList.add("category-read", "more");
			showLessBrand.classList.add("category-read", "less");

			parentNode.appendChild(showMoreBrand);
			parentNode.appendChild(showLessBrand);

			showMoreBrand.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessBrand.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}
	brandReadMoreFirstButton();

	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		$("#content #filters-wrapper").remove();

		$("#content .category-title").each(function () {
			$(this).nextUntil("#category-header").addBack().remove();
		});
	});

	document.addEventListener("ShoptetDOMContentLoaded", function () {
		document.addEventListener(
			"ShoptetDOMPageContentLoaded",
			function () {
				/*srdicko*/
				allProducts = document.querySelectorAll(".product .p");
				allProducts.forEach((element) => {
					element.appendChild(element.querySelector(".dkLabFavouriteProductDiv"));
				});
			},
			{ once: true }
		);
	});

	document.addEventListener("ShoptetDOMContentLoaded", function () {
		document.addEventListener(
			"ShoptetDOMPageMoreProductsLoaded",
			function () {
				/*srdicko*/
				allProducts = document.querySelectorAll(".product .p");
				allProducts.forEach((element) => {
					element.appendChild(element.querySelector(".dkLabFavouriteProductDiv"));
				});
			},
			{ once: true }
		);
	});
}

/*detail produktu*/
let productNameInDetail;
if (document.body.classList.contains("type-detail")) {
	/*nadpis a vlajecky do praveho sloupce*/
	$(".p-code-label").text("Kód produktu:");
	$(".row.product-top > div:first-child()").insertBefore(
		"#content .col-xs-12.col-lg-6.p-info-wrapper > div:first-child()"
	);
	productNameInDetail = $(".p-detail-inner-header h1").html();
	/*TADY*/

	$(".p-detail-inner-header").insertBefore("#content .col-xs-12.col-lg-6.p-info-wrapper > div:first-child()");
	$(".breadcrumbs").insertBefore("#content .col-xs-12.col-lg-6.p-info-wrapper > div:first-child()");

	document.addEventListener("DOMContentLoaded", function (event) {
		$(".breadcrumbs").clone().appendTo(".description-inner .extended-description");
		$(".dkLabFavouriteDiv").insertAfter(".add-to-cart button");
		$(".stars-wrapper").eq(0).appendTo(".p-final-price-wrapper");

		if (czechEshop) {
			if ($(".availability-value").text().indexOf("Momen") > -1) {
				$(".availability-value").addClass("red");
			}
		}
		if (slovakEshop) {
			if ($(".availability-value").text().indexOf("Momen") > -1) {
				$(".availability-value").addClass("red");
			}
		}
		if (polishEshop) {
			if ($(".availability-value").text().indexOf("Chwilowo") > -1) {
				$(".availability-value").addClass("red");
			}
		}

		$(".p-detail-inner-header > h1").clone().appendTo(".description-inner .extended-description");
		$(".description-inner .extended-description h1").replaceWith(
			"<p>" + $(".description-inner .extended-description h1").html() + "</p>"
		);
		$(".description-inner .extended-description p").addClass("h1");
		$("#product-detail-form").clone().removeAttr("id").appendTo(".description-inner .extended-description");

		$(".description-inner .p-detail-info").insertBefore(".description-inner .row.product-top");
		$(".description-inner .p-final-price-wrapper").insertBefore(".description-inner .row.product-top");
		$(".description-inner .add-to-cart").insertBefore(".description-inner .row.product-top");

		$(".description-inner .col-xs-12 > .p-detail-inner-header").remove();
		$(".description-inner .col-xs-12 > .breadcrumbs").remove();
		$(".description-inner .col-xs-12 > .col-xs-12").remove();
		$(".description-inner .dkLabFavouriteDiv").remove();
		$(".p-code").eq(0).clone().appendTo(".description-inner .extended-description");

		/*parametry*/
		$(".extended-description > .detail-parameters tr.sold-out").remove();
		const detailParameters = $(".extended-description > .detail-parameters tr");
		const detailParametersTable = $(".extended-description > .detail-parameters");

		if (detailParameters.length > 2) {
			$(".basic-description").append(detailParametersTable);
			if (czechEshop) {
				$(".basic-description .row-header-label:contains('Hmotnost')").parent().parent().hide();
			}
			if (slovakEshop) {
				$(".basic-description .row-header-label:contains('Hmotnosť')").parent().parent().hide();
			}
			if (polishEshop) {
				$(".basic-description .row-header-label:contains('Masa')").parent().parent().hide();
				$(".basic-description .row-header-label:contains('Waga')").parent().parent().hide();
			}
		}

		/*Úprava rozližení fotek na mobilu*/
		if (!window.matchMedia("(min-width: " + "768" + "px)").matches) {
			$(".p-detail-inner h1").prependTo(".p-detail-inner .row.product-top");
			$(".p-detail-inner .breadcrumbs").prependTo(".p-detail-inner .row.product-top");

			window.addEventListener("resize", function () {
				if (matchesMedia768 && $(".p-detail-inner .row.product-top>h1").length) {
					$(".p-detail-inner .row.product-top>h1").prependTo(".row.product-top .p-detail-inner-header");
					$(".p-detail-inner .row.product-top .breadcrumbs").insertBefore(".row.product-top .p-detail-inner-header");
				}
			});

			if ($(".p-detail-inner>form>.product-top .p-thumbnails-inner > div > a.p-thumbnail").length > 1) {
				let productFlags = $(".product-top .p-image .flags").eq(0);
				$(".p-image").empty();
				$(".p-image").addClass("p-image-carousel");
				$(".p-detail-inner>form>.product-top .p-thumbnails-inner > div > a.p-thumbnail").each(function () {
					let href = $(this).attr("href");
					let h1 = $(".p-detail-inner h1").text().trim();
					let img = $(`<img src="${href}" alt="${h1}">`);
					$(".p-image").append($("<div>").append(img));
				});
				if (productFlags.length > 0) {
					$(".p-image-carousel > div").eq(0).prepend(productFlags);
				}

				/*scroll images with mouse drag*/
				let isDown = false;
				let startX;
				let scrollLeft;
				$(".p-image-carousel")
					.on("mousedown", function (e) {
						isDown = true;
						startX = e.pageX - $(this).offset().left;
						scrollLeft = $(this).scrollLeft();
					})
					.on("mouseleave", function () {
						isDown = false;
					})
					.on("mouseup", function () {
						isDown = false;
					})
					.on("mousemove", function (e) {
						if (!isDown) return;
						e.preventDefault();
						const x = e.pageX - $(this).offset().left;
						const walk = (x - startX) * 0.1; //scroll-speed
						$(this).scrollLeft(scrollLeft - walk);
					});
				$(".p-image-carousel img").on("click", function () {
					shoptet.modal.open({
						href: $(this).attr("src"),
						maxWidth: shoptet.modal.config.maxWidth,
						maxHeight: shoptet.modal.config.maxHeight,
						width: shoptet.modal.config.widthLg,
						className: shoptet.modal.config.classLg,
					});
				});
			}
		}

		/*VLAJKY ZPET DO FOTKY*/
		$(".product-top .p-image").append($(".product-top .p-detail-info .flags-default"));

		if (czechEshop) {
			$(".product-top .availability-amount").each(function () {
				if ($(this).text().indexOf(">3") > -1) {
					$(this).html("více než 3&nbsp;ks");
				}
			});
			if ($(".product-top .flag-zpatky-do-skoly").length > 0) {
				$(".p-short-description").append(
					'<div class="slevovy-kod-popis skola-10"><p>Zadejte v košíku slevový kód <b>SKOLA10</b> a využijte 10% slevu na všechny produkty v kategorii <a href="/zpatky-do-skoly/">Zpátky do školy</a>.</p><p>*nelze kombinovat s dalšími slevovými kupóny</p></div>'
				);
			}
			if (dataLayer[0].shoptet.product.manufacturer == "Natios") {
				$(".p-short-description").append(
					'<div class="natios-daruje-blok"><p>Natios z každého prodaného produktu <b>daruje 1 Kč dětské hematoonkologii</b> ve Fakultní nemocnici v Ostravě.</br></br> Léčba každého onkologického pacienta v České republice se odhaduje na přibližně 8&nbsp;000&nbsp;Kč měsíčně. Věříme tedy, že tímto krokem společně dokážeme pomoci několika rodinám. </br></br>Více se můžete dočíst <a href="https://natima.cz/blog/natios-pomaha-hematoonkologii-v-ostrave/">zde.</a></p><a href="https://natima.cz/blog/natios-pomaha-hematoonkologii-v-ostrave/"><img src="https://natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg"alt="Natios daruje 1 Kč"></a></div>'
				);
			}
			if ($(".nelze-uplatnit-slevovy-kod").length > 0) {
				$(".nelze-uplatnit-slevovy-kod").html("<p>U tohoto produktu není možné uplatnit slevový kód.</p>");
			}
		}
		if (slovakEshop) {
			$(".product-top .availability-amount").each(function () {
				if ($(this).text().indexOf(">3") > -1) {
					$(this).html("viac ako 3&nbsp;ks");
				}
			});
			if ($(".product-top .flag-zpatky-do-skoly").length > 0) {
				$(".p-short-description").append(
					'<div class="slevovy-kod-popis skola-10"><p>Zadajte v košíku zľavový kód <b>SKOLA10</b> a využite 10% zľavu na všetky produkty v kategórii <a href="/naspat-do-skoly/">Naspäť do školy</a>.</p><p>*nemožno kombinovať s ďalšími zľavovými kupónmi</p></div>'
				);
			}
			if (dataLayer[0].shoptet.product.manufacturer == "Natios") {
				$(".p-short-description").append(
					'<div class="natios-daruje-blok"><p>Natios z každého predaného produktu <b>daruje 1 Kč detskej hematoonkológii</b> vo Fakultnej nemocnici v Ostrave.</br></br> Liečba každého onkologického pacienta v Českej republike sa odhaduje na približne 8&nbsp;000&nbsp;Kč mesačne. Veríme teda, že týmto krokom spoločne dokážeme pomôcť niekoľkým rodinám.</br></br>Viac sa môžete dočítať <a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/">tu.</a></p><a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/"><img src="https://www.natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg"alt="Natios daruje 1 Kč"></a></div>'
				);
			}
			if ($(".nelze-uplatnit-slevovy-kod").length > 0) {
				$(".nelze-uplatnit-slevovy-kod").html("<p>U tohto produktu nie je možné uplatniť zľavový kód.</p>");
			}
		}
		if (polishEshop) {
			$(".product-top .availability-amount").each(function () {
				if ($(this).text().indexOf(">3") > -1) {
					$(this).html("powyżej 3&nbsp;szt");
				}
			});
			/*Upravit*/

			if ($(".product-top .flag-zpatky-do-skoly").length > 0) {
				$(".p-short-description").append(
					'<div class="slevovy-kod-popis skola-10"><p>Zadajte v košíku zľavový kód <b>SKOLA10</b> a využite 10% zľavu na všetky produkty v kategórii <a href="/naspat-do-skoly/">Naspäť do školy</a>.</p><p>*nemožno kombinovať s ďalšími zľavovými kupónmi</p></div>'
				);
			}
			/*Natios přispívá*/
			/*
			if (dataLayer[0].shoptet.product.manufacturer == "Natios") {
				$(".p-short-description").append(
					'<div class="natios-daruje-blok"><p>Natios z každého predaného produktu <b>daruje 1 Kč detskej hematoonkológii</b> vo Fakultnej nemocnici v Ostrave.</br></br> Liečba každého onkologického pacienta v Českej republike sa odhaduje na približne 8&nbsp;000&nbsp;Kč mesačne. Veríme teda, že týmto krokom spoločne dokážeme pomôcť niekoľkým rodinám.</br></br>Viac sa môžete dočítať <a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/">tu.</a></p><a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/"><img src="https://www.natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg"alt="Natios daruje 1 Kč"></a></div>'
				);
			}
				*/
			if ($(".nelze-uplatnit-slevovy-kod").length > 0) {
				$(".nelze-uplatnit-slevovy-kod").html("<p>Na ten produkt nie ma możliwości zastosowania kodu rabatowego.</p>");
			}
		}

		/*alternative varianty podobné*/
		$("#productsAlternative .products .product:has(.p-tools > a)").each(function () {
			let $this = $(this);
			$this.remove();
		});
		if ($("#productsAlternative .product").length > 0) {
			$("#productsAlternative .product").each(function () {
				let $this = $(this);
				let href = $this.find("a").first().attr("href");
				let classes = $this.attr("class");

				let newAnchor = $("<a>").attr("href", href).addClass(classes).html($this.html());
				$this.replaceWith(newAnchor);
			});
			$("#productsAlternative").insertAfter(".p-detail-inner .product-top .social-buttons-wrapper");
			$("#productsAlternative .p .image img").each(function () {
				let $this = $(this);
				let dataSrc = $this.attr("data-src");
				$this.attr("src", dataSrc);
			});
		}
		if ($("#productsAlternative .product").length > 2) {
			if (czechEshop) {
				$("#productsAlternative").append('<div id="show-more-variants">Všechny varianty</div>');
			}
			if (slovakEshop) {
				$("#productsAlternative").append('<div id="show-more-variants">Všetky varianty</div>');
			}
			if (polishEshop) {
				$("#productsAlternative").append('<div id="show-more-variants">Wszystkie opcje</div>');
			}

			$("#show-more-variants").click(function () {
				$("#productsAlternative").toggleClass("show-all");
			});
		}

		function cardHeight() {
			if ($(".card-text").length > 1) {
				let cardHeight = 0;

				$(".card-text").css("min-height", "");

				$(".card-text").each(function () {
					var thisHeight = $(this).outerHeight();
					if (thisHeight > cardHeight) {
						cardHeight = thisHeight;
					}
				});
				$(".card-text").css("min-height", cardHeight);
			}
		}
		cardHeight();
		window.addEventListener("resize", cardHeight);

		/*Pobo tabulka vlevo - prepsani h2 na p*/
		if ($(".rc-parameter__header-right").length > 0) {
			let poboH2vTabulce = $(
				"#pobo-all-content .widget-projector .rc-parameter-small-left__box .rc-parameter__header-right"
			);

			poboH2vTabulce.each(function () {
				let poboH2vTabulceText = $(this).html();

				/*nahrazení # <b> nebo </b> pro ztučnění textu*/
				let characters = poboH2vTabulceText.split("");
				let whichHashtag = 0;
				for (var i = 0; i < characters.length; i++) {
					if (characters[i] === "#") {
						if (whichHashtag % 2 === 0) {
							characters[i] = "<b>";
						} else {
							characters[i] = "</b>";
						}
						whichHashtag = whichHashtag + 1;
					} else if (characters[i] === "$") {
						characters[i] = "</br>";
					}
				}
				// Join the array back into a string
				poboH2vTabulceText = characters.join("");
				$(this).replaceWith("<p class='rc-parameter__header-right'><span>" + poboH2vTabulceText + "</span></p>");
			});
		}

		/*Pobo overflow 30% obrazek*/
		$(".widget-container").each(function () {
			if ($(this).find('.pb-standard-table td:contains("#POBOOVERFLOW#")').length > 0) {
				$(this).addClass("overflow-image");
				$(this).find('.pb-standard-table td:contains("#POBOOVERFLOW#")').addClass("display-none");
			}
			if ($(this).find('.pb-standard-table td:contains("#SIRKA#")').length > 0) {
				$(this).addClass("sirka");
			}
			if ($(this).find('.pb-standard-table td:contains("#VYSKA#")').length > 0) {
				$(this).addClass("vyska");
			}
		});
	});

	/*CUSTOM NATIOS*/
	if ($(".custom-desc").length >= 1) {
		$("body").addClass("custom-product");
		var sliderChild = $(".ikony.slider").children();
		let sliderChildLength = sliderChild.length;
		var activeChild = 0;
		let intervalId;
		let intervalTime = 4000;
		console.log(sliderChild);
		console.log(intervalTime);

		// Variables for swipe functionality
		let startTouchPosition, endTouchPosition;

		// Check if there are more than 1 children
		if (sliderChildLength > 1) {
			// Create div dots
			let dots = $('<div class="dots"></div>');

			// Create a dot for each entry in sliderChild
			sliderChild.each(function () {
				dots.append('<div class="dot"></div>');
			});

			// Append dots to .ikony.slider
			$(".ikony.slider").append(dots);

			$(".slider .dot").first().addClass("active");

			$(".slider .dot").click(function () {
				activeChild = $(this).index();
				updateSlider();
				clearInterval(intervalId); // Stop the interval when a dot is clicked
			});

			// Increase value of activeChild by 1 every 10 seconds and trigger updateSlider
			intervalId = setInterval(function () {
				activeChild = (activeChild + 1) % sliderChildLength; // Use modulus to loop back to 0 when reaching the end
				updateSlider();
			}, intervalTime);

			// Swipe functionality
			$(".ikony.slider").on("touchstart", function (e) {
				startTouchPosition = e.originalEvent.touches[0].clientX;
			});

			$(".ikony.slider").on("touchmove", function (e) {
				endTouchPosition = e.originalEvent.touches[0].clientX;
			});

			$(".ikony.slider").on("touchend", function () {
				if (startTouchPosition < endTouchPosition) {
					activeChild = activeChild > 0 ? activeChild - 1 : sliderChildLength - 1;
				} else {
					activeChild = (activeChild + 1) % sliderChildLength;
				}
				updateSlider();
				clearInterval(intervalId); // Stop the interval when a dot is clicked
			});
		}

		function updateSlider() {
			sliderChild.each(function (index) {
				$(this).css("transform", "translateX(" + -activeChild * 100 + "%)");
			});

			$(".slider .dot").each(function (index) {
				if (index == activeChild) {
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			});
		}

		if ($(".custom-desc .compare").length == 0) {
		} else {
			let items = $(".custom-desc .compare p");
			let items_columns = 2;

			function setMinHeightCompare() {
				$(items).css("min-height", "");
				for (let i = 0; i < items.length / items_columns; i++) {
					index = i * items_columns;
					let item = items[index];
					let next = items[index + 1];
					if (next) {
						let item_height = $(item).innerHeight();
						let next_height = $(next).innerHeight();
						if (item_height > next_height) {
							$(next).css("min-height", item_height);
						} else {
							$(item).css("min-height", next_height);
						}
					}
				}
			}
			document.addEventListener("DOMContentLoaded", setMinHeightCompare);
			/*setMinHeightCompare();*/
			window.addEventListener("resize", setMinHeightCompare);
		}
	}
}

/*faq*/
if (document.querySelector(".contact-faq")) {
	$(".contact-faq-question > p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
}

/*tlacitko zpet v kosiku*/
if (document.body.classList.contains("ordering-process")) {
	$(".site-name").prepend('<div class="kosik-zpet"></div>');
	$(".site-name").addClass("addedBackButton");
	$(".kosik-zpet").on("click touch", function () {
		window.history.back();
	});
}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------krok 1 kosik*/
if (document.querySelector("body.in-kosik") || document.querySelector("body.in-koszyk")) {
	rearangeSummary();
	function rearangeSummary() {
		const summaryInsertPlace = $(".summary-wrapper .price-wrapper");
		$(".extra.delivery").parent().parent().insertBefore(summaryInsertPlace);
		$(".delivery-time").insertBefore(summaryInsertPlace);
		$(".discount-coupon").insertBefore(summaryInsertPlace);
		$(".extra.gift").insertAfter(".cart-summary h4");
	}
	document.addEventListener("ShoptetDOMCartContentLoaded", rearangeSummary);

	var t = $("html");
	t.on("click", ".free-gifts-wrapper .free-gifts label", function (t) {
		t.preventDefault();
		var e = $(this).attr("for");
		$(".free-gifts input").each(function () {
			e == $(this).attr("id") ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
		});
		var i = $(".free-gifts-wrapper form");
		shoptet.cart.ajaxSubmitForm(i.attr("action"), i[0], "functionsForCart", "cart", !0);
	});

	function upravaDarkuVKosiku() {
		let giftSpan = $(".extra.gift > span");

		let darkyText = "";
		let darkyTextObjednejte = "";
		let darkyTextHodnotnejsi = "";
		const darkyPrice = $(".extra.gift > span > strong").eq(0);
		const darkyPriceRange = $(".extra.gift .price-range");
		let dataIdNatiosZasobnik = "";

		let pocetProduktuNatiosVKosiku = 0;

		if (czechEshop) {
			darkyText = "Dárky";
			darkyTextObjednejte = "Objednejte ještě za ";
			darkyTextHodnotnejsi = " a vyberte si z hodnotnějších dárků.";
			dataIdNatiosZasobnik = "10188";
			$(".in-kosik .cart-summary h4").text(darkyText);
		}

		if (slovakEshop) {
			darkyText = "Darčeky";
			darkyTextObjednejte = "Objednajte si ešte za ";
			darkyTextHodnotnejsi = " a vyberte si z hodnotnejších darčekov.";
			dataIdNatiosZasobnik = "20589";
			$(".in-kosik .cart-summary h4").text(darkyText);
		}
		if (polishEshop) {
			darkyText = "Prezenty";
			darkyTextObjednejte = "Zamów jeszcze za ";
			darkyTextHodnotnejsi = " i wybierz bardziej wartościowy prezent.";
			dataIdNatiosZasobnik = "XXXXXXXXX";
			$(".in-koszyk .cart-summary h4").text(darkyText);
		}

		/*zobrazeni natios zasobniku a tašky pouze pokud obsahuje natios produkt*/
		if ($(".p-name a:contains('NATIOS')").length > 0) {
			$(".p-name a:contains('NATIOS')").each(function () {
				pocetProduktuNatiosVKosiku =
					pocetProduktuNatiosVKosiku + parseInt($(this).parent().parent().find("input.amount").val());
			});
		}
		if ($(".p-name a:contains('Natios')").length > 0) {
			$(".p-name a:contains('Natios')").each(function () {
				pocetProduktuNatiosVKosiku =
					pocetProduktuNatiosVKosiku + parseInt($(this).parent().parent().find("input.amount").val());
			});
		}
		if (pocetProduktuNatiosVKosiku >= 3) {
			$(".free-gifts-wrapper .free-gifts li[data-free-gift-id=" + dataIdNatiosZasobnik + "]").show();
		}

		if ($(".extras-col .free-gift").length > 0 && $(".extra.gift").length > 0) {
			giftSpan.empty();
			giftSpan.append(darkyTextObjednejte);
			giftSpan.append(darkyPrice);
			giftSpan.append(darkyTextHodnotnejsi);
			giftSpan.append(darkyPriceRange);
		}
	}

	$(document).ready(function () {
		upravaDarkuVKosiku();
	});
	document.addEventListener("ShoptetCartUpdated", function () {
		upravaDarkuVKosiku();
	});
}

/*kosik 2*/
if (document.querySelector("body.in-krok-1") || document.querySelector("body.in-zamowienie-platnosci-i-wysylki")) {
	$(".checkout-box").appendTo(".co-basic-information");

	$(".next-step").appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");

	const paymentBlock = $(".co-payment-method");
	paymentBlock.addClass("unactive");

	/*AKTIVOVAT I KDYŽ SE ZMĚNÍ ZEMĚ*/
	document.addEventListener(
		"shoptet.checkoutShared.updatePriceSummary",
		function () {
			removeDelivery();
			removePayment();
		},
		{ once: true }
	);
	let deliveryLabels = $(".co-delivery-method > .shipping-billing-table > .radio-wrapper");
	let paymentLabels = $(".co-payment-method > .shipping-billing-table > .radio-wrapper");
	let checkedPayment = false;

	deliveryLabels.each(function () {
		$(this).on("mousedown", function () {
			paymentBlock.removeClass("unactive");
		});
	});
	document.addEventListener("ShoptetBillingMethodUpdated", function () {
		if (!checkedPayment) {
			removePayment();
		}
	});
	document.addEventListener("shoptet.checkoutShared.updatePriceSummary", function () {
		if (!checkedPayment) {
			removePayment();
		}
	});
	document.addEventListener("DOMContentLoaded", function () {
		editGifts();
	});

	/*Scroll to bottom when all checked out*/
	paymentLabels.each(function () {
		$(this).on("mousedown", function () {
			checkedPayment = true;
		});
	});

	/*srolování metod po výberu*/
	document.addEventListener("DOMContentLoaded", function () {
		if (czechEshop) {
			$("#order-shipping-methods").append(
				'<div id="showAllShippingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
			);
			$("#order-billing-methods").append(
				'<div id="showAllBillingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
			);
		}
		if (slovakEshop) {
			$("#order-shipping-methods").append(
				'<div id="showAllShippingMethods" class="showAllOrder">Zobraziť všetky možnosti</div>'
			);
			$("#order-billing-methods").append(
				'<div id="showAllBillingMethods" class="showAllOrder">Zobraziť všetky možnosti</div>'
			);
		}
		if (polishEshop) {
			$("#order-shipping-methods").append(
				'<div id="showAllShippingMethods" class="showAllOrder">Pokaż wszystkie sposoby</div>'
			);
			$("#order-billing-methods").append(
				'<div id="showAllBillingMethods" class="showAllOrder">Pokaż wszystkie sposoby</div>'
			);
		}

		let radioWrappersShipping = $("#order-shipping-methods .radio-wrapper");
		let radioWrappersBilling = $("#order-billing-methods .radio-wrapper");

		radioWrappersShipping.on("mousedown touch", function () {
			let eventFunction = function () {
				$("#order-shipping-methods").addClass("selected");

				radioWrappersShipping.each(function () {
					if (!$(this).hasClass("active")) {
						$(this).css("overflow", "hidden");
						$(this).animate({ height: "0px", opacity: 0 }, 300);
					}
				});
			};

			document.addEventListener("ShoptetBillingMethodUpdated", eventFunction, { once: true });
			setTimeout(function () {
				document.removeEventListener("ShoptetBillingMethodUpdated", eventFunction);
			}, 500);
		});

		radioWrappersBilling.on("mousedown touch", function () {
			let eventFunction = function () {
				$("#order-billing-methods").addClass("selected");

				radioWrappersBilling.each(function () {
					if (!$(this).hasClass("active")) {
						$(this).css("overflow", "hidden");
						$(this).animate({ height: "0px", opacity: 0 }, 300);
					}
				});
			};

			document.addEventListener("ShoptetBillingMethodUpdated", eventFunction, { once: true });
			setTimeout(function () {
				document.removeEventListener("ShoptetBillingMethodUpdated", eventFunction);
			}, 500);
		});

		$("#showAllShippingMethods").on("click touch", function () {
			$("#order-shipping-methods").removeClass("selected");
			radioWrappersShipping.each(function (index) {
				$(this).css({
					overflow: "",
					height: "auto",
					opacity: 1,
				});
			});
		});

		$("#showAllBillingMethods").on("click touch", function () {
			$("#order-billing-methods").removeClass("selected");
			radioWrappersBilling.each(function (index) {
				$(this).css({
					overflow: "",
					height: "auto",
					opacity: 1,
				});
			});
		});
	});
	/*konec srolování*/

	/*Dorucujeme také na slovensko*/
	if (czechEshop) {
		if ($('option[value="151"][selected="selected"]').length) {
			$("body").addClass("hiddenCartOptions");
			let appendElement = $(
				"<div class='also-deliver-country'><p>Doručujeme také na Slovensko. Je ovšem potřeba nakoupit na natima.sk. <a href='https://www.natima.sk'>Přejít na natima.sk</a></p></div>"
			);
			appendElement.insertAfter("#select-country-payment");
		}
	}
}
function removeDelivery() {
	$(".co-delivery-method input").prop("checked", false);
	$(".co-delivery-method .radio-wrapper.active").removeClass("active");
	if (czechEshop) {
		$(".recapitulation-shipping-billing-info").eq(0).html("<span>Zvolte dopravu</span>Doprava");
	}
	if (slovakEshop) {
		$(".recapitulation-shipping-billing-info").eq(0).html("<span>Vyberte dopravu</span>Doprava");
	}
	if (polishEshop) {
		$(".recapitulation-shipping-billing-info").eq(0).html("<span>Wybierz sposób dostawy</span>Dostawa");
	}
}

function removePayment() {
	$(".co-payment-method input").prop("checked", false);
	$(".co-payment-method .radio-wrapper.active").removeClass("active");
	if (czechEshop) {
		$(".recapitulation-shipping-billing-info").eq(1).html("<span>Zvolte platbu</span>Platba");
	}
	if (slovakEshop) {
		$(".recapitulation-shipping-billing-info").eq(1).html("<span>Vyberte platbu</span>Platba");
	}
	if (polishEshop) {
		$(".recapitulation-shipping-billing-info").eq(1).html("<span>Wybierz sposób płatności</span>Płatność");
	}
}

function editGifts() {
	let giftItems = $(".gift-items");
	if (giftItems.length > 1) {
		giftItems.each(function (index) {
			if (index > 0) {
				// Skip the first .gift-items div
				let span = $(this).find("span").clone();
				giftItems.first().find("span").last().after(span);
				$(this).remove();
			}
		});
	}
}

/*poslední krok objednávky*/
if (
	document.body.classList.contains("in-krok-2") ||
	document.body.classList.contains("in-zamowienie-informacje-o-tobie")
) {
	const orderNextStepButton = $(".next-step");
	const orderCheckoutBox = $(".checkout-box");
	const orderConsentsFirst = $(".consents-first");
	const orderCoBoxAdditional = $(".co-box.co-box-additional");
	const orderCompanyShopping = $(".company-shopping");
	const orderConsents = $(".consents");
	let orderVatChange = false;

	$(".cart-items").last().removeClass("cart-items").addClass("order-recapitulation");
	orderCheckoutBox.appendTo(".order-summary-inner");
	orderConsentsFirst.appendTo(".order-summary-inner");
	orderNextStepButton.appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
	orderCoBoxAdditional.appendTo(".co-contact-information");
	orderCompanyShopping.insertAfter(".co-billing-address > fieldset");
	orderConsents.appendTo(".next-step");

	document.addEventListener("ShoptetDataLayerUpdated", function () {
		orderVatChange = true;
		$(document).ajaxComplete(function () {
			if ((orderVatChange = true)) {
				orderVatChange = false;

				if ($(".cart-items").length >= 2) {
					$(".cart-items").last().removeClass("cart-items").addClass("order-recapitulation");
				}

				orderCheckoutBox.appendTo(".order-summary-inner");
				orderConsentsFirst.appendTo(".order-summary-inner");
				orderNextStepButton.appendTo(".order-summary-inner");
				$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
				$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
				orderConsents.appendTo(".next-step");
			}
		});
	});

	document.addEventListener("DOMContentLoaded", function () {
		editGifts();
	});
}

/*msg message sucess product added*/
document.addEventListener("ShoptetCartAddCartItem", function () {
	document.addEventListener(
		"ShoptetCartUpdated",
		function () {
			setTimeout(function () {
				if (czechEshop) {
					$(".msg-success").append('<a href="/kosik" class="added-to-cart"><span>Přejít do košíku →</span></a>');
				}
				if (slovakEshop) {
					$(".msg-success").append('<a href="/kosik" class="added-to-cart"><span>Prejsť do košíka →</span></a>');
				}
				if (polishEshop) {
					$(".msg-success").append('<a href="/koszyk" class="added-to-cart"><span>Przejdź do koszyka →</span></a>');
				}
			}, 50);
		},
		{ once: true }
	);
});

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

	function getViewCountCustom() {
		$(".news-item").each(function () {
			let newsItem = $(this);
			let articleUrl = newsItem.find(".image a").attr("href");
			let strippedUrl = articleUrl.replace(window.location.origin, "");

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
			console.info("Stats are not public");
		}
	}
	getViewCountCustom();
	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		$("time").wrap("<div class='news-info'></div>");
		getViewCountCustom();
	});
}
/*----------------------------------------------------------------------------KONEC Pocet přečtení článků na blogové stránce*/

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
	errorCloseElement = document.querySelector("#error-shoptet-close");
	if (errorCloseElement) {
		errorCloseElement.addEventListener("click", handleShoptetErrorClose);
	}

	if (getSessionCookie("errorClosed") !== "true") {
		const errorDiv = document.querySelector(".error-shoptet");
		if (errorDiv) {
			errorDiv.classList.remove("display-none");
		}
	}
});
/*-----------------------------------------------------------------------KONEC Zavření shoptet error message*/

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
if (
	document.body.classList.contains("in-vyhledavani") ||
	document.body.classList.contains("in-vyhledavanie") ||
	document.body.classList.contains("in-wyszukiwanie")
) {
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
