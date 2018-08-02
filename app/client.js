import { init } from 'sapper/runtime.js';
import { manifest } from './manifest/client.js';
import { Store } from 'svelte/store';

init({
	target: document.querySelector('#sapper'),
	manifest,
	store: data => new Store(data)
});