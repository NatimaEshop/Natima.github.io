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

/*KATEGORIE*/
let categorySecondDesc;
if (document.querySelector(".type-category")) {
	/*rearrange menu*/
	function rearangeCategory() {
		$("#content .category-top").insertBefore(".content-wrapper-in");
		document.querySelector("#category-filter-hover").classList.add("visible");
	}
	rearangeCategory();
	document.addEventListener("DOMContentLoaded", favoritesMove);

	/*zmena serazeni a filteru*/
	function editCategoryArrangment() {
		document.addEventListener("ShoptetDOMContentLoaded", function () {
			$("#content .category-top").remove();
			document.querySelector("#category-filter-hover").classList.add("visible");
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

	/*radit dle mobil*/
	$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Řadit dle</span></div>");
	$(".raditPodle").on("click tap touchstart", function () {
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
	$("#filters-wrapper").addClass("sidebar sidebar-left").insertBefore("#content");
	document.addEventListener("DOMContentLoaded", favoritesMove);

	brandPerexReadMore = document.querySelector("#content > table");

	function brandReadMoreFirstButton() {
		if (brandPerexReadMore) {
			parentNode = document.querySelector("#content");
			brandHeader = document.querySelector("#category-header");

			showMoreBrand = document.createElement("span");
			showLessBrand = document.createElement("span");

			showMoreBrandContent = document.createTextNode("Zobrazit více");
			showLessBrandContent = document.createTextNode("Zobrazit méně");

			showMoreBrand.appendChild(showMoreBrandContent);
			showLessBrand.appendChild(showLessBrandContent);

			showMoreBrand.classList.add("category-read", "more");
			showLessBrand.classList.add("category-read", "less");

			parentNode.insertBefore(showMoreBrand, brandHeader);
			parentNode.insertBefore(showLessBrand, brandHeader);

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
		brandReadMoreFirstButton();
		$("#content #filters-wrapper").remove();
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
		$(".stars-wrapper").appendTo(".p-final-price-wrapper");

		if ($(".availability-value").text().indexOf("Momen") > -1) {
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
	});
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
	paymentLabels.each(function () {
		$(this).on("mousedown", function () {
			checkedPayment = true;
		});
		$(this).on("click", function () {
			$("html, body").animate(
				{
					scrollTop: $("#checkoutSidebar").offset().top,
				},
				300
			);
		});
	});
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

/*posledni krok objednavky*/
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
