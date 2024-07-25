let carouselArrowRight;
let carouselArrowLeft;
let productImageHeight; /*property to set arrow in the middle of img*/
const root = document.querySelector(":root");

/*carousel*/
let carouselSliderElementJS;
let carouselSliderElementParentJQ;
let amountOfBannersInSlider;
let realNumberOfBannersInSlider;
let numberOfScrolledItemsInSlider;
let carouselTranslateId = 0;
let translateCarousel = 0;

/*produkt slider*/
let productSliderElement;
let productSliderImage;
let productSlidersJQ;
let appendElement;
let amountOfProductsInSlider;
let productSliderJS;
let productsArrowsRight;
let productsArrowsLeft;

/*translate slideru*/
let translates = [];
let translateIteration = [];
let realNumProductsInSlider = [];
let maximumTranslates = [];

if (document.querySelector("body.in-index")) {
	productSliderElement = document.querySelector(".in-index .products-block .product .image");
	productSliderImage = document.querySelector(".in-index .products-block .product .image img");

	function getSliderProductHeight() {
		productImageHeight = productSliderElement.offsetHeight / 2;
		root.style.setProperty("--slider-product-height", productImageHeight + "px");
	}
	productSliderImage.onload = function () {
		getSliderProductHeight();
	};

	window.addEventListener("resize", getSliderProductHeight);

	/*arrows slider*/
	productSlidersJQ = $(".in-index .products-block");
	productSlidersJQ.wrap("<div class='sliderWrap'></div>");
	productSlidersJQ.wrap("<div class='slider'></div>");
	appendElement = $(".sliderWrap");

	for (let i = 0; i < productSlidersJQ.length; i++) {
		$("<div class='slider-arrow right'></div>").appendTo(appendElement[i]);
		$("<div class='slider-arrow left'></div>").appendTo(appendElement[i]);
	}

	/*pocet produktu a overflow v slideru*/
	function numberOfProductsInSlider() {
		amountOfProductsInSlider = getComputedStyle(productSlidersJQ[0]).flexGrow;
	}
	window.addEventListener("resize", numberOfProductsInSlider);
	numberOfProductsInSlider();

	productSliderJS = document.querySelectorAll(".in-index .products-block");
	productsArrowsRight = document.querySelectorAll(".in-index .sliderWrap .slider-arrow.right");
	productsArrowsLeft = document.querySelectorAll(".in-index .sliderWrap .slider-arrow.left");

	/*APPEND BLOG*/
	if (document.querySelector(".homepage-blog-wrapper") !== null) {
		productSlidersJQ.add($(".homepage-blog-wrapper"));
		productSliderJS = document.querySelectorAll(".in-index .products-block, .homepage-blog-wrapper");
	}

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
	/*----remove carousel item for not logged in*/
	if ($(".carousel-inner .carousel-banner-content.for-logged-in-only").length > 0) {
		if (document.body.classList.contains("user-not-logged-in")) {
			$(".carousel-inner .carousel-banner-content.for-logged-in-only").parent().parent().parent().remove();
		}
	}

	carouselSliderElementJS = document.querySelector(".in-index .banners-row .col-sm-8 .carousel-inner");
	carouselSliderElementParentJQ = $(".in-index .banners-row .col-sm-8");

	$("<div class='slider-arrow right'></div>").appendTo(carouselSliderElementParentJQ);
	$("<div class='slider-arrow left'></div>").appendTo(carouselSliderElementParentJQ);

	/*pocet produktu a overflow v slideru*/
	amountOfBannersInSlider;
	realNumberOfBannersInSlider = document.querySelectorAll(
		".in-index .banners-row .col-sm-8 .carousel-inner .item"
	).length;

	numberOfScrolledItemsInSlider = amountOfBannersInSlider;

	function numberOfBannersInSlider() {
		amountOfBannersInSlider = getComputedStyle(carouselSliderElementParentJQ[0]).flexGrow;
	}
	window.addEventListener("resize", numberOfBannersInSlider);
	numberOfBannersInSlider();

	carouselArrowRight = document.querySelector(".in-index .banners-row .col-sm-8 .slider-arrow.right");
	carouselArrowLeft = document.querySelector(".in-index .banners-row .col-sm-8 .slider-arrow.left");

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

	carouselArrowLeft.addEventListener("click", function () {
		carouselArrowRight.classList.remove("display-none");
		carouselTranslateId = carouselTranslateId - 1;
		translateCarousel = 100 * carouselTranslateId;
		carouselSliderElementJS.style.transform = "translateX(-" + translateCarousel + "%)";

		if (carouselTranslateId === 0) {
			carouselArrowLeft.classList.add("display-none");
		}
	});

	/*on resize vynulovat a na začátek*/
	window.addEventListener("resize", function () {
		for (let i = 0; i < productSliderJS.length; i++) {
			translates[i] = 0;
			translateIteration[i] = 1;
			maximumTranslates[i] = Math.floor(realNumProductsInSlider[i] / amountOfProductsInSlider);
			productsArrowsLeft[i].classList.add("display-none");
			productSliderJS[i].style.transform = "translateX(-" + translates[i] + "%)";
			productsArrowsLeft[i].classList.add("display-none");
			productsArrowsRight[i].classList.remove("display-none");
			if (!matchesMedia992) {
				productsArrowsRight[i].classList.add("display-none");
			}
		}

		carouselTranslateId = 0;
		translateCarousel = 0;
		carouselSliderElementJS.style.transform = "translateX(-" + translateCarousel + "%)";
		carouselArrowLeft.classList.add("display-none");
		carouselArrowRight.classList.remove("display-none");
		if (!matchesMedia992) {
			carouselArrowRight.classList.add("display-none");
		}
	});
}
