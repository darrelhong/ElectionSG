<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import {
		addDivisionBorder,
		addDivisionFill,
		addBoundarySource,
		addDivisionLabelOnHover,
		addHoverFeatureState,
		initMap,
		setSelectedDivisionOnClick,
		addResultFillLayer
	} from './map';
	import Info from './info.svelte';

	let map: maplibregl.Map;

	onMount(() => {
		map = initMap();

		map.fitBounds([103.6, 1.24, 104.034, 1.469]);

		map.on('load', () => {
			addBoundarySource(map);

			addDivisionFill(map);

			addDivisionBorder(map);

			addHoverFeatureState(map);

			addDivisionLabelOnHover(map);

			setSelectedDivisionOnClick(map);

			addResultFillLayer(map);
		});
	});
</script>

<div id="map" class="h-dvh"></div>
<Info />
