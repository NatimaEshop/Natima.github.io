document.addEventListener("DOMContentLoaded", function () {
	// Function to react when the class changes to "action"
	function handleActionClassChange(event) {
		if (event.target.classList.contains("dklab-favourites")) {
			console.log('Element with class "action" was modified.');
			console.log('Element with class "action" was modified.');
			console.log('Element with class "action" was modified.');
			console.log('Element with class "action" was modified.');
			console.log('Element with class "action" was modified.');
			console.log('Element with class "action" was modified.');
		}
	}

	// Set up a MutationObserver to watch for changes in the DOM
	const observer = new MutationObserver(function (mutationsList) {
		for (let mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "class") {
				handleActionClassChange(mutation);
			}
		}
	});

	// Start observing the document body and its subtree
	observer.observe(document.body, { attributes: true, subtree: true });
});
