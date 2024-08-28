import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import { datavizMapStyle } from '$lib/map-style';
import { selectedDivision, selectedYear } from '$lib/stores';

import { getParsedResults } from '$lib/parsed';
import { get } from 'svelte/store';
import { getBoundaryJson, getLabelsJson } from '$lib/boundaries';

export function initMap() {
	return new maplibregl.Map({
		container: 'map',
		style: datavizMapStyle, // positronMapStyle
		center: [103.809, 1.319],
		zoom: 10,
		attributionControl: false,
		maxBounds: [
			[103.52, 0.93],
			[104.15, 1.73]
		]
	});
}

const BOUNDARY_SOURCE = 'boundary';
const DIVISION_FILL_LAYER = 'division-fill-layer';
const DIVISION_BORDER_LAYER = 'division-border-layer';
const DIVISION_LABEL_SOURCE = 'division-label-source';
const DIVISION_LABEL_LAYER = 'division-label-layer';
const DIVISION_LABEL_DEFAULT_LAYER = 'division-label-default-layer';
const SELECTED_DIVISION_FILL_LAYER = 'selected-division-fill-layer';
const SELECTED_DIVISION_LABEL_LAYER = 'selected-division-label-layer';

export function addBoundarySource(map: maplibregl.Map) {
	map.addSource(BOUNDARY_SOURCE, {
		type: 'geojson',
		data: getBoundaryJson(get(selectedYear)),
		// use properties.Name as the feature id
		promoteId: 'Name'
	});
}

export function addDivisionFill(map: maplibregl.Map) {
	map.addLayer({
		id: DIVISION_FILL_LAYER,
		type: 'fill',
		source: BOUNDARY_SOURCE,
		paint: {
			'fill-color': '#000',
			// set opacity based on feature state hover
			'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.3, 0]
		}
	});
}

