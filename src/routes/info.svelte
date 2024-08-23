<script lang="ts">
	import { selectedDivision, selectedYear } from '$lib/stores';
	import YearSelect from './year-select.svelte';
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-4">
	<div class="card pointer-events-auto grid gap-y-2">
		{#if $selectedDivision}
			<p>Selected constituency: {$selectedDivision}</p>
		{:else}
			<p>Select a constituency to continue</p>
		{/if}

		<YearSelect />
	</div>
</div>
