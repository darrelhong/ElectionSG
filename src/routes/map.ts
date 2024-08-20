import maplibregl from 'maplibre-gl';
import { positronMapStyle, datavizMapStyle } from '$lib/map-style';

export function initMap() {
	return new maplibregl.Map({
		container: 'map',
		style: datavizMapStyle, // positronMapStyle
		center: [103.809, 1.319],
		zoom: 10
	});
}

export function addBoundarySource(map: maplibregl.Map) {
	map.addSource('boundary', {
		type: 'geojson',
		data: '/boundaries/2020.geojson',
		// use properties.Name as the feature id
		promoteId: 'Name'
	});
}

export function addBoundaryFill(map: maplibregl.Map) {
	map.addLayer({
		id: 'boundary-fill',
		type: 'fill',
		source: 'boundary',
		paint: {
			'fill-color': '#088',
			// set opacity based on feature state hover
			'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5]
		}
	});
}

export function addBoundaryBorder(map: maplibregl.Map) {
	map.addLayer({
		id: 'boundary-border',
		type: 'line',
		source: 'boundary',
		layout: {},
		paint: {
			'line-color': '#088',
			'line-width': 1,
			'line-opacity': 0.8
		}
	});
}

export function addHoverFeatureState(map: maplibregl.Map) {
	let hoveredDivisionName = '';

	map.on('mousemove', 'boundary-fill', (e) => {
		if (e?.features?.length && e.features.length > 0) {
			if (hoveredDivisionName) {
				map.setFeatureState({ source: 'boundary', id: hoveredDivisionName }, { hover: false });
			}
			hoveredDivisionName = e.features[0].properties.Name;
			map.setFeatureState({ source: 'boundary', id: hoveredDivisionName }, { hover: true });
		}
	});

	map.on('mouseleave', 'boundary-fill', () => {
		if (hoveredDivisionName) {
			map.setFeatureState({ source: 'boundary', id: hoveredDivisionName }, { hover: false });
		}
		hoveredDivisionName = '';
	});
}

export function addDivisionLabelOnHover(map: maplibregl.Map) {
	map.addSource('division-label', {
		type: 'geojson',
		data: '/boundaries/2020-labels.geojson'
	});

	map.addLayer({
		id: 'division-label-layer',
		type: 'symbol',
		source: 'division-label',
		layout: {
			'text-field': ['get', 'Name'],
			'text-font': ['Metropolis Semi Bold'],
			'text-size': 14,
			// prevents label from fading in
			'text-allow-overlap': true,
			visibility: 'none'
		},
		paint: {
			'text-color': '#1f2937',
			'text-halo-color': '#e5e7eb',
			'text-halo-width': 1
		}
	});

	map.on('mousemove', 'boundary-fill', (e) => {
		if (e?.features?.length && e.features.length > 0 && e.features[0].id) {
			const divisionId = e.features[0].id;
			map.setFilter('division-label-layer', ['==', 'Name', divisionId]);
			map.setLayoutProperty('division-label-layer', 'visibility', 'visible');
		}
	});

	map.on('mouseleave', 'boundary-fill', () => {
		map.setLayoutProperty('division-label-layer', 'visibility', 'none');
	});
}
