<script lang="ts">

	import { animate, stagger } from "animejs";
	import { onMount } from "svelte";
	import { loadPagePromise } from "$lib/store";
	import { loadImage } from "$lib/utils";
    import { scrollAnchorState, viewPortState } from "$lib/state.svelte";

	// DOM Node Binds for animations
	let homeContainerElement: HTMLElement = $state()!; // Container
	let backgroundContainerElement: HTMLElement = $state()!;
	let backgroundImageElement: HTMLElement = $state()!; // Offsets

	// Elements for animations
	let titleWord1Element: HTMLElement = $state()!; 
	let titleWord2Element: HTMLElement = $state()!; 
	let shortDetailsElement: HTMLElement = $state()!; 
	let callToActionElement: HTMLElement = $state()!;
	let expertiseElement: HTMLElement = $state()!;



	onMount(async () => {
		await loadPagePromise;
		// Set navbar home link's y location to top of homeContainer
		scrollAnchorState.home = homeContainerElement;

		// Add parallax scrolling offsets to slickScroll
		viewPortState.slickscrollInstance!.addOffset({
			element: backgroundContainerElement,
			speedY: 0.8
		});

		introAnimations();
	})


	// Page load animations
	function introAnimations() {




		// Animate background image
		Object.assign(backgroundContainerElement.style, {
			height: "0",
			transform: "scale(1.3)",
		});
		backgroundImageElement.style.transform = "translateY(80%) scale(1.4)";

		animate(backgroundContainerElement, {
			height: "100%",
			scale: 1,
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 1500,
			delay: 500,
			complete: () => {
				backgroundContainerElement.style.boxShadow = "3px 9px 18px rgba(0, 0, 0, 0.2)";
			}
		});

		animate(backgroundImageElement, {
			translateY: "0",
			scale: 1,
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 1500,
			delay: 500
		});


		// Animate title elements
		const titleElements = [titleWord1Element, titleWord2Element, shortDetailsElement, callToActionElement];
		titleElements.forEach(e => {
			e.style.transform = "translateY(130%) rotate(10deg)";
		})
		animate(titleElements, {
			rotate: "0",
			translateY: "0%",
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 900,
			delay: stagger(80, {start: 500})
		});

		// Animate expertise table
		expertiseElement.style.transform = "translateX(150%)";
		animate(expertiseElement, {
			translateX: "0%",
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 1200,
			delay: 600
		});
	}

</script>



