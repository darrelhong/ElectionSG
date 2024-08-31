<script lang="ts">
	import clsx from 'clsx';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { emptyMeltElement, melt, type AnyMeltElement } from '@melt-ui/svelte';

	const button = cva(
		clsx(
			'text-sm font-medium',
			'px-4 py-2',
			'inline-flex items-center justify-center rounded-md transition-colors',
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

	type OtherProps = {
		element?: AnyMeltElement;
	};

	type AnchorProps = HTMLAnchorAttributes & VariantProps<typeof button> & OtherProps & { as: 'a' };

	type ButtonProps = HTMLButtonAttributes &
		VariantProps<typeof button> &
		OtherProps & { as?: 'button' };

	type $$Props = AnchorProps | ButtonProps;

	export let element: $$Props['element'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let as: $$Props['as'] = 'button';

	$: meltElement = element ?? emptyMeltElement;
</script>

{#if as === 'a'}
	<a {...$$props} class={button({ variant, class: $$props.class })} use:melt={$meltElement}
		><slot /></a
	>
{:else}
	<button {...$$props} class={button({ variant, class: $$props.class })} use:melt={$meltElement}
		><slot /></button
	>
{/if}
