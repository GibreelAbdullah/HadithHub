import { writable } from 'svelte/store';

var selectedLanguagesStore = writable<string[]>([]);

export { selectedLanguagesStore };