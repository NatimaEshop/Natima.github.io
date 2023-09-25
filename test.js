let brandPerexReadMore;
let showMoreBrand;
let showLessBrand;
let showMoreBrandContent;
let showLessBrandContent;

if (document.body.classList.contains("type-manufacturer-detail")) {
	$("#filters-wrapper").addClass("sidebar sidebar-left").insertBefore("#content");
	document.addEventListener("DOMContentLoaded", favoritesMove());

	brandPerexReadMore = document.querySelector("#content > table");

	function brandReadMoreFirstButton() {
		if (brandPerexReadMore) {
			function insertAfter(newNode, existingNode) {
				existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
			}

			showMoreBrand = document.createElement("span");
			showLessBrand = document.createElement("span");

			showMoreBrandContent = document.createTextNode("Zobrazit více");
			showLessBrandContent = document.createTextNode("Zobrazit méně");

			showMoreBrand.appendChild(showMoreBrandContent);
			showLessBrand.appendChild(showLessBrandContent);

			showMoreBrand.classList.add("category-read", "more");
			showLessBrand.classList.add("category-read", "less");

			insertAfter(showMoreBrand, brandPerexReadMore);
			insertAfter(showLessBrand, brandPerexReadMore);

			showMoreBrand.addEventListener("click", function (e) {
				e.target.parentElement.classList.add("expanded");
			});
			showLessBrand.addEventListener("click", function (e) {
				e.target.parentElement.classList.remove("expanded");
			});
		}
	}
	brandReadMoreFirstButton();

	document.addEventListener("ShoptetDOMPageContentLoaded", brandReadMoreFirstButton);
}
