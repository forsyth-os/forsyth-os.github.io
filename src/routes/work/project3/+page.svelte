<script lang="ts">
	import { onMount } from "svelte";
	import { maskSlideIn } from "$lib/animations";
	import { loadImage } from "$lib/utils";

	let pageContainer: HTMLElement = $state()!;
	let isClient = $state(false);

	// Section references for navigation
	let scopeSection: HTMLElement = $state()!;
	let prototypeSection: HTMLElement = $state()!;
	let iterationSection: HTMLElement = $state()!;
	let finalDesignSection: HTMLElement = $state()!;

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
						Project Scope
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(prototypeSection)}>
						Prototype
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(iterationSection)}>
						Iteration
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(finalDesignSection)}>
						Final Design
					</button>
				</li>
			</ul>
		</nav>

		<!-- PROJECT HEADER -->
		<header class="project-header">
			<h1 class="project-title" in:maskSlideIn={{ duration: 1200, delay: 100, reverse: true }}>
				Optimized Brake Pedal
			</h1>
			<p class="project-subtitle" in:maskSlideIn={{ duration: 1200, delay: 200, reverse: true }}>
				Mechanical Design
			</p>
		</header>

		<!-- PROJECT COVER IMAGE -->
		<div class="project-image">
			{#if isClient}
				{#await loadImage("/assets/imgs/work-back/project3/cover.png") then src}
					<img src="{src}" in:maskSlideIn={{ duration: 1200,
						delay: 100,
						reverse: true,
						maskStyles: [
							{ property: "width", value: "100%"},
							{ property: "height", value: "100%"}
						]
					}} alt="Optimized Brake Pedal Cover" class="project-pic">
				{:catch error}
					<div class="placeholder-image">
						<!-- ADD YOUR COVER IMAGE: Place cover.png in static/assets/imgs/work-back/project3/ -->
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
			<h2>Project Scope</h2>
			<div class="text-box">
				<p>
					The scope of this project was to design a lighter weight break pedal for the Queens Baja off-road racing team in part of a larger weight reduction project. The target weight for a new design was sub 500g while sustaining a load to the pedal face of 2000N before adding a Factor Of Safety (FOS). Each team member drafted an initial prototype and the remaining iterations focused on stress uniformity to minimize material usage.
				</p>
			</div>
		</section>

		<!-- PROTOTYPE SECTION -->
		<section bind:this={prototypeSection} class="project-section" in:maskSlideIn={{ duration: 1200, delay: 400, reverse: true }}>
			<h2>Prototype</h2>
			<div class="text-box">
				<p>
					The initial design placed the pedal face perpendicular to the body in an attempt to prevent stress resulting from an applied moment and instead generate compressive stress along the pedal body.
					The resulting curve allowed the pedal to create a 55° angle relative to the driver's foot for optimal driver ergonomics.
					The design also utilized an I-beam body profile to minimize material usage while maximizing resistance to bending moments.
					The optimal flange height and width of the I-beam were chosen to maximize the section modulus and thus reduce bending stress as shown below:
				</p>
				<ul>
					<li>M = Sσ</li>
					<li>S = wH²/6 − bh³/6H</li>
				</ul>
				<p>
					Although promising, mounting the pedal face perpendicular caused excessive stress and deflection along the pedal face's edges, leading to the next iteration.
				</p>
			</div>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project3/image1.png") then src}
						<img src="{src}" alt="Prototype Design" class="project-detail-pic">
					{:catch error}
						<div class="placeholder-image">
							Prototype Image<br>
							<small>Error: {error?.message || 'Image not found'}</small>
						</div>
					{/await}
				{:else}
					<div class="placeholder-image">
						Loading...
					</div>
				{/if}
			</div>
		</section>

		<!-- ITERATION SECTION -->
		<section bind:this={iterationSection} class="project-section" in:maskSlideIn={{ duration: 1200, delay: 500, reverse: true }}>
			<h2>Iteration</h2>
			<div class="text-box">
				<p>
					The next iteration changed the pedal face to be mounted along the body with triangular supports at the edges.
					The curve of the pedal body was then reduced to provide the same ergonomic 55° angle, and material was added to areas with higher stress concentrations.
					The FEA stress analysis below proved that this design was able to meet the strength requirements, but was significantly over the target weight.
				</p>
			</div>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project3/image2.png") then src}
						<img src="{src}" alt="Iteration Design" class="project-detail-pic">
					{:catch error}
						<div class="placeholder-image">
							Iteration Image<br>
							<small>Error: {error?.message || 'Image not found'}</small>
						</div>
					{/await}
				{:else}
					<div class="placeholder-image">
						Loading...
					</div>
				{/if}
			</div>
		</section>

		<!-- FINAL DESIGN SECTION -->
		<section bind:this={finalDesignSection} class="project-section" in:maskSlideIn={{ duration: 1200, delay: 600, reverse: true }}>
			<h2>Final Design</h2>
			<div class="text-box">
				<p>
					The remaining iterations focused on weight reductions and increasing stress uniformity by selectively removing material from low stress areas in blue. This was done via triangular truss cutouts along the I beam and a large cutout under the pedal face where shear stress is the lowest. This allowed the final design to achieve a FOS of 1.5 weighing only 472g, capable of sustaining a 3000N load while keeping the yield stress under that of 6061 Aluminum.
				</p>
			</div>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project3/image3.png") then src}
						<img src="{src}" alt="Final Design" class="project-detail-pic">
					{:catch error}
						<div class="placeholder-image">
							Final Design Image<br>
							<small>Error: {error?.message || 'Image not found'}</small>
						</div>
					{/await}
				{:else}
					<div class="placeholder-image">
						Loading...
					</div>
				{/if}
			</div>
		</section>

		<!-- BACK TO PORTFOLIO -->
		<div class="back-link" in:maskSlideIn={{ duration: 1200, delay: 700, reverse: true }}>
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
			margin-top: 2vh

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
			margin-bottom: 8vh
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
				max-width: 95%
				margin: 0 auto

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

		.project-section
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
				margin-bottom: 4vh
				max-width: 95%
				margin-left: auto
				margin-right: auto

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

				ul
					margin: 2vh 0
					padding-left: 4vh
					color: rgba(255, 255, 255, 0.9)

					li
						font-size: 2.2vh
						line-height: 1.6
						margin-bottom: 1vh
						font-family: 'Courier New', monospace

			.image-container
				width: 100%
				height: 50vh
				border-radius: 2vh
				overflow: hidden
				position: relative
				aspect-ratio: 4/3

				.project-detail-pic
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
			margin: 1vh auto 3vh auto !important
			text-align: center
			width: 100%
			display: flex
			justify-content: center

			.nav-list
				display: flex !important
				flex-direction: row !important
				gap: 4.5vw !important
				align-items: center !important
				justify-content: center !important
				padding: 0 !important
				margin: 0 auto !important
				flex-wrap: wrap !important

				li
					margin: 0 !important

					.nav-button
						font-size: 1.5vh !important
						padding: 1vh 0
						text-align: center

						&:not(:last-child)::after
							display: none

		.project-header
			.project-title
				font-size: 6vh

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

		/* Detail images - remove dead space */
		section.project-section :global(.a-mask),
		section.project-section :global(.a-content)
			margin: 0 !important
			padding: 0 !important
			display: block !important
			line-height: 0 !important
		
		section.project-section
			margin-top: 2vh !important
			margin-bottom: 2vh !important
		
		.project-section
			margin-top: 2vh !important
			margin-bottom: 2vh !important
			
			.text-box
				padding: 3vh
			
			.image-container
				height: auto !important
				min-height: unset !important
				max-height: none !important
				aspect-ratio: unset !important
				overflow: visible !important
				width: 100% !important
				margin: 0 !important
				padding: 0 !important
				display: block !important
				border-radius: 0 !important
				position: static !important
				line-height: 0 !important
				
				.placeholder-image
					width: 100% !important
					height: auto !important
					min-height: 20vh !important
					max-height: var(--mobile-image-max-height, none) !important
				
				.project-detail-pic
					width: 100% !important
					height: auto !important
					max-height: var(--mobile-image-max-height, none) !important
					display: block !important
					margin: 0 !important
					padding: 0 !important
					vertical-align: bottom !important
					line-height: 0 !important
</style>
