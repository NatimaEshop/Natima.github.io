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

/*Nový způsob dárky pomocí kupónu*/
let kodKuponuDarekTaskaNatios = "darekzdarma";
let kodProduktuDarekTaskaNatios = "NAT1229D";

let discountFormInput = "";
let discountFormHTML = "";

let itemID = "";
let containsFreeGift = false;

if (document.body.classList.contains("in-kosik")) {
	$(document).on("submit", ".discount-coupon form", function (e) {
		discountFormInput = $(".discount-coupon input");
		if (discountFormInput.val().toLowerCase() == kodKuponuDarekTaskaNatios.toLowerCase()) {
			vlozeniKuponuNaDarekZdarma();

			document.addEventListener("ShoptetDOMCartContentLoaded", function () {
				getGiftItemID();
				if (containsFreeGift) {
					changeDiscountFormContent();
				} else {
					changeDiscountFormContentToOriginal();
				}
			});
		}
	});

	document.addEventListener("DOMContentLoaded", function () {
		getGiftItemID();
		if (containsFreeGift) {
			changeDiscountFormContent();

			document.addEventListener("ShoptetDOMCartContentLoaded", function () {
				getGiftItemID();
				if (containsFreeGift) {
					changeDiscountFormContent();
				} else {
					changeDiscountFormContentToOriginal();
				}
			});
		}
	});

	function vlozeniKuponuNaDarekZdarma() {
		$("body").addClass("free-gift-added");
		shoptet.cartShared.addToCart({ productCode: kodProduktuDarekTaskaNatios });
		setTimeout(function () {
			$("body").removeClass("free-gift-added");
		}, 3000);
	}

	function changeDiscountFormContent() {
		let appliedFreeGiftCouponHTMLcz =
			'<span>Vložený slevový kupón</span><div class="applied-coupon gift-coupon"><strong>Dárek zdarma</strong><div id="removeGift">x</div></div>';
		let appliedFreeGiftCouponHTMLsk =
			'<span>Vložený slevový kupón</span><div class="applied-coupon gift-coupon"><strong>Dárek zdarma</strong><div id="removeGift">x</div></div>';

		if (document.body.classList.contains("cs")) {
			$(".discount-coupon").html(appliedFreeGiftCouponHTMLcz);
		}
		if (document.body.classList.contains("sk")) {
			$(".discount-coupon").html(appliedFreeGiftCouponHTMLsk);
		}
		$("#removeGift").on("click touch", function () {
			shoptet.cartShared.removeFromCart({ itemId: itemID });
			$(".discount-coupon").html(discountFormHTML);
			containsFreeGift = false;
		});
	}
	function changeDiscountFormContentToOriginal() {
		let originalCouponHTMLcz =
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložit slevový kupón" aria-label="Slevový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Přidat</button><input type="hidden" name="__csrf__" value="csrf_PpXrf0fm842f7cda8f98a645"></form>';
		let originalCouponHTMLsk =
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložit slevový kupón" aria-label="Slevový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Přidat</button><input type="hidden" name="__csrf__" value="csrf_PpXrf0fm842f7cda8f98a645"></form>';
		if (document.body.classList.contains("cs")) {
			$(".discount-coupon").html(originalCouponHTMLcz);
		}
		if (document.body.classList.contains("sk")) {
			$(".discount-coupon").html(originalCouponHTMLsk);
		}
	}

	function getGiftItemID() {
		containsFreeGift = false;
		let cartItems = dataLayer[0].shoptet.cartInfo.cartItems;
		for (let item of cartItems) {
			if (item.code === kodProduktuDarekTaskaNatios) {
				itemID = item.itemId;
				containsFreeGift = true;
			}
		}
	}
}
