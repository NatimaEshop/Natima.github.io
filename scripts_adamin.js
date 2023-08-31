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
