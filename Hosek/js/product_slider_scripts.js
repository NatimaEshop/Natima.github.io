let teste = document.getElementById("products-1");

teste.addEventListener("mousedown", mouseDown);

teste.addEventListener("mouseup", function () {
	console.log("MouseUp");
	teste.removeEventListener("mousemove", function () {});
});

function mouseDown() {
	teste.addEventListener("mousemove", mouseMove);
	document.addEventListener("mouseup", mouseUp);
}

function mouseMove() {
	console.log("mousemove");
}

function mouseUp() {
	console.log("mouse UP");
	teste.removeEventListener("mousemove", mouseMove);
	document.removeEventListener("mouseup", mouseUp);
}
