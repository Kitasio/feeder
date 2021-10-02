<script>
    import { pokemon } from "../stores/pokestore"
    console.log($pokemon)
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each $pokemon as pok}
<h3 class="text-xl font-bold">{pok.name}</h3>
{/each}