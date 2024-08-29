if (document.querySelector("body.in-krok-1")) {
	if (document.body.classList.contains("cs")) {
		if ($('option[value="151"][selected="selected"]').length) {
			$("body").addClass("hiddenCartOptions");
			let appendElement = $(
				"<div class='also-deliver-country'><p>Doručujeme také na Slovensko. Je ovšem potřeba nakoupit na natima.sk. <a href='https://www.natima.sk'>Přejít na natima.sk</a></p></div>"
			);
			appendElement.insertAfter("#select-country-payment");
		}
	}
}
