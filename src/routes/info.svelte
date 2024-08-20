<script lang="ts">
	import { selectedDivision } from '$lib/stores';
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-4">
	<div class="card pointer-events-auto">
		{#if $selectedDivision}
			<p>Selected constituency: {$selectedDivision}</p>
		{:else}
			<p>Select a constituency to continue</p>
		{/if}
	</div>
</div>
