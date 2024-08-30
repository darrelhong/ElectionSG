import { derived, writable } from 'svelte/store';

export const selectedDivision = writable<string | null>(null);

export const years = ['2020', '2015', '2011', '2006'] as const;

export const selectedYearOption = writable<{
	value: (typeof years)[number];
	label: (typeof years)[number];
}>({
	value: '2020',
	label: '2020'
});

export const selectedYear = derived(
	selectedYearOption,
	($selectedYearOption) => $selectedYearOption.value
);
