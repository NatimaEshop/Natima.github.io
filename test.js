// let discountForm = $(".discount-coupon form");
// let discountInput = $(".discount-coupon input");
// let kodKuponu = "test01";
// let kodProduktu = "D1-NAT0147";
// let kuponSubmited = false;

// //event listener to sumbited form
// $(document).on("submit", ".discount-coupon form", function (e) {
// 	/*Kupon splnuje strukturu*/
// 	if (discountInput.val() !== kodKuponu) {
// 		return;
// 	}
// 	/*Proti zacyklení*/
// 	if (kuponSubmited) {
// 		return;
// 	}
// 	kuponSubmited = true;

// 	/*Pridat produkt do kosiku*/
// 	shoptet.cartShared.addToCart({ productCode: kodProduktu });

// 	/*Po pridani znovu aplikovat kupon*/
// 	document.addEventListener(
// 		"ShoptetDOMContentLoaded",
// 		function () {
// 			discountInput.value = "kodProduktu";
// 			/*Form submission canceled because the form is not connected*/
// 			discountForm.submit();
// 		},
// 		{ once: true }
// 	);

// 	/*Kupon je neplatny*/
// 	document.addEventListener("ShoptetDOMCartContentLoaded", invalidCoupon, { once: true });

// 	/*Kupon je platný*/
// 	document.addEventListener("ShoptetDOMCartCountUpdated", validCoupon, { once: true });
// });

// function invalidCoupon() {
// 	console.log("Kupon je neplatný");
// 	kuponSubmited = false;
// 	shoptet.cartShared.removeFromCart({ productCode: kodProduktu });
// 	console.log("tady bude nějaká hláška");
// 	return;
// }

// function validCoupon() {
// 	console.log("Kupon je platný");
// 	document.removeEventListener("ShoptetDOMCartContentLoaded", invalidCoupon);

// 	let productElement = $("table.cart-table tr[data-micro-sku='" + kodProduktu + "']");
// 	productElement.find("td.p-availability, td.p-quantity").remove();

// 	let productRemoveForm = productElement.find("td.p-total form");
// 	productRemoveForm.css("display", "none");

// 	let discountRemoveButton = $(".discount-coupon form");
// 	discountRemoveButton.on("submit", function () {
// 		productRemoveForm.submit();
// 		kuponSubmited = false;
// 		return;
// 	});
// }
