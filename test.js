if (document.body.classList.contains("admin-logged")) {
	$("#productsAlternative").insertAfter(".product-top .social-buttons-wrapper");

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
}
