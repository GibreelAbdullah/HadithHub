<script lang="ts">
	import { languageStore } from '$lib/functions/store.svelte';
	let { bookPromise, bookURL } = $props();
</script>

{#await bookPromise}
	<div class="sticky top-0 card p-4 !variant-glass-secondary max-w-[90rem] m-auto my-4">
		<div class="grid px-3">
			<ol class="breadcrumb">
				<li class="crumb anchor"><a href="/">Home</a></li>
				<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
				<div class="placeholder w-52 m-auto animate-pulse"></div>
			</ol>
		</div>
	</div>
	{#each { length: 5 } as _, i}
		<div class="card p-4 max-w-[90rem] m-auto my-4">
			<div class="hadithGroup font-medium p-2 grid">
				<div>
					<div class="placeholder animate-pulse"></div>
				</div>

				<div class="text-right ml-10">
					<div class="placeholder animate-pulse"></div>
				</div>
				<div class="hidden md:block text-right">
					<div class="badge">
						<div class="placeholder animate-pulse w-16 m-auto"></div>
					</div>
				</div>
			</div>
			<div class="md:hidden text-center">
				<div class="placeholder animate-pulse w-16 m-auto"></div>
			</div>
		</div>
	{/each}
{:then dataList}
	{#each dataList as data}
		{#if data[3] == 'collection'}
			<div class="p-4">
				<div class="sticky top-0 card p-4 m-auto !variant-glass-secondary max-w-[90rem]">
					<div class="grid px-3">
						<ol class="breadcrumb">
							<li class="crumb anchor"><a href="/">Home</a></li>
							<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
							<li class="crumb">{data[4]}</li>
						</ol>
					</div>
				</div>
			</div>
		{:else if data[3] == 'book'}
			<a href="/{bookURL}/{data[0]}" class="card">
				<div class="p-4">
					<div class="card p-4 m-auto max-w-[90rem]">
						<div class="hadithGroup font-medium p-2 grid">
							{data[0]} -
							{#each { length: languageStore.value.length ? languageStore.value.length : 2 } as _, i}
								<div>
									{data[i + 4]}
								</div>
							{/each}
							<div class="hidden md:block text-right">
								<div class="badge bg-gray-500">
									{data[1][0]} to
									{data[1][1]}
								</div>
							</div>
						</div>
					</div>
					<div class="md:hidden text-center">
						<div class="badge bg-gray-500">
							{data[1][0]} to
							{data[1][1]}
						</div>
					</div>
				</div>
			</a>
		{/if}
	{/each}
{:catch data}
	<div class="card p-4 m-4">Error. What you're looking for is not here. Error : {data}</div>
{/await}

<style>
	.hadithGroup {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
</style>
