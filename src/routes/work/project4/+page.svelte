<script lang="ts">
	import { onMount } from "svelte";
	import { maskSlideIn } from "$lib/animations";
	import { loadImage } from "$lib/utils";

	let pageContainer: HTMLElement = $state()!;
	let isClient = $state(false);

	// Section references for navigation
	let scopeSection: HTMLElement = $state()!;
	let redesignSection: HTMLElement = $state()!;

	onMount(() => {
		isClient = true;
	});

	function navigate(section: HTMLElement) {
		section.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
</script>

<div class="project-page" bind:this={pageContainer}>
	<div class="container">
		<!-- SECTION NAVIGATION -->
		<nav class="section-nav" in:maskSlideIn={{ duration: 1200, delay: 100, reverse: true }}>
			<ul class="nav-list">
				<li>
					<button class="nav-button" onclick={() => navigate(scopeSection)}>
						Scope
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(redesignSection)}>
						Redesign
					</button>
				</li>
			</ul>
		</nav>

		<!-- PROJECT HEADER -->
		<header class="project-header">
			<h1 class="project-title" in:maskSlideIn={{ duration: 1200, delay: 100, reverse: true }}>
				Primary Continously Variable Transmission (CVT)
			</h1>
			<p class="project-subtitle" in:maskSlideIn={{ duration: 1200, delay: 200, reverse: true }}>
				Mechanical Redesign
			</p>
		</header>

		<!-- PROJECT COVER IMAGE -->
		<div class="project-image">
			{#if isClient}
				{#await loadImage("/assets/imgs/work-back/project4/cover.png") then src}
					<img src="{src}" in:maskSlideIn={{ duration: 1200,
						delay: 100,
						reverse: true,
						maskStyles: [
							{ property: "width", value: "100%"},
							{ property: "height", value: "100%"}
						]
					}} alt="Project Four Cover" class="project-pic">
				{:catch error}
					<div class="placeholder-image">
						<!-- ADD YOUR COVER IMAGE: Place cover.png in static/assets/imgs/work-back/project4/ -->
						Cover Image<br>
						<small>Error: {error?.message || 'Image not found'}</small>
					</div>
				{/await}
			{:else}
				<div class="placeholder-image">
					Loading...
				</div>
			{/if}
		</div>

		<!-- HELLO WORLD TEXT BOX -->
		<section bind:this={scopeSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 300, reverse: true }}>
			<h2>Scope</h2>
			<div class="text-box">
				<p>
					A CVT is a type of automatic transmission that seamlessly changes through an infinite number of gear ratios within a specified range, rather than using fixed gear steps like traditional transmissions.
					The primary advantage of a CVT is its ability to keep the engine operating at its most efficient or powerful RPM, enhancing fuel efficiency and performance.
					This is accomplished with an engagemnet mechanism tuned to RPM by centrifugal force, composed of springs/cams. </p><p>
					The primary goal of this project was to investigate a method of CVT tuning with MATLAB and redesign the CVT to increase manufacturability.
			</div>
		</section>

		<!-- REDESIGN TEXT BOX -->
		<section bind:this={redesignSection} class="redesign-section" in:maskSlideIn={{ duration: 1200, delay: 400, reverse: true }}>
			<h2>Redesign</h2>
			<div class="text-box">
				<p>
					The redesign process began by researching an open source MATLAB Simulink program to help model and tune the engagement mechanism with future dyno testing.
					The goal was to setup a framework that receives testing data and can simulate how performance varies with physical changes to the system.
					This is particlualy benificial since unlike an E-CVT, tuning requires physical changes to the system making it difficult to gather large data sets on performance.
					The CAD redesign focused on material removal to reduce lathe time and altered the cooling fin width to increase convection at high RPMs. 
					Future work involves implementing an embedded software IR temperature sensor for the CVT belt and to accurately output live temperature data.
					This will help confirm the effectiveness of the cooling fins and aid in safetly tuning the CVT without overheating.
				</p>
			</div>
		</section>

		<!-- BACK TO PORTFOLIO -->
		<div class="back-link" in:maskSlideIn={{ duration: 1200, delay: 500, reverse: true }}>
			<a href="/" class="button">← Back to Portfolio</a>
		</div>
	</div>
</div>

<style lang="sass">
	@use "../../../lib/consts" as consts
	@include consts.textStyles()

	/* Remove default browser margins */
	:global(html),
	:global(body)
		margin: 0 !important
		padding: 0 !important

	.project-page
		min-height: 100vh
		background-color: #222224
		color: white
		padding: 15vh 3vw 10vh 3vw
		box-sizing: border-box
		margin: 0 !important

		.container
			max-width: 1600px
			margin: 0 auto

		.section-nav
			position: absolute
			top: 4vh
			left: 2vw
			z-index: 100

			.nav-list
				list-style-type: none
				display: flex
				flex-direction: row
				padding: 0
				margin: 0
				gap: 1.5vw

				li
					.nav-button
						background: none
						border: none
						color: white
						font-size: 2vh
						text-transform: uppercase
						letter-spacing: 0.2vh
						cursor: pointer
						padding: 0
						transition: color 0.3s ease
						font-family: inherit

						&:hover
							color: rgba(255, 255, 255, 0.7)

						&:not(:last-child)::after
							content: " - "
							margin-left: 0.5vw
							color: rgba(255, 255, 255, 0.5)

		.project-header
			text-align: center
			margin-bottom: 8vh

			.project-title
				font-size: 8vh
				margin-bottom: 2vh
				color: white

			.project-subtitle
				font-size: 2.5vh
				color: rgba(255, 255, 255, 0.7)
				text-transform: uppercase
				letter-spacing: 0.5vh

		.project-image
			width: 100%
			height: 55vh
			margin-bottom: 4vh
			border-radius: 2vh
			overflow: hidden
			position: relative
			aspect-ratio: 4/3

			.project-pic
				width: 100%
				height: 100%
				object-fit: contain

			.placeholder-image
				width: 100%
				height: 100%
				background: #333
				color: white
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
				font-size: 2vh
				text-align: center
				border-radius: 2vh

		.hello-world
			margin-bottom: 8vh

			h2
				font-size: 4vh
				margin-bottom: 4vh
				color: white
				border-bottom: 2px solid rgba(255, 255, 255, 0.2)
				padding-bottom: 2vh

			.text-box
				background: rgba(255, 255, 255, 0.05)
				padding: 4vh
				border-radius: 2vh
				border: 1px solid rgba(255, 255, 255, 0.1)

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

		.redesign-section
			margin-bottom: 8vh

			h2
				font-size: 4vh
				margin-bottom: 4vh
				color: white
				border-bottom: 2px solid rgba(255, 255, 255, 0.2)
				padding-bottom: 2vh

			.text-box
				background: rgba(255, 255, 255, 0.05)
				padding: 4vh
				border-radius: 2vh
				border: 1px solid rgba(255, 255, 255, 0.1)

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

		.back-link
			text-align: center
			margin-top: 10vh

			.button
				display: inline-block
				padding: 2vh 4vh
				background: rgba(255, 255, 255, 0.1)
				color: white
				text-decoration: none
				border-radius: 1vh
				font-size: 1.8vh
				text-transform: uppercase
				letter-spacing: 0.3vh
				transition: background 0.3s ease

				&:hover
					background: rgba(255, 255, 255, 0.2)

	@media only screen and (max-width: 750px)
		/* ========== MOBILE IMAGE CONTAINER SIZE CONTROL ========== */
		/* Adjust max-height to control how large images can be (prevent overflow) */
		/* Set to 'none' or very large value to allow images to use full width */
		.project-page
			--mobile-image-max-height: none  /* Set to 'none' to remove height constraint, or use value like '80vh' */
			padding: 15vh 5vw 5vh 5vw
			margin: 0 !important

		.section-nav
			position: relative
			top: auto
			left: auto
			margin: 1vh 0 3vh 0 !important
			text-align: left
			width: 100%
			display: flex
			justify-content: flex-start

			.nav-list
				display: flex !important
				flex-direction: row !important
				gap: 4.5vw !important
				align-items: center !important
				justify-content: flex-start !important
				padding: 0 !important
				margin: 0 !important
				flex-wrap: wrap !important

				li
					margin: 0 !important

					.nav-button
						font-size: 1.5vh !important
						padding: 1vh 0
						text-align: left

						&:not(:last-child)::after
							display: none

		.project-header
			.project-title
				font-size: 5vh !important

			.project-subtitle
				font-size: 2vh

		/* Cover image - remove dead space */
		.project-image :global(.a-mask),
		.project-image :global(.a-content)
			margin: 0 !important
			padding: 0 !important
			display: block !important
			line-height: 0 !important
		
		.project-image
			height: auto !important
			min-height: unset !important
			max-height: none !important
			aspect-ratio: unset !important
			margin-top: 2vh !important
			margin-bottom: 2vh !important
			overflow: visible !important
			border-radius: 0 !important
			position: static !important
			
			.project-pic
				width: 100% !important
				height: auto !important
				max-height: var(--mobile-image-max-height, none) !important
				display: block !important
				margin: 0 !important
				padding: 0 !important
				vertical-align: bottom !important
				line-height: 0 !important

		.hello-world
			margin-top: 2vh !important
			margin-bottom: 2vh !important
			
			.text-box
				padding: 3vh

		.redesign-section
			margin-top: 2vh !important
			margin-bottom: 2vh !important
			
			.text-box
				padding: 3vh
</style>
