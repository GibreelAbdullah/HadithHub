<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import SvgIcon from './svgIcon.svelte';
	import { languagePromise } from './utilsV2';
	import { selectedLanguagesStore } from './store';

	const storedLanguagesList = browser
		? (window.localStorage.getItem('storedLanguagesList') ?? 'ara,eng')
		: 'ara,eng';

	selectedLanguagesStore.set(storedLanguagesList.split(',').filter(x => x)) ?? storedLanguagesList;

	function getSelectedLanguages(data: { [key: string]: string }, selectedLanguagesShortName: string[]) {
		let selectedLanguages: string = '';
		switch (selectedLanguagesShortName.length) {
			case 0:
				selectedLanguages = 'No Language Selected';
				break;
			case 1:
			case 2:
			case 3:
			for (const languageShortName of selectedLanguagesShortName) {
				if (data.hasOwnProperty(languageShortName)) {
					selectedLanguages += data[languageShortName] + ', ';
				}
			}
				selectedLanguages = selectedLanguages.substring(0, selectedLanguages.length - 2);
				break;
			default:
				selectedLanguages = selectedLanguagesShortName.length + ' languages selected';
		}
		if (browser) {
			window.localStorage.setItem('storedLanguagesList', selectedLanguagesShortName.toString());
		}
		return selectedLanguages;
	}
</script>

<aside>
	{#await languagePromise}
		<div class="text-primary-500 font-bold uppercase">Languages</div>
		<div class="text-sm">
			<div class="placeholder animate-pulse w-32"></div>
		</div>
	{:then data : { [key: string]: string }}
		<span class="md:hidden">
			<SvgIcon class="!w-10" name="icon" />
			<SvgIcon class="!w-40" name="hadithHub" />
		</span>

		<div class="text-primary-500 font-bold uppercase pt-4">Languages</div>
		<div class="text-sm">
			{getSelectedLanguages(data, $selectedLanguagesStore)}
		</div>

		<ListBox
			multiple
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			class="p-4 pointer-events-auto"
		>
			{#each Object.keys(data) as languageObject}
				<ListBoxItem
					bind:group={$selectedLanguagesStore}
					name={languageObject}
					value={languageObject}
				>
					<div class="max-h-4 pb-5">{data[languageObject]}</div>
				</ListBoxItem>
			{/each}
		</ListBox>
	{:catch data}
		Error...Could Not Load Data
	{/await}
</aside>
