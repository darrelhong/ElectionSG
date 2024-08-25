<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { selectedDivision, selectedYearOption } from '$lib/stores';
	import results2020 from '$lib/data/2020-results.json';
	import { Results } from '$lib/types/results';
	import { parse } from 'svelte/compiler';

	const parsedResults2020 = Results.parse(results2020);
	$: divisionResults = $selectedDivision && parsedResults2020[$selectedDivision];
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-4">
	<div class="card pointer-events-auto grid gap-y-2">
		{#if divisionResults}
			<h2 class="text-lg font-semibold">
				{$selectedDivision}
				{divisionResults.type}
			</h2>

			{#each divisionResults.parties as party}
				<div class="rounded-md border p-4">
					<p><span class="font-medium">Party:</span> {party.party}</p>

					<p class="inline-block">
						<span class="font-medium">Candidates:</span>
						<span>
							{#each party.candidates as candidate, i}
								{candidate}{i !== party.candidates.length - 1 ? ' | ' : ''}
							{/each}
						</span>
					</p>

					<p>
						<span class="font-medium">Votes:</span>
						<span>{party.vote_count.toLocaleString('en-SG')}</span>
						<span>({(party.vote_percentage * 100).toFixed(2)}%)</span>
					</p>
				</div>
			{/each}
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
