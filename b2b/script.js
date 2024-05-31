/*Regist*/
const infoZakaznika = getShoptetDataLayer("customer");
const prihlaseniBolean = infoZakaznika.registered;
const barevneLogo =
	"<div class='site-name'><a href='/prihlaseni'><img src='/user/documents/upload/Natima_logo_official.svg' alt='b2b.natima'></a></div>";
const bileLogo =
	"<div class='site-name'><a href='/prihlaseni'><img src='/user/documents/upload/Natima_logo_official.svg' alt='b2b.natima'></a></div>";

if (window.location.href.indexOf("registrace") > -1 || window.location.href.indexOf("zapomenute-heslo") > -1) {
	const Content = $("#content");
	$("body").append(bileLogo);
	$("body").append(Content);
}
if (prihlaseniBolean != true) {
	if (
		window.location.href.indexOf("obchodni-podminky") > -1 ||
		window.location.href.indexOf("podminky-ochrany-osobnich-udaju") > -1
	) {
		$(".content-inner").prepend(barevneLogo);
	}
}

/*presm po prihlaseni*/
const linkOfTheWebsiteUserCame = document.referrer;
if (linkOfTheWebsiteUserCame === "https://b2b.natima.cz/prihlaseni/") {
	if (window.location.href.indexOf("klient") > -1 && window.location.href.indexOf("zapomenute-heslo") === -1) {
		document.location.href = "https://b2b.natima.cz/";
	}
}
if (
	prihlaseniBolean != true &&
	window.location.href.indexOf("prihlaseni") == -1 &&
	window.location.href.indexOf("registrace") == -1 &&
	window.location.href.indexOf("zapomenute-heslo") == -1 &&
	window.location.href.indexOf("obchodni-podminky") == -1 &&
	window.location.href.indexOf("registrace") == -1 &&
	window.location.href.indexOf("zapomenute-heslo") == -1 &&
	window.location.href.indexOf("podminky-ochrany-osobnich-udaju") == -1
) {
	$(".content-wrapper").remove();
	window.location.replace("/prihlaseni");
}
/*bannery*/
const bannerMainPage = $(".next-to-carousel-banners");
bannerMainPage.insertAfter(".logo_slider");
bannerMainPage.addClass("displayFlex");
/*platby faktury a převod*/
const zakaznikGroupId = infoZakaznika.groupId;
const idVelkoobchod_2 = 4;

if (zakaznikGroupId == idVelkoobchod_2) {
	$('.radio-wrapper[data-id="billing-76"]').show();
} else {
	$('.radio-wrapper[data-id="billing-73"]').show();
}
/*pridano do kos*/
var unikatni = 0;
var unikatniOdstraneni = 0;

function pridanoDoKosikuPopup() {
	$(".btn-cart").click(function () {
		$("#cboxOverlay").addClass("displayNoneImportant");
		$("#colorbox").addClass("displayNoneImportant");
		$(".pridanoDoKosiku").addClass("secondaryPridanoDoKosiku");
		setTimeout(function () {
			$(".pridanoDoKosiku").removeClass("secondaryPridanoDoKosiku");
		}, 200);
		var getNameOfProduct = $(this).closest(".p-in").find(".name").children().text().replace(/^\s+/g, "");
		$(".nazevPridanehoProduktu").text(getNameOfProduct);
		document.addEventListener(
			"ShoptetDOMCartCountUpdated",
			function () {
				$(".pridanoDoKosiku").addClass("activePridanoDoKosiku");
				unikatni = unikatni + 1;
				if (unikatni === 1) {
					unikatniOdstraneni = 1;
					setTimeout(function () {
						$(".pridanoDoKosiku").removeClass("activePridanoDoKosiku");
						if (unikatni > 1) {
							$(".pridanoDoKosiku").addClass("activePridanoDoKosiku");
							unikatniOdstraneni = 0;
							setTimeout(function () {
								if (unikatniOdstraneni === 0) {
									$(".pridanoDoKosiku").removeClass("activePridanoDoKosiku");
								}
							}, 3000);
						}
						unikatni = 0;
					}, 3000);
				}
			},
			{ once: true }
		);
		setTimeout(function () {
			$("#cboxOverlay").remove();
			$("#colorbox").remove();
		}, 2000);
	});
}
/*konec pridano*/
/*marze*/
/*det*/
$(".p-data-wrapper>form .p-price-wrapper .price-save").text(
	$(".p-data-wrapper>form .p-price-wrapper .price-save").text().replace("–", "")
);
if ($(".p-data-wrapper>form .p-price-wrapper .price-save:contains('39 %')").length > 0) {
	$(".p-data-wrapper>form .p-price-wrapper .price-save").text(" 40 %");
}

