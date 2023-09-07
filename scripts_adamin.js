var sortingFunction = function () {
	if ($(".category-header fieldset").length) {
		if ($(window).width() > 992) {
			$(".category-header fieldset").hover(function () {
				$(this).addClass("hovered");
			});
			$(".category-header fieldset").mouseleave(function () {
				$(this).removeClass("hovered");
			});
		} else {
			$(".category-header fieldset").click(function () {
				$(this).toggleClass("hovered");
			});
		}
	}
};

sortingFunction();

document.addEventListener("ShoptetDOMPageContentLoaded", function () {
	sortingFunction();
});

if ($("body.type-category").length || $("body.type-detail").length) {
	var cartSideBox = $('<div class="cart-sidebar-box"><h4></h4><div class="cart-sidebar-inner"></div></div>');
	$("aside .sidebar-inner:first-child").prepend(cartSideBox);
	$("aside .cart-sidebar-box h4").text($("#header .cart-count .sr-only").text());
	$(".cart-sidebar-box .cart-sidebar-inner").hide();
}

var cartSidebar = function () {
	if ($("body.type-category").length || $("body.type-detail").length) {
		if (!$("body.one-column-body").length) {
			shoptet.global.showPopupWindow("cart", true);
			$(".cart-sidebar-box .cart-sidebar-inner").prepend($(".popup-widget.cart-widget"));
		}
	}
};

if ($(window).width() > 768) {
	cartSidebar();

	$(".cart-sidebar-box .cart-sidebar-inner").fadeIn(750);

	/*document.addEventListener('ShoptetCartAddCartItem', function () {
		cartSidebar();
	});*/

	document.addEventListener("ShoptetCartUpdated", function () {
		cartSidebar();
	});
}

var sidebarFunctions = function () {
	if ($("body.type-category aside").length || $("body.type-detail aside").length) {
		var $sidebarBox = $("aside .cart-sidebar-box");
		var $sidebarInner = $("aside .sidebar-inner");
		var $sidebarBoxInner = $("aside .cart-sidebar-box .cart-sidebar-inner");
		var sidebarOffset = $sidebarBox.offset().top;

		$(".cart-sidebar-box h4").click(function () {
			$sidebarBoxInner.slideToggle();
			$(this).toggleClass("rotate");
		});

		$(window).scroll(function () {
			var scrollFromTop = $(window).scrollTop();

			if ($(window).width() > 768) {
				if (scrollFromTop + 43 > sidebarOffset) {
					$sidebarBox.addClass("fixed");
					$sidebarInner.css("padding-top", $sidebarBox.height() - 48);

					setTimeout(function () {
						$sidebarBox.addClass("showed");

						return false;
					}, 100);
				} else {
					$sidebarBox.removeClass("fixed");
					$sidebarBox.removeClass("showed");
					$sidebarInner.css("padding-top", 0);
				}
			}
		});
	}
};

sidebarFunctions();

if ($(window).width() > 992 && $(".type-detail").length > 0) {
	shoptet.global.showPopupWindow("cart", true);
	$(".cart-widget").addClass("display-none");
	$(".navigation-buttons").on("mouseenter", function () {
		$(".cart-widget").removeClass("display-none");
	});
}
$(".cart-widget").clone().insertAfter(".description-inner .detail-parameters");

let mernaJednotka = $(".price-measure span");

if (mernaJednotka.text().includes("m3")) {
	mernaJednotka.text(mernaJednotka.text().replace("m3", "kapsle"));
}

$(".breadcrumbs").clone().appendTo(".description-inner .extended-description");
$(".p-detail-inner-header > h1").clone().appendTo(".description-inner .extended-description");
$("#product-detail-form").clone().appendTo(".description-inner .extended-description");

$(".description-inner .p-detail-info").insertBefore(".description-inner .row.product-top");
$(".description-inner .p-final-price-wrapper").insertBefore(".description-inner .row.product-top");
$(".description-inner .add-to-cart").insertBefore(".description-inner .row.product-top");

/*kategorie*/
const categoryPage = document.querySelector(".type-category");
if (categoryPage) {
	console.log("KATEGORIE1");
	const categoryPerexReadMore = document.querySelector(".category-perex > table");
	const categorySecondReadMore = document.querySelector(".category__secondDescription > table");

	if (categoryPerexReadMore) {
		console.log("KATEGORIE2");
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
	if (categorySecondReadMore) {
		console.log("KATEGORIE3");
		const showMoreCategorySecond = document.createElement("span");
		const showLessCategorySecond = document.createElement("span");

		const showMoreCategoryContentSecond = document.createTextNode("Zobrazit více");
		const showLessategoryContentSecond = document.createTextNode("Zobrazit méně");

		showMoreCategorySecond.appendChild(showMoreCategoryContentSecond);
		showLessCategorySecond.appendChild(showLessategoryContentSecond);

		showMoreCategorySecond.classList.add("category-read", "more");
		showLessCategorySecond.classList.add("category-read", "less");

		let categorySecondDesc = document.querySelector(".category__secondDescription");
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

/*faq*/
if (document.querySelector(".contact-faq")) {
	$("body").addClass("no-sidebar");
	$(".contact-faq-question > p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
}
