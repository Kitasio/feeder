<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div id="layout" class="text-green font-anon">
    <slot></slot>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    @font-face {
        font-family: 'Chicago';
        src: url("../ChicagoFLF.woff") format("woff");
    }
    .font-chic-border {
        text-shadow: -3px 0 #382358, 0 3px #382358, 3px 0 #382358, 0 -3px #382358;
        font-family: 'Chicago';
        font-weight: 700;
    }
</style>