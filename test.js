if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("ordering-process")) {
		document.addEventListener("DOMContentLoaded", function () {
			let giftPackagingDiv =
				'<div class="gift-packaging"><div class="gift-packaging-agree"><div class="gift-packaging-checkbox"><input type="checkbox" id="giftPackagingInput" name="giftPackagingInput" value="true"><label for="giftPackagingInput"><span>Přeji si dárkově zabilit doplňky NATIOS.</span><span>39,- Kč</span></label></div></div></div>';
			let giftPackagingModalDiv =
				'<div id="gift-packaging-modal" class="display-none"><div class="gift-packaging-modal-content"><div class="gift-packaging-modal-header"><h2>Dárkové balení doplňků NATIOS</h2><div class="gift-packaging-modal-close"></div></div><div class="gift-packaging-modal-body"><p>Do dárkové krabičky NATIOS lze vložit 2 produkty. Zvolte prosím, které 2 produkty chcete do krabičkyvložit.</p><div id="gift-packaging-options"></div><div id="gift-packaging-chosen-combinations"></div><div class="gift-packaging-confirm-wrapper"><div id="gift-packaging-confirm" class="btn"><span>Potvrdit balíčky</span></div></div></div></div></div>';

			$(giftPackagingDiv).insertAfter($(".discount-coupon"));
			$("body").append(giftPackagingModalDiv);
			let giftPackagingModal = $("#gift-packaging-modal");
			let giftOptionsContainer = $("#gift-packaging-options");
			let chosenCombinationsContainer = $("#gift-packaging-chosen-combinations");
			let packageNumber = 0;

			let natiosLocalStorage = JSON.parse(localStorage.getItem("natiosProducts"));
			console.log("natiosLocalStorage:");
			console.log(natiosLocalStorage);

			let natiosProducts = [];
			getAllNatiosGiftPackagingProducts();
			removeGiftPackagingFromLocalStorage();

			$("#giftPackagingInput").on("change", function () {
				if (this.checked) {
					giftPackagingModal.removeClass("display-none");
					addGiftPackagingProductOptions();
				} else {
					giftPackagingModal.addClass("display-none");
				}
			});

			$(".gift-packaging-modal-close").on("click", function () {
				giftPackagingModal.addClass("display-none");
				$("#giftPackagingInput").prop("checked", false);
				$("#gift-packaging-edit").remove();
			});

			$("#gift-packaging-confirm").on("click", function () {
				giftPackagingModal.addClass("display-none");
				if ($("#gift-packaging-edit").length === 0) {
					$(".gift-packaging-checkbox").append('<span id="gift-packaging-edit">Upravit</span>');
					$("#gift-packaging-edit").on("click", function () {
						giftPackagingModal.removeClass("display-none");
					});
				}
				saveGiftPackagingProducts();
				addGiftPackagingToCart();
			});

			function getAllNatiosGiftPackagingProducts() {
				$(".removeable").each(function () {
					let pName = $(this).find(".p-name .main-link").text();
					pName = pName.trim();
					pName = pName.replace(/\n/g, "");
					if (pName.includes("NATIOS"))
						if (pName.includes("kapsl") || pName.includes("tablet")) {
							let quantity = $(this).find(".quantity input").val();
							let image = $(this).find(".cart-p-image img").attr("src");

							//for each quantity create an object and push it to natiosProducts array
							for (let i = 0; i < quantity; i++) {
								natiosProducts.push({
									name: pName,
									image: image,
									selected: false,
									currentlySelected: false,
									packageNumber: 0,
								});
							}
						}
				});
				console.log(natiosProducts);
			}

			function addGiftPackagingProductOptions() {
				giftOptionsContainer.empty(); // Clear any existing options
				natiosProducts.forEach((product) => {
					if (!product.selected) {
						const productDiv = `
                <div class="gift-product-option">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						giftOptionsContainer.append(productDiv);
					}
					if (product.selected) {
						const productDiv = `
                <div class="gift-product-option display-none">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						giftOptionsContainer.append(productDiv);
					}
				});

				//for each gift-product-option add click event that on click or touch will toggle class selected
				$(".gift-product-option").on("click", function () {
					$(this).toggleClass("selected");

					let order = $(this).index();
					natiosProducts[order].currentlySelected = !natiosProducts[order].currentlySelected;

					console.log("Order: " + order);
					console.log("natiosProducts:");
					console.log(natiosProducts);

					if (natiosProducts.filter((product) => product.currentlySelected).length == 2) {
						packageNumber += 1;
						natiosProducts
							.filter((product) => product.currentlySelected)
							.forEach((product) => {
								product.selected = true;
								product.packageNumber = packageNumber;
							});

						addSelectedOptionsToChosenCombinations();

						$(".gift-product-option").removeClass("selected");
						natiosProducts.forEach((product) => {
							product.currentlySelected = false;
						});

						addGiftPackagingProductOptions();
					}
				});
			}

			function addSelectedOptionsToChosenCombinations() {
				chosenCombinationsContainer.empty(); // Clear any existing options

				natiosProducts.forEach((product) => {
					if (product.selected) {
						let currentPackageNumber = product.packageNumber;
						//create a div with packageNumberDiv value and class gift-package-combination
						//if packegeNumberDiv with currentPackageNumber does not exist create it
						if ($(`.gift-package-combination[currentPackageNumber="${currentPackageNumber}"]`).length == 0) {
							let packageNumberDiv = `<div class="gift-package-combination" currentPackageNumber="${currentPackageNumber}"><div class="remove-combination"></div></div>`;
							chosenCombinationsContainer.append(packageNumberDiv);
						}

						const productDiv = `
                <div class="gift-product-combination">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						$(`.gift-package-combination[currentPackageNumber="${currentPackageNumber}"]`).append(productDiv);
					}
				});

				$(".remove-combination").on("click", function () {
					let currentPackageNumber = $(this).parent().attr("currentPackageNumber");
					natiosProducts.forEach((product) => {
						if (product.packageNumber == currentPackageNumber) {
							product.selected = false;
							product.packageNumber = 0;
						}
					});
					addSelectedOptionsToChosenCombinations();
					addGiftPackagingProductOptions();
				});
			}

			function saveGiftPackagingProducts() {
				//save natiosProducts to localStorage
				localStorage.setItem("natiosProducts", JSON.stringify(natiosProducts));

				natiosLocalStorage = JSON.parse(localStorage.getItem("natiosProducts"));
				console.log("natiosLocalStorage:");
				console.log(natiosLocalStorage);
			}

			function removeGiftPackagingFromLocalStorage() {
				if (natiosProducts === natiosLocalStorage) {
					return;
				} else {
					localStorage.removeItem("natiosProducts");
					console.log("natiosProducts removed from localStorage");
				}
			}

			function addGiftPackagingToCart() {
				let numberOfPackages = 0;
				natiosProducts.forEach((product) => {
					if (product.selected) {
						numberOfPackages += 1;
					}
				});
				numberOfPackages = numberOfPackages / 2;
				shoptet.cartShared.addToCart({ productCode: "NATDK-1", amount: numberOfPackages });
			}
		});
	}
}
