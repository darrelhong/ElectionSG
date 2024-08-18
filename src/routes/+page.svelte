<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';
	import { positronMapStyle, datavizMapStyle } from '$lib/map-style';

	onMount(() => {
		const map = new maplibregl.Map({
			container: 'map',
			style: datavizMapStyle, // positronMapStyle
			center: [103.809, 1.319],
			zoom: 10
		});

		map.fitBounds([103.6, 1.24, 104.034, 1.469]);
	});
</script>

<div id="map" class="h-screen"></div>
