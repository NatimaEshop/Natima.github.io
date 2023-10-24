var t = $("html");
t.on("click", ".free-gifts-wrapper .free-gifts label", function (t) {
	t.preventDefault();
	var e = $(this).attr("for");
	$(".free-gifts input").each(function () {
		e == $(this).attr("id") ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
	});
	var i = $(".free-gifts-wrapper form");
	shoptet.cart.ajaxSubmitForm(i.attr("action"), i[0], "functionsForCart", "cart", !0);
});

function upravaDarkuVKosiku() {
	let giftSpan = $(".extra.gift > span");

	let darkyText = "Dárky";
	let darkyTextObjednejte = "Objednejte ještě za ";
	let darkyTextHodnotnejsi = " a vyberte si z hodnotnějších dárků.";
	const darkyPrice = $(".extra.gift > span > strong").eq(0);
	const darkyPriceRange = $(".extra.gift .price-range");

	if (document.body.classList.contains("sk")) {
		darkyText = "Darčeky";
		darkyTextObjednejte = "Objednajte si ešte za ";
		darkyTextHodnotnejsi = " a vyberte si z hodnotnejších darčekov.";
	}

	$(".in-kosik .cart-summary h4").text(darkyText);

	if ($(".extras-col .free-gift").length > 0 && $(".extra.gift").length > 0) {
		giftSpan.empty();
		giftSpan.append(darkyTextObjednejte);
		giftSpan.append(darkyPrice);
		giftSpan.append(darkyTextHodnotnejsi);
		giftSpan.append(darkyPriceRange);
	}
}

$(document).ready(function () {
	upravaDarkuVKosiku();
});
document.addEventListener("ShoptetCartUpdated", function () {
	upravaDarkuVKosiku();
});
