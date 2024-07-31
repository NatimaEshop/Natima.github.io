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

	$(document).ready(function() {
		// Select the <time> element
		var timeElement = $('time[datetime]');

		// Extract the date from the datetime attribute
		var dateStr = timeElement.attr('datetime');

		// Parse the date
		var date = new Date(dateStr);
		var comparisonDate = new Date('2024-07-31');

		// Check if the date is before 31.07.2024
		if (date < comparisonDate) {
			console.log("The date is before 31.07.2024");
		} else {
			console.log("The date is on or after 31.07.2024");
		}

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
	if (document.body.classList.contains("in-blog")) {
		let timeElement = $(".news-item-detail time[datetime]");
		let dateStr = timeElement.attr("datetime");
		let [day, month, year] = dateStr.split(".").map(Number);
		let date = new Date(year, month - 1, day);
		let comparisonDate = new Date(2024, 6, 31);

		if (date < comparisonDate) {
			$("body").addClass("old-blog");
		}
	}
});
