function updateSpreadsheet() {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const sheets = spreadsheet.getSheets();

	// Skip the first sheet if more than one sheet remains
	const targetSheets = sheets.slice(1);

	// Step 1: Update specific formulas in B107 and H107
	targetSheets.forEach((sheet) => {
		sheet
			.getRange("B107")
			.setFormula('=IF(ISBLANK(A39);"";"<b>"&A39&"</b> " & SUBSTITUTE(TEXTJOIN(" "; TRUE; A102:A165); CHAR(10); ""))');
		sheet
			.getRange("H107")
			.setFormula('=IF(LEN(G39)=0;"";"<b>"&G39&"</b> " & SUBSTITUTE(TEXTJOIN(" "; TRUE; G102:G165); CHAR(10); ""))');
	});

	// Step 2: Remove specific cells by clearing content
	const cellsToRemove = ["C102", "D102", "C103", "D103", "I102", "I103", "J102", "J103"];
	targetSheets.forEach((sheet) => {
		cellsToRemove.forEach((cell) => sheet.getRange(cell).clear());
	});

	// Step 3: Update specific cells with values and apply bold formatting
	const valueUpdates = [
		{ cell: "A199", value: "UNIVERSAL", bold: true },
		{ cell: "G199", value: "UNIVERSAL", bold: true },
		{ cell: "A201", value: "Classic", bold: true },
		{ cell: "G201", value: "Classic", bold: true },
		{ cell: "A203", value: "Termo universal", bold: true },
		{ cell: "G203", value: "Termo universal", bold: true },
		{ cell: "A205", value: "Termo", bold: true },
		{ cell: "G205", value: "Termo", bold: true },
		{ cell: "A207", value: "Termo velká", bold: true },
		{ cell: "G207", value: "Termo velká", bold: true },
		{ cell: "A209", value: "Čaje nálepky", bold: true },
		{ cell: "G209", value: "Čaje nálepky", bold: true },
		{ cell: "A211", value: "A6 Nálepky", bold: true },
		{ cell: "G211", value: "A6 Nálepky", bold: true },
	];

	targetSheets.forEach((sheet) => {
		valueUpdates.forEach((update) => {
			const range = sheet.getRange(update.cell);
			range.setValue(update.value);
			if (update.bold) {
				range.setFontWeight("bold");
			}
		});
	});

	// Step 4: Update formulas for specific cells
	const formulaUpdates = [
		{ cell: "A200", formula: '=IF(ISBLANK(E2); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")' },
		{
			cell: "A202",
			formula: '=IF(AND(ISBLANK(E2); B2="Classic"); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{
			cell: "A204",
			formula:
				'=IF(AND(ISBLANK(E2); OR(B2="Termo"; B2="Termo velká")); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{
			cell: "A206",
			formula: '=IF(AND(ISBLANK(E2); B2="Termo"); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{
			cell: "A208",
			formula: '=IF(AND(ISBLANK(E2); B2="Termo velká"); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{
			cell: "A210",
			formula: '=IF(AND(ISBLANK(E2); B2="Čaje nálepky"); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{
			cell: "A212",
			formula: '=IF(AND(ISBLANK(E2); B2="A6 Nálepky"); SUBSTITUTE(TEXTJOIN(""; TRUE; B102:B123); CHAR(10); " "); "")',
		},
		{ cell: "G200", formula: '=SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ")' },
		{ cell: "G202", formula: '=IF(B2="Classic"; SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")' },
		{
			cell: "G204",
			formula: '=IF(OR(B2="Termo"; B2="Termo velká"); SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")',
		},
		{ cell: "G206", formula: '=IF(B2="Termo"; SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")' },
		{ cell: "G208", formula: '=IF(B2="Termo velká"; SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")' },
		{ cell: "G210", formula: '=IF(B2="Čaje nálepky"; SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")' },
		{ cell: "G212", formula: '=IF(B2="A6 Nálepky"; SUBSTITUTE(TEXTJOIN(""; TRUE; H102:H123); CHAR(10); " ");"")' },
	];

	targetSheets.forEach((sheet) => {
		formulaUpdates.forEach((update) => {
			sheet.getRange(update.cell).setFormula(update.formula);
		});
	});
}
