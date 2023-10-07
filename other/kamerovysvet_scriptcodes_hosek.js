if ($(".top-navigation-tools .top-nav-button-account").length == 0) {
	ifNotLoggedIn();
}
function ifNotLoggedIn() {
	$("body").addClass("not-logged-in");

	$(document).ready(function () {
		hidePricesForNotLoggedUsers();
	});

	$(document).ajaxComplete(function () {
		hidePricesForNotLoggedUsers();
	});
	hidePricesForNotLoggedUsers();
}
function hidePricesForNotLoggedUsers() {
	/*price in list of products*/
	if ($(".product .availability-reg-only").length > 0) {
		$(".product .availability-reg-only").each(function () {
			$(this).parents(".product").addClass("priceForRegistered");
			$(this).parents(".product").find(".prices").children().remove();
		});
	}
	/*product detail*/
	if ($(".p-info-wrapper .availability-reg-only").length > 0) {
		$(".p-info-wrapper").addClass("priceForRegistered");
		$(".p-final-price-wrapper").children().remove();
		$(".availability-reg-only").children().remove();
		$(".availability-reg-only").append(
			'<div class="pouzeProPrihlasene"><p><b>Tento produkt mohou zakoupit pouze registrovaní uživatelé</b></p><p>Prosíme <a href="/login">přihlaste se</a>.</p><p>Pokud ještě registraci nemáte, můžete ji zdarma provést zdarma <a href="/registrace">zde</a>.</p></div>'
		);
	}
}
