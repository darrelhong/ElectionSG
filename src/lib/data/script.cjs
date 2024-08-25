const fs = require('fs');
const path = require('path');

// Function to convert a string to title case
function toTitleCase(str) {
	return str
		.replace(/\w\S*/g, (txt) => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		})
		.replace(/-\w/g, (txt) => {
			return '-' + txt.charAt(1).toUpperCase();
		});
}

// Path to the GeoJSON file
const filePath = path.join(__dirname, '2020.geojson');

// Read the GeoJSON file
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	// Parse the JSON data
	let geojson = JSON.parse(data);

	// Iterate through each feature and update the Name property
	geojson.features.forEach((feature) => {
		if (feature.properties && feature.properties.Name) {
			feature.properties.Name = toTitleCase(feature.properties.Name);
		}
	});

	// Convert the modified object back to JSON
	const updatedData = JSON.stringify(geojson, null, 2);

	// Write the updated JSON back to the file
	fs.writeFile(filePath, updatedData, 'utf8', (err) => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.log('File successfully updated.');
	});
});
