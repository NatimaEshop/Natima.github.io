if (document.body.classList.contains("admin-logged")) {
	$("#productsAlternative").insertAfter(".p-detail-inner .product-top .social-buttons-wrapper");

	$("#productsAlternative .p .image img").each(function () {
		var $this = $(this);
		var dataSrc = $this.attr("data-src");
		$this.attr("src", dataSrc);
	});

	$("#productsAlternative .product").each(function () {
		var $this = $(this);
		var href = $this.find("a").first().attr("href");
		var classes = $this.attr("class");

		var newAnchor = $("<a>").attr("href", href).addClass(classes).html($this.html());
		$this.replaceWith(newAnchor);
	});

	if ($("#productsAlternative .product").length > 4) {
		$("#productsAlternative").append('<div id="show-more-variants">Zobrazit všechny varianty</div>');

		$("#show-more-variants").click(function () {
			$("#productsAlternative").toggleClass("show-all");
		});
	}
}
