function createLabelsSheetAndFormulas() {
	const excludedSheets = ["Volby", "Šablona", "Šablona zaloha"];
	const ss = SpreadsheetApp.getActiveSpreadsheet();

	// Remove the existing "LABELS" sheet if it exists
	const existingLabelsSheet = ss.getSheetByName("LABELS");
	if (existingLabelsSheet) {
		ss.deleteSheet(existingLabelsSheet);
	}

	// Create a new "LABELS" sheet at the beginning
	const labelsSheet = ss.insertSheet("LABELS", 0);

	// Get all sheet names excluding the excluded ones
	const sheetNames = ss
		.getSheets()
		.map((sheet) => sheet.getName())
		.filter((name) => !excludedSheets.includes(name) && name !== "LABELS");

	// Write the sheet names as text into the first column of the "LABELS" sheet
	sheetNames.forEach((name, index) => {
		labelsSheet.getRange(index + 1, 1).setValue(`'${name}`); // Add a single quote to ensure it's treated as text
	});

	// Define the cell references for the INDIRECT formulas
	const aColumns = [200, 202, 204, 206, 208, 210, 212];
	const gColumns = [200, 202, 204, 206, 208, 210, 212];

	// Populate formulas in columns B to O
	for (let row = 1; row <= 500; row++) {
		const sheetRef = `A${row}`;
		// Columns B to H (A200, A202, ..., A212)
		aColumns.forEach((colRef, index) => {
			const col = index + 2; // B is column 2
			const formula = `=INDIRECT("'" & ${sheetRef} & "'!A${colRef}")`;
			labelsSheet.getRange(row, col).setFormula(formula);
		});

		// Columns I to O (H200, H202, ..., H212)
		gColumns.forEach((colRef, index) => {
			const col = index + 9; // I is column 9
			const formula = `=INDIRECT("'" & ${sheetRef} & "'!G${colRef}")`;
			labelsSheet.getRange(row, col).setFormula(formula);
		});
	}
}