export function addDivisionBorder(map: maplibregl.Map) {
	map.addLayer({
		id: DIVISION_BORDER_LAYER,
		type: 'line',
		source: BOUNDARY_SOURCE,
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

	map.on('mousemove', DIVISION_FILL_LAYER, (e) => {
		if (e?.features?.length && e.features.length > 0) {
			if (hoveredDivisionName) {
				map.setFeatureState({ source: BOUNDARY_SOURCE, id: hoveredDivisionName }, { hover: false });
			}
			hoveredDivisionName = e.features[0].properties.Name;
			map.setFeatureState({ source: BOUNDARY_SOURCE, id: hoveredDivisionName }, { hover: true });
		}
	});

	map.on('mouseleave', DIVISION_FILL_LAYER, () => {
		if (hoveredDivisionName) {
			map.setFeatureState({ source: BOUNDARY_SOURCE, id: hoveredDivisionName }, { hover: false });
		}
		hoveredDivisionName = '';
	});
}

const labelPaint = {
	'text-color': '#1f2937',
	'text-halo-color': '#e5e7eb',
	'text-halo-width': 1
};

export function addDivisionLabelOnHover(map: maplibregl.Map) {
	map.addSource(DIVISION_LABEL_SOURCE, {
		type: 'geojson',
		data: getLabelsJson(get(selectedYear))
	});

	map.addLayer({
		id: DIVISION_LABEL_DEFAULT_LAYER,
		type: 'symbol',
		source: DIVISION_LABEL_SOURCE,
		layout: {
			'text-field': ['get', 'Name'],
			'text-font': ['Metropolis Semi Bold'],
			'text-size': 14
		},
		paint: labelPaint
	});

	map.addLayer({
		id: DIVISION_LABEL_LAYER,
		type: 'symbol',
		source: DIVISION_LABEL_SOURCE,
		layout: {
			'text-field': ['get', 'Name'],
			'text-font': ['Metropolis Semi Bold'],
			'text-size': 14,
			// prevents label from fading in
			'text-allow-overlap': true,
			visibility: 'none'
		},
		paint: labelPaint
	});

	map.on('mousemove', DIVISION_FILL_LAYER, (e) => {
		if (e?.features?.length && e.features.length > 0 && e.features[0].id) {
			const divisionId = e.features[0].id;
			map.setFilter(DIVISION_LABEL_LAYER, ['==', 'Name', divisionId]);
			map.setLayoutProperty(DIVISION_LABEL_LAYER, 'visibility', 'visible');
			map.setLayoutProperty(DIVISION_LABEL_DEFAULT_LAYER, 'visibility', 'none');
		}
	});

	map.on('mouseleave', DIVISION_FILL_LAYER, () => {
		map.setLayoutProperty(DIVISION_LABEL_LAYER, 'visibility', 'none');
		map.setLayoutProperty(DIVISION_LABEL_DEFAULT_LAYER, 'visibility', 'visible');
	});
}

export function setSelectedDivisionOnClick(map: maplibregl.Map) {
	map.addLayer({
		id: SELECTED_DIVISION_LABEL_LAYER,
		type: 'symbol',
		source: DIVISION_LABEL_SOURCE,
		layout: {
			'text-field': ['get', 'Name'],
			'text-font': ['Metropolis Semi Bold'],
			'text-size': 14,
			'text-allow-overlap': true
		},
		paint: {
			'text-color': '#e5e7eb',
			'text-halo-color': '#1f2937',
			'text-halo-width': 1
		},
		filter: ['==', 'Name', '']
	});

	map.addLayer(
		{
			id: SELECTED_DIVISION_FILL_LAYER,
			type: 'fill',
			source: BOUNDARY_SOURCE,
			paint: {
				'fill-color': '#088',
				'fill-opacity': 0.4
			},
			filter: ['==', 'Name', '']
		},
		DIVISION_LABEL_DEFAULT_LAYER
	);

	map.on('click', DIVISION_FILL_LAYER, (e) => {
		e.preventDefault();
		if (!e?.features?.length) return;
		const feature = e.features[0];

		if (!feature.id) return;
		selectedDivision.set(feature.id.toString());

		map.setFilter(SELECTED_DIVISION_FILL_LAYER, ['==', 'Name', feature.id]);
		map.setFilter(SELECTED_DIVISION_LABEL_LAYER, ['==', 'Name', feature.id]);
	});

	map.on('click', (e) => {
		if (e._defaultPrevented) return;
		selectedDivision.set(null);
		map.setFilter(SELECTED_DIVISION_FILL_LAYER, ['==', 'Name', '']);
		map.setFilter(SELECTED_DIVISION_LABEL_LAYER, ['==', 'Name', '']);
	});
}

export function addResultFillLayer(map: maplibregl.Map) {
	mergeResultsWithFeatureState(map);

	map.addLayer(
		{
			id: 'result-fill-layer',
			type: 'fill',
			source: BOUNDARY_SOURCE,
			paint: {
				'fill-color': [
					'interpolate',
					['linear'],
					['feature-state', 'incumbentVotePercentage'],
					0,
					'#FF6600',
					0.5,
					'#ffffff',
					1,
					'#0099FF'
				],
				'fill-opacity': 0.6
			}
		},
		DIVISION_FILL_LAYER
	);
}

export function switchDataSourceOnChange(map: maplibregl.Map) {
	selectedYear.subscribe((year) => {
		const boundarySource = map.getSource(BOUNDARY_SOURCE) as GeoJSONSource;
		boundarySource.setData(getBoundaryJson(year));

		const labelSource = map.getSource(DIVISION_LABEL_SOURCE) as GeoJSONSource;
		labelSource.setData(getLabelsJson(year));

		mergeResultsWithFeatureState(map);
	});
}

export function mergeResultsWithFeatureState(map: maplibregl.Map) {
	const results = getParsedResults(get(selectedYear));
	Object.entries(results).forEach(([divisionName, results]) => {
		// PAP competes in all divisions
		const incumbentResult = results.parties.find((party) => party.party === 'PAP');

		map.setFeatureState(
			{
				source: BOUNDARY_SOURCE,
				id: divisionName
			},
			{
				incumbentVotePercentage: incumbentResult?.vote_percentage
			}
		);
	});
}
