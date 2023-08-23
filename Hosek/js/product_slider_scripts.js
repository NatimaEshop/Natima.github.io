/*property to set arrow in the middle of img*/
let productImageHeight;
const root = document.querySelector(":root");

let productSliderElement = document.querySelector(".in-index .products-block .product .image");
let productSliderImage = document.querySelector(".in-index .products-block .product .image img");
let productSliderElement2 = document.querySelector(".in-index .products-block.homepage-products-3 .product .image");
let productSliderImage2 = document.querySelector(".in-index .products-block.homepage-products-3 .product .image img");
function getSliderProductHeight() {
	productImageHeight = productSliderElement.offsetHeight / 2;
	root.style.setProperty("--slider-product-height", productImageHeight + "px");
}
function getSliderProductHeight2() {
	productImageHeight2 = productSliderElement2.offsetHeight / 2;
	root.style.setProperty("--slider-product-height", productImageHeight2 + "px");
}
productSliderImage.onload = function () {
	getSliderProductHeight();
};
productSliderImage2.onload = function () {
	getSliderProductHeight2();
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
numberOfProductsInSlider();

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
	translateIteration[i] = 1;
	realNumProductsInSlider[i] = productSliderJS[i].children.length;
	maximumTranslates[i] = Math.floor(realNumProductsInSlider[i] / amountOfProductsInSlider);
	arrowsLeft[i].classList.add("display-none");

	arrowsRight[i].addEventListener("click", function () {
		translateIteration[i] = translateIteration[i] + 1;
		translates[i] = translates[i] + 100;
		productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
		arrowsLeft[i].classList.remove("display-none");
		if (translateIteration[i] < maximumTranslates[i]) {
			return;
		} else {
			arrowsRight[i].classList.add("display-none");
		}
	});

	arrowsLeft[i].addEventListener("click", function () {
		translateIteration[i] = translateIteration[i] - 1;
		translates[i] = translates[i] - 100;
		productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
		arrowsRight[i].classList.remove("display-none");
		if (translateIteration[i] !== 1) {
			return;
		} else {
			arrowsLeft[i].classList.add("display-none");
		}
	});
}
