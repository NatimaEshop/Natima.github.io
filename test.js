/*document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("ordering-process")) {
		slevovyKuponDarek();
	}
});

function slevovyKuponDarek() {
	let discountForm = $(".discount-coupon form");
	let discountInput = $(".discount-coupon input");
	let kodKuponu = "test01";
	let priceId = 12270;
	let itemId = "";
	let productsInCart;
	let kuponSubmited = false;

	//event listener to sumbited form
	$(document).on("submit", ".discount-coupon form", function (e) {
		if (discountInput.val() !== kodKuponu) {
			return;
		}
		// Proti zacyklení
		if (kuponSubmited) {
			return;
		}

		kuponSubmited = true;

		document.addEventListener(
			"ShoptetDOMCartContentLoaded",
			function () {
				// Pridat produkt do kosiku
				shoptet.cartShared.addToCart({ priceId: priceId });
				document.addEventListener(
					"ShoptetDOMCartContentLoaded",
					function () {
						//get products data
						productsInCart = getShoptetDataLayer("cartInfo").cartItems;

						productsInCart.forEach((product) => {
							if (product.priceId === priceId) {
								itemId = product.itemId;
							}
						});
						//apply code again
						discountForm = $(".discount-coupon form");
						discountInput = $(".discount-coupon input");
						discountInput.val(kodKuponu);
						discountForm.submit();

						document.addEventListener(
							"ShoptetDOMCartContentLoaded",
							function () {
								//PLATNY
								if ($(".applied-coupon").length > 0) {
									validCoupon();
								}
								//NEPLATNY
								else {
									invalidCoupon();
								}
							},
							{ once: true }
						);
					},
					{ once: true }
				);
			},
			{ once: true }
		);
	});

	function invalidCoupon() {
		if ($(".msg").hasClass("msg-error")) {
			console.log("Kupon je neplatný");

			kuponSubmited = false;
			shoptet.cartShared.removeFromCart({ itemId: itemId });

			console.log("tady bude nějaká hláška");
			return;
		}
	}

	function validCoupon() {
		console.log("Kupon je platný");

		document.removeEventListener("ShoptetDOMCartContentLoaded", invalidCoupon);

		let productElement = $("table.cart-table tr[data-micro-sku='" + priceId + "']");
		productElement.find("td.p-availability, td.p-quantity").remove();

		let productRemoveForm = productElement.find("td.p-total form");
		productRemoveForm.css("display", "none");

		let discountRemoveButton = $(".discount-coupon form");
		discountRemoveButton.on("click touch", function (e) {
			shoptet.cartShared.removeFromCart({ itemId: itemId });
			kuponSubmited = false;
		});
	}
}
*/

document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-index")) {
		/*Odkazy na kategorie na hlavní stránce*/
		let links = [];
		if (document.body.classList.contains("cs")) {
			links = ["/novinky/", "/-akce-mesice/", "/dle-zamereni/"];
		}
		if (document.body.classList.contains("sk")) {
			links = ["/novinky/", "/--akcie-mesiaca/", "/dla-zamerania/"];
		}
		$(".homepage-group-title.h4").each(function (index) {
			if (index < links.length) {
				let novyOdkaz = $("<a></a>").attr("href", links[index]).addClass($(this).attr("class")).html($(this).html());
				$(this).replaceWith(novyOdkaz);
			}
		});
		/*Odkaz na oblíbené značky na hlavní stránce*/
		let oblibeneZnazkyOdkaz = "";
		if (document.body.classList.contains("cs")) {
			oblibeneZnazkyOdkaz = "/favorite-znacky/";
		}
		if (document.body.classList.contains("sk")) {
			oblibeneZnazkyOdkaz = "/oblubene-znacky/";
		}
		let oblibeneZnacky = $(".footer-banner .h4");
		let novyOdkaz = $("<a></a>")
			.attr("href", oblibeneZnazkyOdkaz)
			.addClass(oblibeneZnacky.attr("class"))
			.html(oblibeneZnacky.html());

		oblibeneZnacky.replaceWith(novyOdkaz);
	}
});
