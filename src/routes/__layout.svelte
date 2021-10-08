<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
    @layer utilities {
    .font-thin {
        font-variation-settings: 'wght' 100;
    }
    .font-extralight {
        font-variation-settings: 'wght' 200;
    }
    .font-light {
        font-variation-settings: 'wght' 300;
    }
    .font-normal {
        font-variation-settings: 'wght' 400;
    }
    .font-medium {
        font-variation-settings: 'wght' 500;
    }
    .font-semibold {
        font-variation-settings: 'wght' 600;
    }
    .font-bold {
        font-variation-settings: 'wght' 700;
    }
    .font-extrabold {
        font-variation-settings: 'wght' 800;
    }
    .font-black {
        font-variation-settings: 'wght' 900;
    }
}
</style>