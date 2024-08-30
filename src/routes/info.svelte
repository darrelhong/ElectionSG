<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { selectedDivision, selectedYearOption, selectedYear, years } from '$lib/stores';
	import { getParsedResults } from '$lib/parsed';
	import Button from '$lib/components/button.svelte';
	import LegendDialog from './legend-dialog.svelte';
	import CloseIcon from '$lib/icons/close-icon.svelte';

	$: divisionResults = $selectedDivision && getParsedResults($selectedYear)[$selectedDivision];
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-2">
	<div class="card pointer-events-auto grid gap-y-2">
		{#if divisionResults}
			<div class="flex">
				<h2 class="me-auto text-lg font-semibold">
					{$selectedDivision}
					{divisionResults.type}
				</h2>

				<Button variant="ghost" class="!p-2" onclick={() => selectedDivision.set(null)}>
					<CloseIcon /></Button
				>
			</div>

			<div class="grid max-h-[60dvh] gap-y-2 overflow-y-auto">
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
							{#if party.vote_percentage && party.vote_count}
								<span class="font-medium">Votes:</span>
								<span>{party.vote_count?.toLocaleString('en-SG')}</span>
								<span class="font-bold">({(party.vote_percentage * 100).toFixed(2)}%)</span>
							{:else}
								<span class="font-medium">Result:</span>
								<span>Uncontested Walkover</span>
							{/if}
						</p>
					</div>
				{/each}
			</div>
		{:else}
			<p>Select a constituency to view results</p>
		{/if}

		<div class="flex items-end gap-2">
			<Select
				createSelectOptions={{ selected: selectedYearOption }}
				items={Array.from(years).reverse()}
				placeholder="Select year"
			/>

			<LegendDialog />
		</div>
	</div>
</div>
