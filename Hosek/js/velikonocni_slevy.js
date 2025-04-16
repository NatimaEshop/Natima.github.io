/*------------------------------------------------*/
/*Jedná se prakticky o blog, pouze osekany na kategorie*/
/*Bylo nutné udělat další script, kvůli nové rubrice*/
/*Script je načítán inline přímo v článku*/

document.addEventListener("DOMContentLoaded", function () {
	fetchAndAppendBlogCategory();
	async function fetchAndAppendBlogCategory() {
		let productRequests = [];
		let maxNumberOfProducts = 4;

		$("#content p").each(function () {
			let text = $(this).text();
			if (/##KATEGORIE##/i.test(text)) {
				let match = text.match(/##KATEGORIE##(\d+)\s+(https?:\/\/[^\s]+)/);
				if (match) {
					let numberOfProducts = Math.min(parseInt(match[1], 10), maxNumberOfProducts);
					let url = match[2];
					productRequests.push({ numberOfProducts, url, paragraph: $(this) });
				}
			}
		});

		if (productRequests.length > 0) {
			for (let request of productRequests) {
				let blogProductsDiv = $("<div>", { class: "blog-fetched-category" });

				try {
					const response = await fetch(request.url);
					const text = await response.text();
					const parser = new DOMParser();
					const doc = parser.parseFromString(text, "text/html");
					const products = doc.querySelectorAll("#products > .product");

					for (let i = 0; i < request.numberOfProducts && i < products.length; i++) {
						let product = products[i].cloneNode(true);

						// Replace src with data-src for all img elements
						$(product)
							.find("img")
							.each(function () {
								let dataSrc = $(this).attr("data-src");
								if (dataSrc) {
									$(this).attr("src", dataSrc);
								}
							});

						blogProductsDiv.append(product);
					}

					let showCategoryText = "";
					if (document.body.classList.contains("cs")) {
						showCategoryText = "Zobrazit vše";
					}
					if (document.body.classList.contains("sk")) {
						showCategoryText = "Zobraziť všetko";
					}
					if (document.body.classList.contains("pl")) {
						showCategoryText = "Pokaż wszystko";
					}

					// Create the show-all-blog-btn div with an anchor inside
					let showBlogButtonDiv = $("<div>", { class: "show-all-blog-btn" }).append(
						$("<a>", { href: request.url, target: "_blank" }).text(showCategoryText)
					);

					// Insert the blogProductsDiv before the paragraph containing ##KATEGORIE##
					request.paragraph.before(blogProductsDiv);

					// Insert the show-all-blog-btn div before the paragraph containing ##KATEGORIE##
					request.paragraph.before(showBlogButtonDiv);

					// Remove the paragraph containing ##KATEGORIE##
					request.paragraph.remove();
				} catch (error) {
					console.error("Error fetching blog products:", error);
				}
			}
		}
	}
});
