/*Vypnutí mezikroku zobrazení košíku na click na mobilu*/
$("#header .navigation-buttons .cart-count").on("touchstart", function () {
	$(".popup-widget.cart-widget").css("display", "none");
	window.location.href = "/kosik";
});

document.addEventListener("DOMContentLoaded", function () {
	if (!window.matchMedia("(min-width: " + "768" + "px)").matches) {
		$("#navigation").on("click touch", function (event) {
			if (!$(event.target).closest(".menu-level-1").length) {
				shoptet.menu.hideNavigation();
			}
		});

		$(".menu-level-1 >li.ext").on("click touch", function () {
			$("body").addClass("submenu-visible");
		});

		$("#navigation .menu-level-1 > li > a > .submenu-arrow").on("touch", function (event) {
			event.preventDefault();
			$(this).closest("li").toggleClass("exp");
		});

		$("#header .menu-level-1").append('<div class="navigation-back"></div>');

		$(".navigation-back").on("click touch", function () {
			$("body").removeClass("submenu-visible");
			$(".menu-level-1 > li").removeClass("exp");
		});

		/*NA DETAILU PRODUKTU*/
		if ($("body").hasClass("type-detail")) {
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
	}
});
