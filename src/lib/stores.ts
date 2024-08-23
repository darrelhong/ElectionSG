import { derived, writable } from 'svelte/store';

export const selectedDivision = writable<string | null>(null);

export const selectedYearOption = writable({
	value: '2020',
	label: '2020'
});

export const selectedYear = derived(
	selectedYearOption,
	($selectedYearOption) => $selectedYearOption.value
);
