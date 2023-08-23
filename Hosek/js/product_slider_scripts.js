/*property to set arrow in the middle of img*/
let productImageHeight;
const root = document.querySelector(":root");

let productSliderElement = document.querySelector(".in-index .products-block .product .image");
let productSliderImage = document.querySelector(".in-index .products-block .product .image img");
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
	$("<div class='product-slider-arrow right'></div>").appendTo(appendElement[i]);
	$("<div class='product-slider-arrow left'></div>").appendTo(appendElement[i]);
}

/*pocet produktu a overflow v slideru*/
let amountOfProductsInSlider;
let overflowOfProductsInSlider;
function numberOfProductsInSlider() {
	amountOfProductsInSlider = getComputedStyle(productSlidersJQ[0]).flexGrow;
	overflowOfProductsInSlider = getComputedStyle(productSlidersJQ[0]).flexShrink;
	console.log(amountOfProductsInSlider);
	console.log(overflowOfProductsInSlider);
}
window.addEventListener("resize", numberOfProductsInSlider);
document.addEventListener("DOMContentLoaded", numberOfProductsInSlider);

/*transladte slideru*/
let translates = [];
let translateIteration = [];
let realNumProductsInSlider = [];
let maximumTranslates = [];
let productSliderJS = document.querySelectorAll(".in-index .products-block");
let arrowsRight = document.querySelectorAll(".product-slider-arrow.right");
let arrowsLeft = document.querySelectorAll(".product-slider-arrow.left");

for (let i = 0; i < productSliderJS.length; i++) {
	translates[i] = 0;
	realNumProductsInSlider[i] = productSliderJS[i].children.length;
	maximumTranslates[i] = Math.floor(realNumProductsInSlider[i] / amountOfProductsInSlider);
	translateIteration[i] = 0;

	arrowsRight[i].addEventListener("click", function () {
		translateIteration[i] = translateIteration[i] + 1;
		translates[i] = translates[i] + 100;
		productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
		console.log(translateIteration[i]);
		console.log(maximumTranslates[i]);
		if (translateIteration[i] < maximumTranslates[i]) {
			return;
		} else {
			arrowsRight[i].classList.add("display-none");
		}
	});
}
