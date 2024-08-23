<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { selectedDivision, selectedYearOption } from '$lib/stores';
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-4">
	<div class="card pointer-events-auto grid gap-y-2">
		{#if $selectedDivision}
			<p>Selected constituency: {$selectedDivision}</p>
		{:else}
			<p>Select a constituency to continue</p>
		{/if}

		<Select
			createSelectOptions={{ selected: selectedYearOption }}
			items={['2015', '2020']}
			placeholder="Select year"
		/>
	</div>
</div>
