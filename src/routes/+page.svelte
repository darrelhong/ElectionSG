<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onMount } from 'svelte';

	onMount(() => {
		const map = new maplibregl.Map({
			container: 'map',
			style: 'https://demotiles.maplibre.org/style.json',
			center: [103.809, 1.319],
			zoom: 10
		});
        
        map.fitBounds([103.600, 1.240, 104.034, 1.469]);
	});
</script>

<div id="map" class="h-screen"></div>
