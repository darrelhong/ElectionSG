<script lang="ts">
	import Select from '$lib/components/select.svelte';
	import { selectedDivision, selectedYearOption, selectedYear } from '$lib/stores';
	import { getParsedResults } from '$lib/parsed';
	import Button from '$lib/components/button.svelte';

	$: divisionResults = $selectedDivision && getParsedResults($selectedYear)[$selectedDivision];
</script>

<div class="pointer-events-none fixed inset-0 grid items-end p-4">
	<div class="card pointer-events-auto grid gap-y-2">
		{#if divisionResults}
			<div class="flex">
				<h2 class="me-auto text-lg font-semibold">
					{$selectedDivision}
					{divisionResults.type}
				</h2>

				<Button variant="ghost" class="!p-2" onclick={() => selectedDivision.set(null)}>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						></path></svg
					></Button
				>
			</div>

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
