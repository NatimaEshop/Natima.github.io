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
let productSliders = $(".in-index .products-block");
productSliders.wrap("<div class='sliderWrap'></div>");
productSliders.wrap("<div class='slider'></div>");
let appendElement = $(".sliderWrap");

for (let i = 0; i < productSliders.length; i++) {
	$("<div class='product-slider-arrow right'></div>").appendTo(appendElement[i]);
	$("<div class='product-slider-arrow left'></div>").appendTo(appendElement[i]);
}

/*pocet produktu a overflow v slideru*/
let amountOfProductsInSlider;
let overflowOfProductsInSlider;
function numberOfProductsInSlider() {
	amountOfProductsInSlider = getComputedStyle(productSliders[0]).order;
	overflowOfProductsInSlider = getComputedStyle(productSliders[0]).flex;
	console.log(amountOfProductsInSlider);
	console.log(overflowOfProductsInSlider);
}
window.addEventListener("resize", numberOfProductsInSlider);
document.addEventListener("DOMContentLoaded", numberOfProductsInSlider);

/*transladte slideru*/
let translates = [];
let productsInSlider = [];
let arrowsRight = document.querySelectorAll(".product-slider-arrow.right");
let arrowsLeft = document.querySelectorAll(".product-slider-arrow.left");

for (let i = 0; i < productSliders.length; i++) {
	translates[i] = 0;

	arrowsRight[i].addEventListener("click", function () {
		translates[i] = translates[i] + 100;
		productSliders.eq(i).css({
			"-webkit-transform": "translateX(-100%)",
			transform: "translateX(-100%)",
		});
	});

	arrowsLeft[i].addEventListener("click", function () {
		translates[i] = translates[i] + 0;
		productSliders.eq(i).css({
			"-webkit-transform": "translateX(0%)",
			transform: "translateX(0%)",
		});
	});
}
