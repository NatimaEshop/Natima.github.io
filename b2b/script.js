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
const customerEmail = infoZakaznika.email;

if (zakaznikGroupId == idVelkoobchod_2) {
	$('.radio-wrapper[data-id="billing-76"]').show();
} else {
	$('.radio-wrapper[data-id="billing-73"]').show();
}

/*cukrfree 14 dni splatnost misto 7*/
if (customerEmail == "cukrfree@gmail.com" || customerEmail == "fakturace@vitalpoint.cz") {
	$('.radio-wrapper[data-id="billing-76"]').hide();
	$('.radio-wrapper[data-id="billing-87"]').show();
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
	calculateMinSellPriceWithVAT();
});

/*vice produktu*/
document.addEventListener(
	"ShoptetDOMPageMoreProductsLoaded",
	function () {
		prepisMarze();
		pridanoDoKosikuPopup();
		calculateMinSellPriceWithVAT();
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
				calculateMinSellPriceWithVAT();
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
				calculateMinSellPriceWithVAT();
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
				calculateMinSellPriceWithVAT();
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
			calculateMinSellPriceWithVAT();
		},
		true
	);
});

/*DEN DETI*/
/*DEN DETI*/
/*DEN DETI*/
/*
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
}*/

document.addEventListener("DOMContentLoaded", function (event) {
	if (document.body.classList.contains("type-detail")) {
		/*card height*/
		function cardHeight() {
			if ($(".card-text").length > 1) {
				let cardHeight = 0;

				$(".card-text").css("min-height", "");

				$(".card-text").each(function () {
					var thisHeight = $(this).outerHeight();
					if (thisHeight > cardHeight) {
						cardHeight = thisHeight;
					}
				});
				$(".card-text").css("min-height", cardHeight);
			}
		}
		cardHeight();
		window.addEventListener("resize", cardHeight);

		/*Custom desc NATIOS JS*/
		if ($(".custom-desc").length >= 1) {
			$("body").addClass("custom-product");
			var sliderChild = $(".ikony.slider").children();
			let sliderChildLength = sliderChild.length;
			var activeChild = 0;
			let intervalId;
			let intervalTime = 4000;
			console.log(sliderChild);
			console.log(intervalTime);

			// Variables for swipe functionality
			let startTouchPosition, endTouchPosition;

			// Check if there are more than 1 children
			if (sliderChildLength > 1) {
				// Create div dots
				let dots = $('<div class="dots"></div>');

				// Create a dot for each entry in sliderChild
				sliderChild.each(function () {
					dots.append('<div class="dot"></div>');
				});

				// Append dots to .ikony.slider
				$(".ikony.slider").append(dots);

				$(".slider .dot").first().addClass("active");

				$(".slider .dot").click(function () {
					activeChild = $(this).index();
					updateSlider();
					clearInterval(intervalId); // Stop the interval when a dot is clicked
				});

				// Increase value of activeChild by 1 every 10 seconds and trigger updateSlider
				intervalId = setInterval(function () {
					activeChild = (activeChild + 1) % sliderChildLength; // Use modulus to loop back to 0 when reaching the end
					updateSlider();
				}, intervalTime);

				// Swipe functionality
				$(".ikony.slider").on("touchstart", function (e) {
					startTouchPosition = e.originalEvent.touches[0].clientX;
				});

				$(".ikony.slider").on("touchmove", function (e) {
					endTouchPosition = e.originalEvent.touches[0].clientX;
				});

				$(".ikony.slider").on("touchend", function () {
					if (startTouchPosition < endTouchPosition) {
						activeChild = activeChild > 0 ? activeChild - 1 : sliderChildLength - 1;
					} else {
						activeChild = (activeChild + 1) % sliderChildLength;
					}
					updateSlider();
					clearInterval(intervalId); // Stop the interval when a dot is clicked
				});
			}

			function updateSlider() {
				sliderChild.each(function (index) {
					$(this).css("transform", "translateX(" + -activeChild * 100 + "%)");
				});

				$(".slider .dot").each(function (index) {
					if (index == activeChild) {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");
					}
				});
			}

			if ($(".custom-desc .compare").length == 0) {
			} else {
				let items = $(".custom-desc .compare p");
				let items_columns = 2;

				function setMinHeightCompare() {
					$(items).css("min-height", "");
					for (let i = 0; i < items.length / items_columns; i++) {
						index = i * items_columns;
						let item = items[index];
						let next = items[index + 1];
						if (next) {
							let item_height = $(item).innerHeight();
							let next_height = $(next).innerHeight();
							if (item_height > next_height) {
								$(next).css("min-height", item_height);
							} else {
								$(item).css("min-height", next_height);
							}
						}
					}
				}
				setMinHeightCompare();
				window.addEventListener("resize", setMinHeightCompare);
			}
		}
	}
});

/*toggle active class ve faq*/
$(function () {
	$(".contact-faq-question p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
});

function calculateMinSellPriceWithVAT() {
	/*
	if ($("body").hasClass("admin-logged") === false) {
		return;
	}*/
	let stdPriceElements = document.querySelectorAll(".price-standard");

	stdPriceElements.forEach(function (element) {
		// Get standard price text
		if (element.classList.contains("calculated")) {
			return;
		}
		let stdPriceSpan = element.querySelector("span");
		let stdPriceText = stdPriceSpan.textContent.trim();
		stdPriceText = stdPriceText.replace("Kč", "").trim().replace(",", ".");
		let stdPriceNumber = parseFloat(stdPriceText);
		console.log("Price:", stdPriceNumber);

		let container = element.parentElement.parentElement;
		let priceWithVAT = container.querySelector(".price-additional");
		let priceWOVAT = container.querySelector(".price-final");

		if (!priceWithVAT || !priceWOVAT) {
			console.warn("Missing price-additional or price-final elements in container");
			return;
		}

		// Process sellingPriceWithVAT text: remove parentheses, "Kč", trim and replace comma with dot
		let sellingPriceWithVATText = priceWithVAT.textContent
			.replace(/[()]/g, "")
			.replace("Kč", "")
			.trim()
			.replace(",", ".");
		let sellingPriceWithVAT = parseFloat(sellingPriceWithVATText);

		// Process sellingPriceWOVAT text similarly
		let sellingPriceWOVATText = priceWOVAT.textContent.replace("Kč", "").trim().replace(",", ".");
		let sellingPriceWOVAT = parseFloat(sellingPriceWOVATText);

		let VAT = sellingPriceWithVAT / sellingPriceWOVAT;
		VAT = Math.round(VAT * 100) / 100;

		let stdPriceWithVAT = stdPriceNumber * VAT;
		stdPriceWithVAT = Math.round(stdPriceWithVAT * 100) / 100;

		console.log("VAT:", VAT);
		console.log("Price with VAT:", stdPriceWithVAT);

		//input stdPriceWithVAT value to the stdPriceWithVAT with Kč
		//if price has . replace with ,
		if (stdPriceWithVAT.toString().includes(".")) {
			stdPriceWithVAT = stdPriceWithVAT.toFixed(2).replace(".", ",");
		}
		stdPriceSpan.textContent = stdPriceWithVAT + " Kč";
		//add calculated class to the element
		element.classList.add("calculated");
	});
}

//if body has admin-logged
/*
if ($("body").hasClass("admin-logged")) {
	calculateMinSellPriceWithVAT();
}*/
