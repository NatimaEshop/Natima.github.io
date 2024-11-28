/*---------------------------------------------------------------------------------------------------Přidání dárku do košíku zdarma*/
if (document.body.classList.contains("in-kosik")) {
	let kodProduktuDarekTaskaNatios = "NAT1229D";
	let kodyKuponuDarekTaskaNatios = ["taska", "taška"];
	let discountFormInput = "";
	let discountFormHTML = "";
	let itemID = "";
	let containsFreeGift = false;
	let hodnotaKosiku = 0;
	let hodnotaKosikuProUplatneni = 1000;
	if (slovakEshop) {
		hodnotaKosikuProUplatneni = 40;
	}
	$(document).on("submit", ".discount-coupon form", function (e) {
		hodnotaKosiku = dataLayer[0].shoptet.cartInfo.getNoBillingShippingPrice.withVat;
		discountFormInput = $(".discount-coupon input");
		if (
			kodyKuponuDarekTaskaNatios.includes(discountFormInput.val().toLowerCase()) &&
			hodnotaKosiku >= hodnotaKosikuProUplatneni
		) {
			vlozeniKuponuNaDarekZdarma();

			document.addEventListener("ShoptetDOMCartContentLoaded", function () {
				getGiftItemID();
				if (containsFreeGift && hodnotaKosiku >= hodnotaKosikuProUplatneni) {
					changeDiscountFormContent();
				} else if (containsFreeGift) {
					shoptet.cartShared.removeFromCart({ itemId: itemID });
					containsFreeGift = false;
					changeDiscountFormContentToOriginal();
				} else {
					changeDiscountFormContentToOriginal();
				}
			});
		} else if (
			kodyKuponuDarekTaskaNatios.includes(discountFormInput.val().toLowerCase()) &&
			hodnotaKosiku < hodnotaKosikuProUplatneni
		) {
			setTimeout(function () {
				if (czechEshop) {
					$(".msg-error span[data-testid='notifierMessage']").text(
						"Tento kód je možné pouze při objednávce nad " + hodnotaKosikuProUplatneni + " Kč."
					);
				}
				if (slovakEshop) {
					$(".msg-error span[data-testid='notifierMessage']").text(
						"Tento kód je možné iba pri objednávke nad " + hodnotaKosikuProUplatneni + " €."
					);
				}
			}, 300);
		}
	});

	document.addEventListener("DOMContentLoaded", function () {
		getGiftItemID();

		if (containsFreeGift && hodnotaKosiku >= hodnotaKosikuProUplatneni) {
			changeDiscountFormContent();

			document.addEventListener("ShoptetDOMCartContentLoaded", function () {
				getGiftItemID();
				if (containsFreeGift && hodnotaKosiku >= hodnotaKosikuProUplatneni) {
					changeDiscountFormContent();
				} else if (containsFreeGift) {
					shoptet.cartShared.removeFromCart({ itemId: itemID });
					containsFreeGift = false;
					changeDiscountFormContentToOriginal();
				} else {
					changeDiscountFormContentToOriginal();
				}
			});
		} else if (containsFreeGift) {
			shoptet.cartShared.removeFromCart({ itemId: itemID });
			containsFreeGift = false;
			changeDiscountFormContentToOriginal();
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
			'<span>Vložený slevový kupón</span><div class="applied-coupon gift-coupon"><strong>Dárek zdarma - Taška NATIOS</strong><div id="removeGift">x</div></div>';
		let appliedFreeGiftCouponHTMLsk =
			'<span>Vložený zľavový kupón</span><div class="applied-coupon gift-coupon"><strong>Darček zadarmo - Taška NATIOS</strong><div id="removeGift">x</div></div>';

		if (czechEshop) {
			$(".discount-coupon").html(appliedFreeGiftCouponHTMLcz);
		}
		if (slovakEshop) {
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
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložit slevový kupón" aria-label="Slevový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Přidat</button></form>';
		let originalCouponHTMLsk =
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložiť zľavový kupón" aria-label="Zľavový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Pridať</button></form>';
		if (czechEshop) {
			$(".discount-coupon").html(originalCouponHTMLcz);
		}
		if (slovakEshop) {
			$(".discount-coupon").html(originalCouponHTMLsk);
		}
	}

	function getGiftItemID() {
		hodnotaKosiku = dataLayer[0].shoptet.cartInfo.getNoBillingShippingPrice.withVat;
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
/*---------------------------------------------------------------------------------------------------KONEC Přidání dárku do košíku zdarma*/
