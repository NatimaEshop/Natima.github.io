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
	/*Vypnutí mezikroku zobrazení košíku na click na mobilu*/
	$("#header .navigation-buttons .cart-count").on("touchstart", function () {
		$(".popup-widget.cart-widget").css("display", "none");
		window.location.href = "/kosik";
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

		$("#navigation .menu-level-1 > li").on("click touch mouseenter", function (event) {
			if ($(event.target).is(".submenu-visible .menu-level-1 li.exp a b")) {
				event.stopPropagation();
			} else {
				setTimeout(function () {
					$("#navigation>.navigation-in").scrollTop(0);
				}, 100);
			}
		});

		$("#header .menu-level-1").append('<div class="navigation-back"></div>');

		$(".navigation-back").on("click touch", function () {
			$("body").removeClass("submenu-visible");
			$(".menu-level-1 > li").removeClass("exp");
		});
	}
});

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
	$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Řadit dle</span></div>");
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

			const showMoreCategoryContent = document.createTextNode("Zobrazit více");
			const showLessategoryContent = document.createTextNode("Zobrazit méně");

			showMoreCategory.appendChild(showMoreCategoryContent);
			showLessCategory.appendChild(showLessategoryContent);

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

			const showMoreCategoryContentSecond = document.createTextNode("Zobrazit více");
			const showLessategoryContentSecond = document.createTextNode("Zobrazit méně");

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

			showMoreBrandContent = document.createTextNode("Zobrazit více");
			showLessBrandContent = document.createTextNode("Zobrazit méně");

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

		if ($(".availability-value").text().indexOf("Momen") > -1) {
			$(".availability-value").addClass("red");
		}
		if ($(".availability-value").text().indexOf("nasklad") > -1) {
			$(".availability-value").addClass("red");
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
			$(".basic-description .row-header-label:contains('Hmotnost')").parent().parent().hide();
			$(".basic-description .row-header-label:contains('Hmotnosť')").parent().parent().hide();
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
				$(".p-image").empty();
				$(".p-image").addClass("p-image-carousel");
				$(".p-detail-inner>form>.product-top .p-thumbnails-inner > div > a.p-thumbnail").each(function () {
					let href = $(this).attr("href");
					let h1 = $(".p-detail-inner h1").text().trim();
					let img = $(`<img src="${href}" alt="${h1}">`);
					$(".p-image").append($("<div>").append(img));
				});

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

		if (document.body.classList.contains("cs")) {
			$(".product-top .availability-amount").each(function () {
				if ($(this).text().indexOf(">3") > -1) {
					$(this).html("více než 3&nbsp;ks");
				}
			});
			if ($(".product-top .p-detail-inner-header h1:contains('NATIOS')").length > 0) {
				$(".p-short-description").append(
					'<div class="natios-daruje-blok"><p>Natios z každého prodaného produktu <b>daruje 1 Kč dětské hematoonkologii</b> ve Fakultní nemocnici v Ostravě.</br></br> Léčba každého onkologického pacienta v České republice se odhaduje na přibližně 8&nbsp;000&nbsp;Kč měsíčně. Věříme tedy, že tímto krokem společně dokážeme pomoci několika rodinám. </br></br>Více se můžete dočíst <a href="https://natima.cz/blog/natios-pomaha-hematoonkologii-v-ostrave/">zde.</a></p><a href="https://natima.cz/blog/natios-pomaha-hematoonkologii-v-ostrave/"><img src="https://natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg"alt="Natios daruje 1 Kč"></a></div>'
				);
			}
		}
		if (document.body.classList.contains("sk")) {
			$(".product-top .availability-amount").each(function () {
				if ($(this).text().indexOf(">3") > -1) {
					$(this).html("viac ako 3&nbsp;ks");
				}
			});
			if ($(".product-top .p-detail-inner-header h1:contains('NATIOS')").length > 0) {
				$(".p-short-description").append(
					'<div class="natios-daruje-blok"><p>Natios z každého predaného produktu <b>daruje 1 Kč detskej hematoonkológii</b> vo Fakultnej nemocnici v Ostrave.</br></br> Liečba každého onkologického pacienta v Českej republike sa odhaduje na približne 8&nbsp;000&nbsp;Kč mesačne. Veríme teda, že týmto krokom spoločne dokážeme pomôcť niekoľkým rodinám.</br></br>Viac sa môžete dočítať <a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/">tu.</a></p><a href="https://www.natima.sk/blog/natios-pomaha-hematoonkologii-v-ostrave/"><img src="https://www.natima.cz/user/documents/upload/NatiosDarujeFNO_2.svg"alt="Natios daruje 1 Kč"></a></div>'
				);
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
			if (document.body.classList.contains("cs")) {
				$("#productsAlternative").append('<div id="show-more-variants">Všechny varianty</div>');
			}
			if (document.body.classList.contains("sk")) {
				$("#productsAlternative").append('<div id="show-more-variants">Všetky varianty</div>');
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
		// $("body").addClass("custom-product");
		// var sliderChild = $(".ikony.slider").children();
		// let sliderChildLength = sliderChild.length;
		// var activeChild = 0;
		// let intervalId;
		// let intervalTime = 4000;
		// console.log(sliderChild);
		// console.log(intervalTime);

		// // Check if there are more than 1 children
		// if (sliderChildLength > 1) {
		// 	// Create div dots
		// 	let dots = $('<div class="dots"></div>');

		// 	// Create a dot for each entry in sliderChild
		// 	sliderChild.each(function () {
		// 		dots.append('<div class="dot"></div>');
		// 	});

		// 	// Append dots to .ikony.slider
		// 	$(".ikony.slider").append(dots);

		// 	$(".slider .dot").first().addClass("active");

		// 	$(".slider .dot").click(function () {
		// 		activeChild = $(this).index();
		// 		updateSlider();
		// 		clearInterval(intervalId); // Stop the interval when a dot is clicked
		// 	});

		// 	// Increase value of activeChild by 1 every 10 seconds and trigger updateSlider
		// 	intervalId = setInterval(function () {
		// 		activeChild = (activeChild + 1) % sliderChildLength; // Use modulus to loop back to 0 when reaching the end
		// 		updateSlider();
		// 	}, intervalTime);
		// }
		// function updateSlider() {
		// 	sliderChild.each(function (index) {
		// 		$(this).css("transform", "translateX(" + -activeChild * 100 + "%)");
		// 	});

		// 	$(".slider .dot").each(function (index) {
		// 		if (index == activeChild) {
		// 			$(this).addClass("active");
		// 		} else {
		// 			$(this).removeClass("active");
		// 		}
		// 	});
		// }

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
			setMinHeightCompare();
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
/*krok 1 kosik*/
if (document.querySelector("body.in-kosik")) {
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

		let darkyText = "Dárky";
		let darkyTextObjednejte = "Objednejte ještě za ";
		let darkyTextHodnotnejsi = " a vyberte si z hodnotnějších dárků.";
		const darkyPrice = $(".extra.gift > span > strong").eq(0);
		const darkyPriceRange = $(".extra.gift .price-range");
		let dataIdNatiosZasobnik = "10188";

		let pocetProduktuNatiosVKosiku = 0;

		if (document.body.classList.contains("sk")) {
			darkyText = "Darčeky";
			darkyTextObjednejte = "Objednajte si ešte za ";
			darkyTextHodnotnejsi = " a vyberte si z hodnotnejších darčekov.";
			dataIdNatiosZasobnik = "20589";
		}

		$(".in-kosik .cart-summary h4").text(darkyText);

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
if (document.querySelector("body.in-krok-1")) {
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
		/*
		$(this).on("click", function () {
			$("html, body").animate(
				{
					scrollTop: $("#checkoutSidebar").offset().top,
				},
				300
			);
		});
		*/
	});

	/*srolování metod po výberu*/
	document.addEventListener("DOMContentLoaded", function () {
		if (document.body.classList.contains("cs")) {
			$("#order-shipping-methods").append(
				'<div id="showAllShippingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
			);
			$("#order-billing-methods").append(
				'<div id="showAllBillingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
			);
		}
		if (document.body.classList.contains("sk")) {
			$("#order-shipping-methods").append(
				'<div id="showAllShippingMethods" class="showAllOrder">Zobraziť všetky možnosti</div>'
			);
			$("#order-billing-methods").append(
				'<div id="showAllBillingMethods" class="showAllOrder">Zobraziť všetky možnosti</div>'
			);
		}

		let radioWrappersShipping = $("#order-shipping-methods .radio-wrapper");
		let radioWrappersBilling = $("#order-billing-methods .radio-wrapper");

		radioWrappersShipping.on("mousedown touchstart", function () {
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

		radioWrappersBilling.on("mousedown touchstart", function () {
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

		$("#showAllShippingMethods").on("click touchstart", function () {
			$("#order-shipping-methods").removeClass("selected");
			radioWrappersShipping.each(function (index) {
				$(this).css({
					overflow: "",
					height: "auto",
					opacity: 1,
				});
			});
		});

		$("#showAllBillingMethods").on("click touchstart", function () {
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
}
function removeDelivery() {
	$(".co-delivery-method input").prop("checked", false);
	$(".co-delivery-method .radio-wrapper.active").removeClass("active");
	$(".recapitulation-shipping-billing-info").eq(0).html("<span>Zvolte dopravu</span>Doprava");
}

function removePayment() {
	$(".co-payment-method input").prop("checked", false);
	$(".co-payment-method .radio-wrapper.active").removeClass("active");
	$(".recapitulation-shipping-billing-info").eq(1).html("<span>Zvolte platbu</span>Platba");
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

/*posledn9 krok objednávky*/
if (document.body.classList.contains("in-krok-2")) {
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

/*posledni krok objednavky*/
/*
if (document.body.classList.contains("in-krok-2")) {
	$(".next-step").appendTo(".order-summary-inner");
	$(".cart-items").last().removeClass("cart-items").addClass("order-recapitulation");
	$(".checkout-box").appendTo(".order-summary-inner");
	$(".consents-first").appendTo(".order-summary-inner");
	$(".next-step").appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
	$(".co-box.co-box-additional").appendTo(".co-contact-information");
	$(".company-shopping").insertAfter(".co-billing-address > fieldset");
	$(".consents").appendTo(".next-step");
}
*/
