<script lang="ts">

    import { onMount } from "svelte";
    import { letterSlideIn, maskSlideIn } from "$lib/animations";
    import { loadPagePromise } from "$lib/store";
    import { onScrolledIntoView } from "$lib/utils";
    import { dataState } from "$lib/state.svelte";

    let footerContainerElement: HTMLElement = $state()!
     


    let signaturePath1: SVGPathElement = $state()!; 
    let signaturePath2: SVGPathElement = $state()!; 
    let signaturePath3: SVGPathElement = $state()!;
    let signaturePath4: SVGPathElement = $state()!; 

    const currentYear = new Date().getFullYear();
    
    function introAnimations() {

        // Intersection observer to run animations when footer is in scroll view
        onScrolledIntoView(footerContainerElement, () => {

            // Signature SVG animation
            let animation = [{ strokeDashoffset: '0' }];

            // Signature animation using svg strokDashOffset
            signaturePath1.animate(animation, {
                duration: 1000,
                delay: 0,
                easing: 'cubic-bezier(.72,.3,.25,1)',
                fill: 'forwards' 
            });
            signaturePath2.animate(animation, {
                duration: 300,
                delay: 1000,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
            signaturePath3.animate(animation, {
                duration: 200,
                delay: 1300,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
            signaturePath4.animate(animation, {
                duration: 1000,
                delay: 1500,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
        });
    }

    onMount(async () => {
        await loadPagePromise;
        introAnimations();
    });

</script>



<div class="footer-wrapper" bind:this={footerContainerElement}>
    <!-- Left side -->
    <div class="flex-wrapper">


        <!-- Footer content removed as requested -->
    </div>

    <!-- Right side -->
	<div class="flex-wrapper decor">
        <!-- Alex Forsyth Portfolio -->
    </div>
</div>



<style lang="sass">

@use "../consts.sass" as consts

@include consts.textStyles()

.footer-wrapper
    width: 100vw
    background-color: #131314
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 15vh 13vw
    margin-top: 25vh
    box-sizing: border-box

    @media only screen and (max-width: 950px)
        .flex-wrapper.decor
            display: none !important

    @media only screen and (max-width: 950px)
        flex-direction: column-reverse

        .flex-wrapper:not(:first-child)
            margin-bottom: 15vh

    .inline-flex
        flex-grow: 1
        display: flex
        flex-direction: row
        align-items: center




    .status-wrapper
        .button.large-text
            margin-top: 2vh

    .credits-wrapper
        margin-top: 5vh
        color: rgba(255,255,255,0.3)

        p.year
            margin-bottom: 1vh
            font-family: consts.$font
            font-size: 1.8vh
            font-weight: normal
            color: rgba(255,255,255,0.3)

        .credits
            font-size: 1.5vh
            line-height: 125%
            white-space: nowrap
            color: rgba(255,255,255,0.3)

            .button
                color: rgba(255,255,255,0.3)

    .large-text
        font-size: 2.5vh

        @media only screen and (max-width: 950px)
            br
                display: none

    .flex-wrapper.decor
        display: flex
        flex-direction: column
        justify-content: center

        .name-signature
            width: 20vh

#signature
    .path-1
        stroke-dasharray: 365
        stroke-dashoffset: 365
    
    .path-2
        stroke-dasharray: 85
        stroke-dashoffset: 85

    .path-3
        stroke-dasharray: 45
        stroke-dashoffset: 45

    .path-4
        stroke-dasharray: 180
        stroke-dashoffset: 180

</style>