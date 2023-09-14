/*KATEGORIE*/
if (document.querySelector(".type-category")) {
	console.log("KATEGORIE1");
	const categoryPerexReadMore = document.querySelector(".category-perex > table");
	const categorySecondReadMore = document.querySelector(".category__secondDescription > table");

	if (categoryPerexReadMore) {
		console.log("KATEGORIE2");
		const showMoreCategory = document.createElement("span");
		const showLessCategory = document.createElement("span");

		const showMoreCategoryContent = document.createTextNode("Zobrazit více");
		const showLessategoryContent = document.createTextNode("Zobrazit méně");

		showMoreCategory.appendChild(showMoreCategoryContent);
		showLessCategory.appendChild(showLessategoryContent);

		showMoreCategory.classList.add("category-read", "more");
		showLessCategory.classList.add("category-read", "less");

		let categoryPerex = document.querySelector(".category-perex");
		categoryPerex.appendChild(showMoreCategory);
		categoryPerex.appendChild(showLessCategory);

		showMoreCategory.addEventListener("click", function (e) {
			e.target.parentElement.classList.add("expanded");
		});
		showLessCategory.addEventListener("click", function (e) {
			e.target.parentElement.classList.remove("expanded");
		});
	}
	if (categorySecondReadMore) {
		console.log("KATEGORIE3");
		const showMoreCategorySecond = document.createElement("span");
		const showLessCategorySecond = document.createElement("span");

		const showMoreCategoryContentSecond = document.createTextNode("Zobrazit více");
		const showLessategoryContentSecond = document.createTextNode("Zobrazit méně");

		showMoreCategorySecond.appendChild(showMoreCategoryContentSecond);
		showLessCategorySecond.appendChild(showLessategoryContentSecond);

		showMoreCategorySecond.classList.add("category-read", "more");
		showLessCategorySecond.classList.add("category-read", "less");

		let categorySecondDesc = document.querySelector(".category__secondDescription");
		categorySecondDesc.appendChild(showMoreCategorySecond);
		categorySecondDesc.appendChild(showLessCategorySecond);

		showMoreCategorySecond.addEventListener("click", function (e) {
			e.target.parentElement.classList.add("expanded");
		});
		showLessCategorySecond.addEventListener("click", function (e) {
			e.target.parentElement.classList.remove("expanded");
		});
	}
}

/*faq*/
if (document.querySelector(".contact-faq")) {
	$(".contact-faq-question > p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
}
/*krok 1 kosik*/
if (document.querySelector("body.in-kosik")) {
	rearangeSummary();
	function rearangeSummary() {
		const summaryInsertPlace = $(".summary-wrapper .price-wrapper");
		$(".extra.delivery").parent().parent().insertBefore(summaryInsertPlace);
		$(".delivery-time").insertBefore(summaryInsertPlace);
		$(".discount-coupon").insertBefore(summaryInsertPlace);
	}
	document.addEventListener("ShoptetDOMCartContentLoaded", rearangeSummary);
}

/*kosik 2*/
