import geojson2020 from '$lib/data/2020-boundaries.json';
import geojson2015 from '$lib/data/2015-boundaries.json';
import geojson2020labels from '$lib/data/2020-labels.json';
import geojson2015labels from '$lib/data/2015-labels.json';

export function getBoundaryJson(year: string) {
	switch (year) {
		case '2020':
			return geojson2020 as GeoJSON.GeoJSON;
		case '2015':
			return geojson2015 as GeoJSON.GeoJSON;
		default:
			return geojson2020 as GeoJSON.GeoJSON;
	}
}

export function getLabelsJson(year: string) {
	switch (year) {
		case '2020':
			return geojson2020labels as GeoJSON.GeoJSON;
		case '2015':
			return geojson2015labels as GeoJSON.GeoJSON;
		default:
			return geojson2020labels as GeoJSON.GeoJSON;
	}
}
