<script lang="ts">
	import { onMount } from "svelte";
	import { maskSlideIn } from "$lib/animations";
	import { loadImage } from "$lib/utils";

	let pageContainer: HTMLElement = $state()!;
	let isClient = $state(false);

	// Section references for navigation
	let scopeSection: HTMLElement = $state()!;
	let mechanicalSection: HTMLElement = $state()!;
	let electricalSection: HTMLElement = $state()!;
	let futureSection: HTMLElement = $state()!;

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
					<button class="nav-button" onclick={() => navigate(mechanicalSection)}>
						Mechanical Design
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(electricalSection)}>
						Electrical Design
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(futureSection)}>
						Future Work
					</button>
				</li>
			</ul>
		</nav>

		<!-- PROJECT HEADER -->
		<header class="project-header">
			<h1 class="project-title" in:maskSlideIn={{ duration: 1200, delay: 100, reverse: true }}>
				Self-Playing Chess Board
			</h1>
			<p class="project-subtitle" in:maskSlideIn={{ duration: 1200, delay: 200, reverse: true }}>
				Mechatronic & Control System Design
			</p>
		</header>

		<!-- PROJECT COVER IMAGE -->
		<div class="project-image">
			{#if isClient}
				{#await loadImage("/assets/imgs/work-back/project2/cover.png") then src}
					<img src="{src}" in:maskSlideIn={{ duration: 1200,
						delay: 100,
						reverse: true,
						maskStyles: [
							{ property: "width", value: "100%"},
							{ property: "height", value: "100%"}
						]
					}} alt="Self-Playing Chess Board Cover" class="project-pic">
				{:catch error}
					<div class="placeholder-image">
						<!-- ADD YOUR COVER IMAGE: Place cover.png in static/assets/imgs/work-back/project2/ -->
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

		<!-- SCOPE TEXT BOX -->
		<section bind:this={scopeSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 300, reverse: true }}>
			<h2>Scope</h2>
			<div class="text-box">
				<p>
					The self playing chess board was decided upon as a personal project to gain a broad experience across system design and control without a large expense. The goal was to develop a system capable of making chess moves using an electromagnet housed on a 2D gantry underneath the chess board. Since this requires the pieces to be magnetic, chess moves can then be detected with a reed switch placed under each square and multiplexed by a microcontroller. My role in this project was to design all aspects responsible for physical gameplay, while my project partner programmed his own chess engine with an interactive website. Together, this project can bring features from chess.com including AI opponents, puzzles, and game evaluation to a physical chess board.
				</p>
			</div>
		</section>

		<!-- MECHANICAL DESIGN TEXT BOX -->
		<section bind:this={mechanicalSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 400, reverse: true }}>
			<h2>Mechanical Design</h2>
			<div class="text-box">
				<p>
					The mechanical design of the 2D gantry revolved around the dimensions of the low-cost hardware initially purchased. A stacked linear guide rail design was chosen to maximize the electromagnetic range for a fixed box size, allowing for a larger chess board and more clearance between pieces. This required the development of a floating motor mount to move the magnet along the second axis, and precise tolerancing to prevent deflection of the upper rail. The housings were 3D printed to reduce cost/weight and assembled with bolts to remain modular.

				</p>
			</div>
		</section>


		<!-- ELECTRICAL DESIGN TEXT BOX -->
		<section bind:this={electricalSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 500, reverse: true }}>
			<h2>Electrical Design</h2>
			<div class="text-box">
				<p>
					The electrical hardware design began with the layout shown below with one 12V power supply and Arduino controlling two stepper motors with limit switches. Nema 17 stepper motors were proposed for their high torque and accuracy without the need for sensors, however, were replaced with BYJ steppers to reduce cost, footprint, and weight to allow for a floating motor design. To account for the reduced torque, the 12V power supply was replaced with a 24V power supply utilizing A4988 current limiting motor drivers. Piece detection is accomplished with an array of reed switches measured through four 16 channel analog multiplexers.

				</p>
			</div>
		</section>

		<!-- ELECTRICAL DESIGN IMAGE -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 600, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project2/image2.png") then src}
						<img src="{src}" alt="Electrical Design" class="project-detail-pic">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image2.png in static/assets/imgs/work-back/project2/ -->
							Electrical Design Image<br>
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

		<!-- FUTURE WORK TEXT BOX -->
		<section bind:this={futureSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 700, reverse: true }}>
			<h2>Future Work</h2>
			<div class="text-box">
				<p>
					Currently, the chess board can move pieces with the electromagnet but lacks the ability to measure where pieces are on the board. The remaining work involves calibrating the piece’s magnetic field strength to that of the Electromagnet such that only the desired piece is moved along the board. The reed switch sensitivity must then be matched accordingly so that it is not noised by adjacent pieces causing false positive readings. Additionally, a path finding algorithm on the Arduino must be developed to take positional outputs from the chess engine and find the most efficient not contacting path there. Once this has been completed, the electrical circuit should move from the breadboard to a soldered perfboard and mounted in a 3D printed housing for a permanent design.

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
			height: 60vh
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

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

		.project-images
			margin-bottom: 4vh

			h2
				font-size: 4vh
				margin-bottom: 4vh
				color: white
				border-bottom: 2px solid rgba(255, 255, 255, 0.2)
				padding-bottom: 2vh

			.image-container
				width: 100%
				height: 45vh
				border-radius: 2vh
				overflow: hidden
				position: relative
				aspect-ratio: 4/3

				.project-detail-pic
					width: 100%
					height: 100%
					object-fit: contain
					margin: 0 auto
					display: block

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
		section.project-images :global(.a-mask),
		section.project-images :global(.a-content)
			margin: 0 !important
			padding: 0 !important
			display: block !important
			line-height: 0 !important
		
		section.project-images
			margin-top: 2vh !important
			margin-bottom: 2vh !important
		
		.project-images
			margin-top: 2vh !important
			margin-bottom: 2vh !important
			
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