<div id="content-container" style="padding-top: 23vh" bind:this={homeContainerElement}>
	<div class="content-wrapper">
		<div class="flex">
			<div class="flex-wrapper first">



			</div>
			
			<div class="flex-wrapper second">
				<h1 class = "title">
					<div class="title-mask">
						<div class="word" bind:this={titleWord1Element}>Alex</div>
					</div><br> 
					<div class="title-mask">
						<div class="word" bind:this={titleWord2Element}>Forsyth</div>
					</div>
				</h1>
				<div class="occupation mask">
					<p class = "paragraph" bind:this={shortDetailsElement}>
						Mechanical Engineering student at Queen's University
					</p>
				</div>
				<div class="wrapper action-mask">
					<div class="action" bind:this={callToActionElement}>
						<div class="mask">
							{#await loadImage("assets/imgs/scroll_arrow.png") then src}
								<img src="{src}" alt="">
							{/await}
						</div>
						<div>
							scroll
						</div>
					</div>
				</div>
			</div>

			<div class="parallax-wrapper home-back" bind:this={backgroundContainerElement}>
				{#await loadImage("assets/imgs/headshot.JPG") then src}
					<img src="{src}" bind:this={backgroundImageElement} draggable="false" alt="Home Background" style="width:100%; height: 100%; object-fit: cover;">
				{/await}
			</div>
		</div>
	</div>
</div>

<!-- Technical Expertise Table - Right Side -->
<div class="expertise-container" bind:this={expertiseElement}>
	<ul class="expertise-list">
		<li class="list-title">
			technical expertise
		</li>
		<li>
			SolidWorks CAD & Drafting
		</li>
		<li>
			Simulations (FEA/CFD)
		</li>
		<li>
			Control Systems (LabVIEW/Python)
		</li>
		<li>
			Electrical Schematics (KiCAD)
		</li>
	</ul>
</div>



<style lang="sass">

@use "../consts" as consts
@include consts.textStyles()

#content-container
	height: 97vh
	width: 94vw
	padding: 12vh 7vw
	box-sizing: border-box
	position: relative

	.content-wrapper
		position: relative
		height: 100%
		box-sizing: border-box
		z-index: 2

	.flex
		z-index: 2
		width: 100%
		height: 100%
		display: flex
		flex-direction: row
		justify-content: space-between
		position: relative
		box-sizing: border-box

		.flex-wrapper
			position: relative
			height: 100%
			display: flex
			flex-direction: column
			justify-content: center

			&.second
				margin-right: 13vw     
				justify-content: flex-end

			h1
				font-size: 15vh
				font-weight: 400
				text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3)
				color: white

			.title-mask
				overflow: hidden
				display: inline-flex

			.mask
				overflow: hidden

			.h-signature
				width: 35vh
				margin-left: -6vh

			.occupation
				position: relative
				margin-top: 8vh

				.paragraph
					color: white
					font-size: 2.2vh

			.action-mask
				margin-top: 10vh
				margin-right: 7vw
				display: inline-flex
				overflow: hidden

				.action
					font-size: 2vh
					letter-spacing: 0.5vh
					font-family: consts.$font
					text-transform: uppercase
					color: white
					position: relative
					display: inline-flex
					flex-direction: row
					align-items: center

					.mask
						overflow: hidden
						height: 2vh

						img
							height: 2.3vh
							margin-right: 1.5vh
							animation: scrollArrowLoop 3s ease infinite

	.parallax-wrapper
		position: absolute
		left: 0
		z-index: -1
		width: 67%
		height: 100%
		margin-left: 6%
		border-radius: 1.5vh
		overflow: hidden
		box-sizing: border-box
		-webkit-touch-callout: none
		-webkit-user-select: none
		-moz-user-select: none
		-ms-user-select: none
		user-select: none
		transition: box-shadow 0.6s ease
		-webkit-transition: box-shadow 0.6s ease

		@media only screen and (max-width: 1250px)
			&
				opacity: 0.7

		@media only screen and (max-width: 750px)
			&
				opacity: 0.3

		img
			height: 100%
			width: 100%
			object-fit: cover
			border-radius: 1.5vh
			filter: brightness(1)

.expertise-container
	position: fixed
	right: 3vw
	top: 12vh
	height: 73vh
	display: flex
	align-items: center
	z-index: 10
	width: 25vw
	min-width: 300px

	@media only screen and (max-width: 1250px)
		display: none

	.expertise-list
		list-style-type: none
		text-align: right
		margin: 0
		padding: 0

		li.list-title
			letter-spacing: 0.6vh
			font-size: 2vh
			font-weight: bold
			color: white
			margin-bottom: 1vh

		li
			font-family: consts.$font
			text-transform: uppercase
			font-size: 2.0vh
			letter-spacing: 0.5vh
			padding: 2vh 0
			border-bottom: 1px solid rgba(255, 255, 255, 0.3)
			color: white
			display: flex
			flex-direction: column
			align-items: flex-end

@media only screen and (min-width: 1250px)
	.h-signature
		display: block

	.occupation
		width: 100%

	#content-container .flex *
		text-align: left

@media only screen and (max-width: 1250px)
	#content-container .flex *
		text-align: left

	.flex
		justify-content: center !important
		width: 100% !important

		.flex-wrapper 
			&.first
				display: none !important

			&.second
				justify-content: center !important
				margin: 0

	#content-container .flex .bottom
		text-align: left
		left: 5vw

	.parallax-wrapper
		width: 100% !important
		margin-left: 0 !important

@media only screen and (max-width: 750px)
	.occupation
		width: 70%


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


@keyframes scrollArrowLoop
	0%
		transform: translateY(-120%)
	
	30%
		transform: translateY(0%)
	
	70%
		transform: translateY(0%)
	
	100%
		transform: translateY(120%)

</style>