if (document.body.classList.contains("admin-logged")) {
	document.addEventListener("DOMContentLoaded", function (event) {
		$("#productsAlternative .products .product:has(.p-tools > a)").each(function () {
			let $this = $(this);
			$this.remove();
		});

		if ($("#productsAlternative .product").length > 0) {
			$("#productsAlternative .product").each(function () {
				let $this = $(this);
				let href = $this.find("a").first().attr("href");
				let classes = $this.attr("class");

				let newAnchor = $("<a>").attr("href", href).addClass(classes).html($this.html());
				$this.replaceWith(newAnchor);
			});

			$("#productsAlternative").insertAfter(".p-detail-inner .product-top .social-buttons-wrapper");
			$("#productsAlternative .p .image img").each(function () {
				let $this = $(this);
				let dataSrc = $this.attr("data-src");
				$this.attr("src", dataSrc);
			});
		}

		if ($("#productsAlternative .product").length > 2) {
			if (document.body.classList.contains("cs")) {
				$("#productsAlternative").append('<div id="show-more-variants">Všechny varianty</div>');
			}
			if (document.body.classList.contains("sk")) {
				$("#productsAlternative").append('<div id="show-more-variants">Všetky varianty</div>');
			}

			$("#show-more-variants").click(function () {
				$("#productsAlternative").toggleClass("show-all");
			});
		}
	});
}