/*v kategorii*/
function prepisMarze() {
	var textMarze = $(".p-bottom>div .prices .price-save");
	textMarze.each(function (index) {
		$(this).text($(this).text().replace(/[–()]/gi, ""));
		if ($(this).text() == " 39 %") {
			$(this).text(" 40 %");
		}
	});
}
/*konec marze*/
pridanoDoKosikuPopup();
prepisMarze();

document.addEventListener("DOMContentLoaded", function () {
	prepisMarze();
	pridanoDoKosikuPopup();
});

/*vice produktu*/
document.addEventListener(
	"ShoptetDOMPageMoreProductsLoaded",
	function () {
		prepisMarze();
		pridanoDoKosikuPopup();
	},
	false
);

/*zmena serazeni*/
document.addEventListener(
	"ShoptetPageSortingChanged",
	function () {
		document.addEventListener(
			"ShoptetDOMPageContentLoaded",
			function () {
				prepisMarze();
				pridanoDoKosikuPopup();
			},
			true
		);
	},
	false
);

/*filter*/
document.addEventListener(
	"ShoptetPageFilterValueChange",
	function () {
		document.addEventListener(
			"ShoptetDOMPageContentLoaded",
			function () {
				prepisMarze();
				pridanoDoKosikuPopup();
			},
			true
		);
	},
	false
);

/*stranka*/
document.addEventListener(
	"ShoptetPagePaginationUsed",
	function () {
		document.addEventListener(
			"ShoptetDOMPageContentLoaded",
			function () {
				prepisMarze();
				pridanoDoKosikuPopup();
			},
			true
		);
	},
	false
);

/*vyhledavani*/
$("#loadNextSearchResults").click(function () {
	document.addEventListener(
		"ShoptetDOMPageContentLoaded",
		function () {
			prepisMarze();
			pridanoDoKosikuPopup();
		},
		true
	);
});

/*DEN DETI*/
/*DEN DETI*/
/*DEN DETI*/
let appendDenDeti =
	'<div class="natios-daruje-blok"><p>Nejen že Natios dnes nakoupíte s <b>5% slevou</b>, ale Natios <b>daruje navíc 5&nbsp;% z celkové částky objednávky dětské hematoonkologii</b> ve Fakultní nemocnici v Ostravě.</br></br> Léčba každého onkologického pacienta v České republice se odhaduje na přibližně 8&nbsp;000&nbsp;Kč měsíčně. Věříme tedy, že tímto krokem společně dokážeme pomoci několika rodinám.</div>';
if ($("body").hasClass("type-detail")) {
	if ($(".p-detail-inner .flag-den-deti-s-natios").length > 0) {
		$(appendDenDeti).insertAfter(".p-detail-inner .detail-parameters");

		// Select the span and get its content
		let $priceFinalHolder = $(".p-detail-inner .price-final-holder");
		let salePrice = parseFloat($priceFinalHolder.text().trim().replace(" Kč", ""));

		// Calculate the original price (salePrice is 95% of the original price)
		let originalPrice = Math.ceil(salePrice / 0.95);

		// Format the original price and insert it into the span
		let originalPriceHtml = `<del>${originalPrice} Kč</del> `;
		$priceFinalHolder.prepend(originalPriceHtml);
	}
}
