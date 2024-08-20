<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import {
		addBoundaryBorder,
		addBoundaryFill,
		addBoundarySource,
		addDivisionLabelOnHover,
		addHoverFeatureState,
		initMap
	} from './map';

	let map: maplibregl.Map;

	onMount(() => {
		map = initMap();

		map.fitBounds([103.6, 1.24, 104.034, 1.469]);

		map.on('load', () => {
			addBoundarySource(map);

			addBoundaryFill(map);

			addBoundaryBorder(map);

			addHoverFeatureState(map);

			addDivisionLabelOnHover(map);
		});
	});
</script>

<div id="map" class="h-screen"></div>
