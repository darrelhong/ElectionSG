<script lang="ts">
	import clsx from 'clsx';
</script>

<button
	class={clsx(
		'bg-black text-white hover:bg-black/85 ',
		'text-sm font-medium',
		'px-4 py-2',
		'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors',
		'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
		'disabled:pointer-events-none disabled:opacity-50',
		$$props.class
	)}><slot /></button
>
