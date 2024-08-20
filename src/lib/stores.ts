import { writable } from 'svelte/store';

export const selectedDivision = writable<string | null>(null);
