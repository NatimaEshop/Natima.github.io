/*property to set arrow in the middle of img*/
let productImageHeight;
/* let sliderItemHeight; */
const root = document.querySelector(":root");

let productSliderElement = document.querySelector(".in-index .products-block .product .image");
let productSliderImage = document.querySelector(".in-index .products-block .product .image img");
let productSliderElement2 = document.querySelector(".in-index .products-block.homepage-products-3 .product .image");
let productSliderImage2 = document.querySelector(".in-index .products-block.homepage-products-3 .product .image img");

function getSliderProductHeight() {
	productImageHeight = productSliderElement.offsetHeight / 2;
	root.style.setProperty("--slider-product-height", productImageHeight + "px");
}

productSliderImage.onload = function () {
	getSliderProductHeight();
};
window.addEventListener("resize", getSliderProductHeight);

/*arrows slider*/
let productSlidersJQ = $(".in-index .products-block");
productSlidersJQ.wrap("<div class='sliderWrap'></div>");
productSlidersJQ.wrap("<div class='slider'></div>");
let appendElement = $(".sliderWrap");

for (let i = 0; i < productSlidersJQ.length; i++) {
	$("<div class='slider-arrow right'></div>").appendTo(appendElement[i]);
	$("<div class='slider-arrow left'></div>").appendTo(appendElement[i]);
}

/*pocet produktu a overflow v slideru*/
let amountOfProductsInSlider;
let overflowOfProductsInSlider;
function numberOfProductsInSlider() {
	amountOfProductsInSlider = getComputedStyle(productSlidersJQ[0]).flexGrow;
	overflowOfProductsInSlider = getComputedStyle(productSlidersJQ[0]).flexShrink;
}
window.addEventListener("resize", numberOfProductsInSlider);
numberOfProductsInSlider();

/*transladte slideru*/
let translates = [];
let translateIteration = [];
let realNumProductsInSlider = [];
let maximumTranslates = [];
let productSliderJS = document.querySelectorAll(".in-index .products-block");
let productsArrowsRight = document.querySelectorAll(".in-index .sliderWrap .slider-arrow.right");
let productsArrowsLeft = document.querySelectorAll(".in-index .sliderWrap .slider-arrow.left");

for (let i = 0; i < productSliderJS.length; i++) {
	translates[i] = 0;
	translateIteration[i] = 1;
	realNumProductsInSlider[i] = productSliderJS[i].children.length;
	maximumTranslates[i] = Math.floor(realNumProductsInSlider[i] / amountOfProductsInSlider);
	productsArrowsLeft[i].classList.add("display-none");

	productsArrowsRight[i].addEventListener("click", function () {
		translateIteration[i] = translateIteration[i] + 1;
		translates[i] = translates[i] + 100;
		productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
		productsArrowsLeft[i].classList.remove("display-none");
		if (translateIteration[i] < maximumTranslates[i]) {
			return;
		} else {
			productsArrowsRight[i].classList.add("display-none");
		}
	});

	productsArrowsLeft[i].addEventListener("click", function () {
		translateIteration[i] = translateIteration[i] - 1;
		translates[i] = translates[i] - 100;
		productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
		productsArrowsRight[i].classList.remove("display-none");
		if (translateIteration[i] !== 1) {
			return;
		} else {
			productsArrowsLeft[i].classList.add("display-none");
		}
	});
}

/*carousel*/
let carouselSliderElementJS = document.querySelector(".in-index .banners-row .col-sm-8");
let carouselSliderElementJQ = $(".in-index .banners-row .col-sm-8");

$("<div class='slider-arrow right'></div>").appendTo(carouselSliderElementJQ);
$("<div class='slider-arrow left'></div>").appendTo(carouselSliderElementJQ);

/*pocet produktu a overflow v slideru*/
let amountOfBannersInSlider;
let realNumberOfBannersInSlider = document.querySelectorAll(
	".in-index .banners-row .col-sm-8 .carousel-inner .item"
).length;
let numberOfScrolledItemsInSlider = amountOfBannersInSlider;
let carouselTranslateId = 0;
let translateCarousel = 0;

function numberOfBannersInSlider() {
	amountOfBannersInSlider = getComputedStyle(carouselSliderElementJQ[0]).flexGrow;
}
window.addEventListener("resize", numberOfBannersInSlider);
numberOfBannersInSlider();

let carouselArrowRight = document.querySelector(".in-index .banners-row .col-sm-8 .slider-arrow.right");
let carouselArrowLeft = document.querySelector(".in-index .banners-row .col-sm-8 .slider-arrow.left");

carouselArrowLeft.classList.add("display-none");

carouselArrowRight.addEventListener("click", function () {
	carouselSliderElementJS.classList.add("active");
	carouselArrowLeft.classList.remove("display-none");

	carouselTranslateId = carouselTranslateId + 1;
	numberOfScrolledItemsInSlider = amountOfBannersInSlider * (carouselTranslateId + 1);

	if (numberOfScrolledItemsInSlider < realNumberOfBannersInSlider) {
		translateCarousel = 100 * carouselTranslateId;
	} else if (numberOfScrolledItemsInSlider === realNumberOfBannersInSlider) {
		translateCarousel = 100 * carouselTranslateId;
		carouselArrowRight.classList.add("display-none");
	} else {
		translateCarousel =
			100 * carouselTranslateId -
			((numberOfScrolledItemsInSlider - realNumberOfBannersInSlider) / amountOfBannersInSlider) * 100;
		carouselArrowRight.classList.add("display-none");
	}

	carouselSliderElementJS.style.transform = "translateX(-" + translateCarousel + "%)";
});
