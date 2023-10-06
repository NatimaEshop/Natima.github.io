let containsFavorites = false;
if ($(".top-nav-button-account").length > 0) {
	console.log("logged in");
	document.addEventListener("DOMContentLoaded", function () {
		// Function to react when the class changes to "action"
		function handleActionClassChange(event) {
			if (event.target.classList.contains("dklab-favourites") && !containsFavorites) {
				let navigationFavorite = $("#dkLabFavHeaderWrapper");
				let navigationCart = $(".header-top .navigation-buttons");
				navigationFavorite.insertBefore(navigationCart);
				favoritesMove();
				containsFavorites = true;
			}
		}

		const observer = new MutationObserver(function (mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === "attributes" && mutation.attributeName === "class") {
					handleActionClassChange(mutation);
				}
			}
		});

		observer.observe(document.body, { attributes: true, subtree: false });

		$(document).ajaxComplete(function () {
			favoritesMove();
		});
	});
}
