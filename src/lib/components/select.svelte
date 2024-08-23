<script lang="ts">
	import { type CreateSelectProps, createSelect, melt } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';

	export let createSelectOptions: CreateSelectProps;
	export let items: string[];
	export let placeholder: string;

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open }
	} = createSelect(createSelectOptions);
</script>

<button
	use:melt={$trigger}
	class={clsx(
		'w-full max-w-32 px-2 py-1',
		'shadow-sm',
		'inline-flex items-center justify-between',
		'rounded-md border border-gray-200',
		'bg-transparent',
		'ring-offset ring-black focus:outline-none focus:ring-1',
		'disabled:cursor-not-allowed disabled:opacity-50',
		{ 'text-gray-600': !$selectedLabel }
	)}
>
	{$selectedLabel || placeholder}
	<svg
		class="ms-2"
		width="15"
		height="15"
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
			fill="currentColor"
			fill-rule="evenodd"
			clip-rule="evenodd"
		></path></svg
	>
</button>
{#if $open}
	<div
		use:melt={$menu}
		transition:fade={{ duration: 100 }}
		class={clsx(
			'flex max-h-64 flex-col',
			'overflow-y-auto',
			'rounded-md shadow-md',
			'bg-white',
			'p-1'
		)}
	>
		{#each items as item}
			<div
				use:melt={$option({ value: item, label: item })}
				class={clsx(
					'px-2 py-1',
					'cursor-pointer',
					'rounded-md',
					'hover:bg-gray-100 data-[highlighted]:bg-gray-100',
					'data-[disabled]:opacity-50'
				)}
			>
				{item}
			</div>
		{/each}
	</div>
{/if}
