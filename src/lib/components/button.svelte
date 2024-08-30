<script lang="ts">
	import clsx from 'clsx';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { emptyMeltElement, melt, type AnyMeltElement } from '@melt-ui/svelte';

	const button = cva(
		clsx(
			'text-sm font-medium',
			'px-4 py-2',
			'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors',
			'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
			'disabled:pointer-events-none disabled:opacity-50'
		),
		{
			variants: {
				variant: {
					default: clsx('bg-black text-white hover:bg-black/85'),
					ghost: clsx('text-black hover:bg-black/5')
				}
			}
		}
	);
	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {
		element?: AnyMeltElement;
	}

	export let element: $$Props['element'] = undefined;
	export let variant: $$Props['variant'] = 'default';

	$: meltElement = element ?? emptyMeltElement;
</script>

<button {...$$props} class={button({ variant, class: $$props.class })} use:melt={$meltElement}
	><slot /></button
>
