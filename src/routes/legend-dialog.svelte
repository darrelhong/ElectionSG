<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import CloseIcon from '$lib/icons/close-icon.svelte';
	import { flyAndScale } from '$lib/transition';
	import { createDialog, melt } from '@melt-ui/svelte';
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog();
</script>

<button use:melt={$trigger} class="ms-auto"
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5">
		<path
			fill-rule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
			clip-rule="evenodd"
		/>
	</svg>
</button>

{#if $open}
	<div use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		></div>
		<div
			use:melt={$content}
			class={clsx(
				'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
				'grid rounded-md bg-white p-4',
				'min-w-[94vw] max-w-xl sm:w-full sm:min-w-0',
				'max-h-[85dvh] max-w-[90vw]'
			)}
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96
			}}
		>
			<Button
				element={close}
				class="absolute end-2 top-2 ms-auto justify-self-end !p-2"
				variant="ghost"
			>
				<CloseIcon />
			</Button>
			<div class="grid gap-y-6">
				<p class="text-2xl font-semibold">Legend</p>

				<div class="space-y-1">
					<div class="flex justify-between text-sm font-medium">
						<div>Ruling Party</div>
						<div>Opposition</div>
					</div>

					<div
						class="h-4 w-full rounded-full opacity-75"
						style="background: linear-gradient(to right in lch, #0099FF, white, #FF6600);"
					></div>
					<div class="flex justify-between text-sm font-medium">
						<p>100%</p>
						<p>50%</p>
						<p>100%</p>
					</div>
				</div>

				<div class="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
					<Button class="mt-4">Report issue</Button>
					<div>
						<p class="text-xs text-gray-600">
							Data: <a href="https://www.eld.gov.sg/homepage.html" target="_blank"
								>Elections Department Singapore</a
							>
						</p>
						<p class="text-xs text-gray-600">
							<a href="https://maplibre.org/" target="_blank">MapLibre</a>
							| © <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> ©
							<a href="https://www.openstreetmap.org/copyright" target="_blank"
								>OpenStreetMap contributors</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
