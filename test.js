/*document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("ordering-process")) {
		slevovyKuponDarek();
	}
});

function slevovyKuponDarek() {
	let discountForm = $(".discount-coupon form");
	let discountInput = $(".discount-coupon input");
	let kodKuponu = "test01";
	let priceId = 12270;
	let itemId = "";
	let productsInCart;
	let kuponSubmited = false;

	$(document).ready(function() {
		// Select the <time> element
		var timeElement = $('time[datetime]');

		// Extract the date from the datetime attribute
		var dateStr = timeElement.attr('datetime');

		// Parse the date
		var date = new Date(dateStr);
		var comparisonDate = new Date('2024-07-31');

		// Check if the date is before 31.07.2024
		if (date < comparisonDate) {
			console.log("The date is before 31.07.2024");
		} else {
			console.log("The date is on or after 31.07.2024");
		}

		//event listener to sumbited form
		$(document).on("submit", ".discount-coupon form", function (e) {
			if (discountInput.val() !== kodKuponu) {
				return;
			}
			// Proti zacyklení
			if (kuponSubmited) {
				return;
			}

			kuponSubmited = true;

			document.addEventListener(
				"ShoptetDOMCartContentLoaded",
				function () {
					// Pridat produkt do kosiku
					shoptet.cartShared.addToCart({ priceId: priceId });
					document.addEventListener(
						"ShoptetDOMCartContentLoaded",
						function () {
							//get products data
							productsInCart = getShoptetDataLayer("cartInfo").cartItems;

							productsInCart.forEach((product) => {
								if (product.priceId === priceId) {
									itemId = product.itemId;
								}
							});
							//apply code again
							discountForm = $(".discount-coupon form");
							discountInput = $(".discount-coupon input");
							discountInput.val(kodKuponu);
							discountForm.submit();

							document.addEventListener(
								"ShoptetDOMCartContentLoaded",
								function () {
									//PLATNY
									if ($(".applied-coupon").length > 0) {
										validCoupon();
									}
									//NEPLATNY
									else {
										invalidCoupon();
									}
								},
								{ once: true }
							);
						},
						{ once: true }
					);
				},
				{ once: true }
			);
		});
	});

	function invalidCoupon() {
		if ($(".msg").hasClass("msg-error")) {
			console.log("Kupon je neplatný");

			kuponSubmited = false;
			shoptet.cartShared.removeFromCart({ itemId: itemId });

			console.log("tady bude nějaká hláška");
			return;
		}
	}

	function validCoupon() {
		console.log("Kupon je platný");

		document.removeEventListener("ShoptetDOMCartContentLoaded", invalidCoupon);

		let productElement = $("table.cart-table tr[data-micro-sku='" + priceId + "']");
		productElement.find("td.p-availability, td.p-quantity").remove();

		let productRemoveForm = productElement.find("td.p-total form");
		productRemoveForm.css("display", "none");

		let discountRemoveButton = $(".discount-coupon form");
		discountRemoveButton.on("click touch", function (e) {
			shoptet.cartShared.removeFromCart({ itemId: itemId });
			kuponSubmited = false;
		});
	}
}
*/

