/*Přidání dárku do košíku zdarma*/
if (document.body.classList.contains("in-kosik")) {
	let kodProduktuDarekTaskaNatios = "NAT1229D";
	let kodyKuponuDarekTaskaNatios = ["darekzdarma", "darekzdarma2", "darekzdarma3"];
	let discountFormInput = "";
	let discountFormHTML = "";
	let itemID = "";
	let containsFreeGift = false;
	$(document).on("submit", ".discount-coupon form", function (e) {
		discountFormInput = $(".discount-coupon input");
		if (kodyKuponuDarekTaskaNatios.includes(discountFormInput.val().toLowerCase())) {
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
			'<span>Vložený zľavový kupón</span><div class="applied-coupon gift-coupon"><strong>Darček zadarmo</strong><div id="removeGift">x</div></div>';

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
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložit slevový kupón" aria-label="Slevový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Přidat</button></form>';
		let originalCouponHTMLsk =
			'<form method="post" action="/action/Cart/addDiscountCoupon/" class="input-group csrf-enabled" data-testid="formDiscountCoupon"><input type="text" name="discountCouponCode" id="discountCouponCode" class="form-control" required="" placeholder="Vložiť zľavový kupón" aria-label="Zľavový kupón" data-testid="inputDiscountCoupon"><button type="submit" class="btn btn-secondary" data-testid="buttonSubmitDiscountCoupon">Pridať</button></form>';
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
