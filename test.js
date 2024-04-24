if (document.body.classList.contains("admin-logged")) {
	document.addEventListener("DOMContentLoaded", function (event) {
		$("#productsAlternative .product").each(function () {
			var $this = $(this);
			var href = $this.find("a").first().attr("href");
			var classes = $this.attr("class");

			var newAnchor = $("<a>").attr("href", href).addClass(classes).html($this.html());
			$this.replaceWith(newAnchor);

			if ($this.find(".p-tools > a").length > 0) {
				newAnchor.remove();
			}
		});

		if ($("#productsAlternative .product").length > 0) {
			$("#productsAlternative").insertAfter(".p-detail-inner .product-top .social-buttons-wrapper");
			$("#productsAlternative .p .image img").each(function () {
				var $this = $(this);
				var dataSrc = $this.attr("data-src");
				$this.attr("src", dataSrc);
			});
		}

		if ($("#productsAlternative .product").length > 2) {
			if (document.body.classList.contains("cs")) {
				$("#productsAlternative").append('<div id="show-more-variants">Zobrazit všechny varianty</div>');
			}
			if (document.body.classList.contains("sk")) {
				$("#productsAlternative").append('<div id="show-more-variants">Zobraziť všetky varianty</div>');
			}

			$("#show-more-variants").click(function () {
				$("#productsAlternative").toggleClass("show-all");
			});
		}
	});
}