document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-blog") && document.body.classList.contains("type-post")) {
		oldBlog();
		function oldBlog() {
			let timeElement = $(".news-item-detail time[datetime]");
			let dateStr = timeElement.attr("datetime");
			let [day, month, year] = dateStr.split(".").map(Number);
			let date = new Date(year, month - 1, day);
			let comparisonDate = new Date(2024, 6, 31);

			if (date < comparisonDate) {
				$("body").addClass("old-blog");
			} else {
				blogAutor();
				fetchAndAppendRelatedBlogs();
				fetchAndAppendBlogProducts();
				fetchAndAppendBlogCategory();
			}
		}

		function blogAutor() {
			$("#content p").each(function () {
				if (/##AUTOR##KATEŘINA TRÁNOVÁ/i.test($(this).text())) {
					$(this).replaceWith(
						'<div id="blog-author"><div class="author-image"><img src="https://www.natima.cz/user/documents/upload/Blog/autori/KaterinaTranova.webp" alt="Kateřina Tránová" width="500" height="500"></div><div class="author-text"><p class="author-label">Autor</p><p class="author-name">Kateřina Tránová</p><div class="expandale author-text"><div class="expanding"><p>Zajímám se o zdravý životní styl, sport, kosmetiku a zdravou stravu. Mým cílem je inspirovat ostatní, aby pečovali o své tělo i mysl a stali se tou nejlepší verzí sebe samých. Pravidelně se věnuji různým sportovním aktivitám a hledám nové cesty, jak optimalizovat svou fyzickou kondici i duševní pohodu.</p><p>Zdravá strava je pro mě klíčovým prvkem, který podporuje mé zdraví a energii. Kromě sportu a výživy mě baví objevovat nové kosmetické trendy a produkty, které podporují přirozenou krásu a zdraví. Ve volném čase si ráda přečtu dobrou knihu, která mi poskytne nejen odpočinek, ale i nové poznatky. Na blogu se s vámi podělím o své zkušenosti, tipy a rady, jak žít zdravěji a spokojeněji.</p></div></div></div></div>'
					);
				}
			});
		}

		async function fetchAndAppendRelatedBlogs() {
			let blogURLs = [];

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##BLOG##/i.test(text)) {
					let urlMatch = text.match(/https?:\/\/[^\s]+/);
					if (urlMatch) {
						blogURLs.push(urlMatch[0]);
					}
					$(this).remove();
					$("#content .next-prev").remove();
				}
			});

			if (blogURLs.length > 0) {
				let relatedBlogsDiv = $("<div>", { class: "blog-fetched-related" });
				let blogURL = "";
				let showBlogText = "";
				let showBlogHeadingText = "";

				if (document.body.classList.contains("cs")) {
					blogURL = "/blog/";
					showBlogText = "Zobrazit všechny články";
					showBlogHeadingText = "Mohlo by vás také zajímat";
				}
				if (document.body.classList.contains("sk")) {
					blogURL = "/blog/";
					showBlogText = "Zobraziť všetky články";
					showBlogHeadingText = "Mohlo by vás tiež zaujímať";
				}
				let showBlogButton = $("<div>", { class: "show-blog-btn" }).append(
					$("<a>", { href: blogURL }).text(showBlogText)
				);
				let showBlogHeading = $("<h3>", { class: "show-blog-heading" }).text(showBlogHeadingText);

				for (let url of blogURLs) {
					try {
						const response = await fetch(url);
						const text = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(text, "text/html");
						const metaImage = doc.querySelector('meta[property="og:image"]').getAttribute("content");
						const metaSection = doc.querySelector('meta[property="article:section"]').getAttribute("content");
						let metaDescription = doc.querySelector('meta[itemprop="description"]').getAttribute("content");

						if (metaImage && metaSection && metaDescription) {
							// Create an anchor element
							let anchorElement = $("<a>", { href: url, target: "_blank" });

							// Create an img element
							let blogImage = $("<img>", {
								src: metaImage,
								alt: "Blog Image",
							});

							// Create a paragraph element for the meta section content
							let blogName = $("<h4>").text(metaSection);

							// Create a paragraph element for the meta description content
							metaDescription = metaDescription.replace(/&nbsp;/g, " ");
							let blogDescdription = $("<p>").text(metaDescription);

							// Append the img, section paragraph, and description paragraph elements to the anchor element
							anchorElement.append(blogImage);
							anchorElement.append(blogName);
							anchorElement.append(blogDescdription);

							// Append the anchor element to the relatedBlogsDiv
							relatedBlogsDiv.append(anchorElement);
						}
					} catch (error) {
						console.error("Error fetching related blog data:", error);
					}
				}

				// Append the relatedBlogsDiv to the body
				$(".content-wrapper-in").append(showBlogHeading);
				$(".content-wrapper-in").append(relatedBlogsDiv);
				$(".content-wrapper-in").append(showBlogButton);
				$(".content-wrapper-in").append($(".comments"));
				$(".content-wrapper-in").append($(".share"));
			}
		}

		async function fetchAndAppendBlogProducts() {
			let productURLs = [];
			let firstProductParagraph = null;
			let maxNumberOfProducts = 4;

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##PRODUKT##/i.test(text)) {
					if (!firstProductParagraph) {
						firstProductParagraph = $(this);
					}
					let urlMatch = text.match(/https?:\/\/[^\s]+/);
					if (urlMatch.length < maxNumberOfProducts) {
						productURLs.push(urlMatch[0]);
					}
				}
			});

			if (productURLs.length > 0 && firstProductParagraph) {
				let blogProductsDiv = $("<div>", { class: "blog-fetched-products" });

				for (let url of productURLs) {
					try {
						const response = await fetch(url);
						const text = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(text, "text/html");
						const metaImage = doc.querySelector('meta[property="og:image"]');
						const metaName = doc.querySelector('meta[itemprop="name"]');

						if (metaImage && metaName) {
							// Create an anchor element
							let anchorElement = $("<a>", { href: url, target: "_blank" });

							// Create an img element
							let blogImage = $("<img>", {
								src: metaImage.getAttribute("content"),
								alt: "Product Image",
							});

							// Create a paragraph element for the meta name content
							let productName = $("<p>").text(metaName.getAttribute("content"));

							// Append the img element and the paragraph element to the anchor element
							anchorElement.append(blogImage);
							anchorElement.append(productName);

							// Append the anchor element to the blogProductsDiv
							blogProductsDiv.append(anchorElement);
						}
					} catch (error) {
						console.error("Error fetching product data:", error);
					}
				}

				// Insert the blogProductsDiv before the first found paragraph
				firstProductParagraph.before(blogProductsDiv);

				// Remove the paragraphs containing ##PRODUKT##
				$("p").each(function () {
					let text = $(this).text();
					if (/##PRODUKT##/i.test(text)) {
						$(this).remove();
					}
				});
			}
		}

		/*
		async function fetchAndAppendBlogCategory() {
			let productRequests = [];

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##KATEGORIE##/i.test(text)) {
					let match = text.match(/##KATEGORIE##(\d+)\s+(https?:\/\/[^\s]+)/);
					if (match) {
						let numberOfProducts = parseInt(match[1], 10);
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
							blogProductsDiv.append(products[i].cloneNode(true));
						}

						// Insert the blogProductsDiv before the paragraph containing ##KATEGORIE##
						request.paragraph.before(blogProductsDiv);

						// Remove the paragraph containing ##KATEGORIE##
						request.paragraph.remove();
					} catch (error) {
						console.error("Error fetching blog products:", error);
					}
				}
			}
		}*/
		async function fetchAndAppendBlogCategory() {
			let productRequests = [];
			let maxNumberOfProducts = 4;

			$("#content p").each(function () {
				let text = $(this).text();
				if (/##KATEGORIE##/i.test(text)) {
					let match = text.match(/##KATEGORIE##(\d+)\s+(https?:\/\/[^\s]+)/);
					if (match) {
						let numberOfProducts = parseInt(match[1], 10);
						let url = match[2];
						if (productRequests.length < maxNumberOfProducts) {
							productRequests.push({ numberOfProducts, url, paragraph: $(this) });
						}
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
							showCategoryText = "Zobrazit vše;";
						}
						if (document.body.classList.contains("sk")) {
							showCategoryText = "Zobraziť všetko;";
						}

						// Create the show-blog-btn div with an anchor inside
						let showBlogButtonDiv = $("<div>", { class: "show-blog-btn" }).append(
							$("<a>", { href: request.url }).text(showCategoryText)
						);

						// Insert the blogProductsDiv before the paragraph containing ##KATEGORIE##
						request.paragraph.before(blogProductsDiv);

						// Insert the show-blog-btn div before the paragraph containing ##KATEGORIE##
						request.paragraph.before(showBlogButtonDiv);

						// Remove the paragraph containing ##KATEGORIE##
						request.paragraph.remove();
					} catch (error) {
						console.error("Error fetching blog products:", error);
					}
				}
			}
		}
	}
});
