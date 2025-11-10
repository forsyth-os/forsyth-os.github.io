<script lang="ts">

import { getGPUTier } from 'detect-gpu';
import { base } from '$app/paths';
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import { letterSlideIn, letterSlideOut, maskSlideIn, maskSlideOut, workImageIntro, workListIntro } from "$lib/animations";
	import { loadPagePromise } from "$lib/store";
	import { dataState, scrollAnchorState, viewPortState, workScrollState } from "$lib/state.svelte";
	import { loadImage, onScrolledIntoView } from "$lib/utils";


	let workContainer: HTMLElement;
	let container: HTMLElement; 
	let listContainer: HTMLElement; // Containers for Three meshes
	let images: HTMLImageElement[] = []; // Array of images to be passed to WebGL Shader
	let workItems: HTMLElement[] = []; // Array of workItems to be animated

	let breakTitleWords: boolean = false;
	let currentActive: number = -1; // The work item to expand (disabled)

	let inViewResolve: (_: boolean) => void;
	const inViewPromise: Promise<boolean> = new Promise((resolve) => {
		inViewResolve = resolve;
	});


	// Slider calculations and rendering
	class WorkSlider {

		currentMouseX = 0; 
		initialMouseX = 0;
		currentPosition = 0; 
		targetPosition = 0; 
		initialPosition = 0;
		offsetSpeed = 5000; 
		lerpSpeed = 0.1;

		onHold = (e: MouseEvent) => {
			e.preventDefault();
			if (currentActive >= 0 || workScrollState.active || (e.target! as HTMLElement).classList.contains("button")) return;

			this.initialMouseX = e.clientX;
			this.currentMouseX = e.clientX;
			workScrollState.active = true;

			if (workScrollState.active) {
				let style = window.getComputedStyle(listContainer);
				let matrix = new WebKitCSSMatrix(style.transform);

				this.initialPosition = matrix.m41;
			}
		}

		onRelease() {
			workScrollState.active = false;
		}
	
		onMouseMove = (e: MouseEvent) => {
			e.preventDefault();
			if (!workScrollState.active) return; 
			this.currentMouseX = e.clientX;

			let diff = (this.currentMouseX - this.initialMouseX) * -1;
			this.targetPosition = Math.round((this.initialPosition - (this.offsetSpeed * (diff / document.body.clientWidth))) * 100) / 100;
		}

		animate = () => {
			if (currentActive < 0) {
				let endPoint = listContainer.offsetWidth - document.body.clientWidth
				if (endPoint < 0) endPoint = listContainer.offsetWidth;

				// Checks for disabling over-scrolling
				if (this.targetPosition > 0) this.targetPosition = 0;
				if (this.targetPosition <= (endPoint * -1)) this.targetPosition = - endPoint;
			}

			// Lerp easing
			this.currentPosition = this.lerp(this.currentPosition, this.targetPosition, this.lerpSpeed);
			
			workScrollState.speed = Math.round((this.currentPosition - this.targetPosition) * 100) / 100; // Set Svelte Store value for the Canvas effect
			listContainer.style.transform = `translate3d(${ Math.round(this.currentPosition * 100) / 100 }px, 0px, 0px)`;

			requestAnimationFrame(() => this.animate());
		}

		lerp(start: number, end: number, t: number) {
			return start * (1 - t) + end * t;
		}
	}


	
	const slider = new WorkSlider();

	onMount(async () => {

		onScrolledIntoView(workContainer, () => inViewResolve(true));

		// GPU Tier to decide if effects should be enabled
		const gpuTier = await getGPUTier();
		// Svelte store for checking if device is a mobile device
		viewPortState.isMobile = gpuTier.isMobile!;

		await loadPagePromise;
		scrollAnchorState.work = workContainer;

		listContainer.style.transform = "translate3d(0px, 0px, 0px)";

		// ThreeJS warping effect disabled to prevent unwanted distortion
		// if (gpuTier.tier >= 2 && !gpuTier.isMobile && gpuTier.fps! >= 30) new ImageRenderer(container, images);
	});

	// Move slider to active item when it is active
	function toggleActiveItem(i: number) {
		// disabled: overlay removed in favor of direct links
		currentActive = -1;
	}

	function titleSlide(node: HTMLElement) {
		let title = letterSlideIn(node, { delay: 5, breakWord: false });
		title.anime({
			onComplete: () => breakTitleWords=true
		});
	}

</script>




<div id="content-container" class="work-click-area" bind:this="{ workContainer }">

	<div class="content-wrapper" 
		role="listbox"
		tabindex="0"
		onmousedown={slider.onHold}
		onmouseup={slider.onRelease}
		onmouseleave={slider.onRelease}
		onmousemove={slider.onMouseMove}
		bind:this={container}
		class:disabled={currentActive >= 0}
		use:workListIntro={{ promise: inViewPromise, onComplete: async () => {
			 // Begin slider animations and effects once slider is animated in and if device is not a phone
			const gpuTier = await getGPUTier();
			if (!gpuTier.isMobile) slider.animate();
		} }}
	>
		<div class:mobile={viewPortState.isMobile}>
			<ul class="work-list" 
				bind:this={listContainer} 
				class:hold={workScrollState.active}>

				<!-- ========================= WORK ITEMS (Landing page project previews) ========================= -->
				<!-- Edit data like title/summary/roles/links in static/data/work-data.json -->
				<!-- Edit image files in static/assets/imgs/work-back/{project-id}/cover.png -->
				{#each dataState.workData! as item, i}
					<!-- === Project Block: {item.title} (id: {item.id}) =================================== -->
					<!-- Image + Text formatting for this project's preview card lives below -->
					<li use:workImageIntro={{ promise: inViewPromise, delay: i*30 }} data-project-id={item.id}>
						<div class="list-item clickable passive" 
							class:ambient="{ currentActive !== i && currentActive >= 0 }" 
							class:active="{ currentActive === i }" 
							bind:this={ workItems[i] }>

							<!-- Project Cover Image (edit file in static/assets/imgs/work-back/{item.id}/cover.png) -->
							<div class="img-wrapper">
								{#await loadImage(`assets/imgs/work-back/${item.id}/cover.png`) then src}
									<img bind:this={images[i]} src="{src}" ondragstart={(e) => {e.preventDefault()}} draggable="false" alt="{item.title} Background">
								{:catch}
									<div class="placeholder-image">
										Cover Image
									</div>
								{/await}
							</div>
							{#await inViewPromise then _}
								<!-- Project Title + View Button (title comes from work-data.json) -->
								<div class="text-wrapper" class:hidden={currentActive >= 0 || workScrollState.active}>
									<h1 
										class="item-title" 
										>
										<span in:maskSlideIn={{
											duration: 900, 
											delay: (i*30)+300,
											reverse: true 
										}}>
											{item.title}
										</span>
									</h1>

						<a 
							class="button item-link interactive"
							href={`${base}/work/${item.id}`}
							onmousedown={(e) => e.stopPropagation()}
							onclick={(e) => e.stopPropagation()}
							in:maskSlideIn={{
								duration: 900,
								delay: (i*30)+450,
								reverse: true
							}}>
							view
						</a>
								</div>
							{/await}
						</div>
					</li>
					<!-- === End Project Block: {item.title} ================================================ -->
				{/each}
			</ul>
		</div>

		<!-- Active work item details removed -->
		{#if false}{/if}
		
		<!-- Scroll indicator for horizontal project navigation -->
		<div class="scroll-indicator" in:maskSlideIn={{ duration: 1200, delay: 800, reverse: true }}>
			<div class="scroll-arrow">
				{#await loadImage("assets/imgs/scroll_arrow.png") then src}
					<img src="{src}" alt="Scroll right to see more projects">
				{/await}
			</div>
			<div class="scroll-text">Click & Scroll</div>
		</div>
	</div>
</div>


<style lang="sass">

@use "../consts" as consts
@include consts.textStyles()

#content-container.work-click-area
	margin-top: 12vh

#content-container.work-click-area .content-wrapper
	display: flex
	flex-direction: column
	cursor: grab
	position: relative

	&.disabled
		cursor: default !important

		.mobile ul.work-list
			opacity: 0

	.mobile
		width: 100%
		height: 100%
		overflow-x: auto
	
	*
		-webkit-touch-callout: none
		-webkit-user-select: none
		-moz-user-select: none
		-ms-user-select: none
		user-select: none

	.details-container
		position: absolute
		left: 0
		top: 0
		height: 100%
		width: 100%
		display: flex
		flex-direction: row
		justify-content: space-between
		box-sizing: border-box
		padding: 0 14vw

		.wrapper
			text-align: left
			position: relative
			display: flex
			flex-direction: column
			justify-content: space-between
			flex-basis: 100%

			.top-align
				.wrapper
					display: inline-flex
					flex-direction: row
					align-items: center
					justify-content: left
					position: relative

					h6.caption
						position: relative
						font-family: consts.$font
						text-transform: uppercase
						font-weight: normal
						font-size: 1.9vh

					.index
						font-family: consts.$font
						position: relative
						font-size: 2.1vh

					span.line
						width: 300%
						margin: 0 10%
						height: 1.5px
						background-color: white

			.mid-align	
				display: flex
				flex-direction: row
				align-items: center
				justify-content: space-between

				h1.title
					position: relative
					font-family: consts.$titleFont
					font-size: 7vw
					text-transform: none
					font-weight: normal
					word-wrap: break-word
					white-space: normal
					line-height: 100%

					&.breakTitleWords
						display: inline-block
						max-width: min-content

				.close-button
					cursor: pointer
					font-size: 3.3vw

			@media only screen and (max-width: 750px)
				.mid-align
					flex-direction: column
					justify-content: flex-start
					align-items: flex-start

					h1.title
						font-size: 16.5vw

					.close-button-wrapper
						position: absolute
						top: 0
						right: 0

						.close-button
							font-size: 5vh

			
			.bottom-align
				display: flex
				flex-direction: row
				justify-content: space-between
				align-items: center
				gap: 5vh

				*
					flex-grow: 1
					flex-basis: 0

				p
					font-size: 1.3vh
					width: 65%

				.roles 
					display: flex
					flex-direction: column
					align-items: center

					.descriptor
						line-height: 270%
						letter-spacing: 0.5vh
						font-family: consts.$font
						text-transform: uppercase
						font-weight: normal
						font-size: 1.4vh


					ul 
						list-style-type: none
						display: flex
						flex-direction: column

						li
							font-family: consts.$font
							text-transform: uppercase
							font-weight: normal
							font-size: 1.7vh
							line-height: 160%

				.links
					position: relative
					display: flex
					flex-direction: column
					align-items: flex-end
					gap: 2vh

					.button
						font-size: 1.1vw
						letter-spacing: 0.2vw
						text-transform: uppercase
						text-decoration: none
						line-height: 160%
						background: rgba(255, 255, 255, 0.1)
						border: 1px solid rgba(255, 255, 255, 0.3)
						padding: 1vh 2vw
						border-radius: 0.5vh
						transition: all 0.3s ease
						position: relative
						overflow: hidden
						display: inline-block
						
						&:hover
							background: rgba(255, 255, 255, 0.2)
							border-color: rgba(255, 255, 255, 0.6)
							transform: translateY(-2px)
							box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1)
						
						&:active
							transform: translateY(0px)
						
						&::before
							content: ""
							position: absolute
							top: 0
							left: -100%
							width: 100%
							height: 100%
							background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)
							transition: left 0.5s ease
						
						&:hover::before
							left: 100%
					
					.project-link-button
						background: linear-gradient(135deg, #ffffff, #f8fafc)
						border: 2px solid #e2e8f0
						border-radius: 12px
						padding: 2.2vh 2.8vw
						position: relative
						overflow: hidden
						transition: all 0.3s ease
						display: flex
						align-items: center
						gap: 1vw
						font-weight: 600
						min-height: 5.5vh
						box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15)
						backdrop-filter: blur(10px)
						cursor: pointer
						
						&:hover
							background: linear-gradient(135deg, #ffffff, #f1f5f9)
							border-color: #94a3b8
							transform: translateY(-2px)
							box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15)
							
							.button-text
								color: #1e293b
								animation: none
							
							.button-arrow
								transform: translateX(3px)
								color: #1e293b
						
						&:active
							transform: translateY(-1px)
							transition: transform 0.1s ease
						
						.button-text
							position: relative
							z-index: 2
							font-weight: 900
							font-size: 1.2vw
							letter-spacing: 0.15vw
							color: #1a1a1a
							text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8)
							transition: all 0.3s ease
							animation: textWiggle 4s ease-in-out infinite
							
							@keyframes textWiggle
								0%, 85%, 100%
									transform: translateX(0) scale(1)
								87%
									transform: translateX(-5px) scale(1.05)
								89%
									transform: translateX(5px) scale(1.05)
								91%
									transform: translateX(-5px) scale(1.05)
								93%
									transform: translateX(5px) scale(1.05)
								95%
									transform: translateX(-3px) scale(1.02)
								97%
									transform: translateX(3px) scale(1.02)
								99%
									transform: translateX(0) scale(1)
						
						.button-arrow
							position: relative
							z-index: 2
							transition: all 0.3s ease
							opacity: 0.8
							font-size: 1.1em
							font-weight: 600
							color: #334155

					.underline
						display: none

			@media only screen and (max-width: 750px)
				.bottom-align
					flex-direction: column
					justify-content: flex-start
					align-items: flex-start
					gap: 1vh

					p
						font-size: 1.6vh !important

					.links
						margin: 2vh 0
						align-items: flex-start
						
						.button
							font-size: 2vh
							position: relative
							background: rgba(255, 255, 255, 0.1)
							border: 1px solid rgba(255, 255, 255, 0.3)
							padding: 1.2vh 3vw
							border-radius: 0.5vh
							transition: all 0.3s ease
							display: inline-block
							
							&:hover
								background: rgba(255, 255, 255, 0.2)
								border-color: rgba(255, 255, 255, 0.6)
								transform: translateY(-1px)
								box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1)
						
						.project-link-button
							background: linear-gradient(135deg, #ffffff, #f8fafc)
							border: 2px solid #e2e8f0
							border-radius: 10px
							padding: 2.5vh 3.5vw
							display: flex
							align-items: center
							gap: 2vw
							font-weight: 600
							box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15)
							min-height: 6vh
							cursor: pointer
							
							&:hover
								background: linear-gradient(135deg, #ffffff, #f1f5f9)
								border-color: #94a3b8
								transform: translateY(-1px)
								box-shadow: 0 5px 14px rgba(0, 0, 0, 0.15)
								
								.button-text
									animation: none
								
								.button-arrow
									transform: translateX(2px)
									opacity: 1
							
							.button-text
								font-weight: 900
								font-size: 2.2vh
								letter-spacing: 0.2vh
								color: #1a1a1a
								text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8)
								transition: all 0.3s ease
								animation: textWiggle 4s ease-in-out infinite
							
							.button-arrow
								font-size: 1.2em
								font-weight: 600
								color: #334155
								opacity: 0.8
								transition: all 0.3s ease

						.underline
							display: inline-block
							position: absolute
							width: 100%
							height: 2px
							bottom: 0
							left: 0
							background-color: white

						div.line
							display: none

	ul.work-list
		margin-top: auto
		margin: auto 0
		padding: 0 5vw
		list-style-type: none
		display: flex
		flex-direction: row
		align-items: center
		height: 75vh
		min-width: min-content
		opacity: 1
		transition: opacity 0.5s ease
		-webkit-transition: opacity 0.5s ease

		&.hold
			.list-item
				height: 45vh !important

		.list-item
			display: inline-flex
			justify-content: flex-end
			overflow: hidden
			height: 49.5vh
			width: 25.2vw
			box-sizing: border-box
			position: relative
			overflow: hidden
			z-index: 3
			margin-right: 6vw
			transition: width 0.7s cubic-bezier(0.25, 1, 0.5, 1), height 0.7s cubic-bezier(0.25, 1, 0.5, 1), margin 0.8s cubic-bezier(0.25, 1, 0.5, 1)

			*
				transition: opacity 0.3s ease
				-webkit-transition: opacity 0.3s ease

			&.active
				height: 54vh
				width: 49.5vw
				margin-right: 16vw
				margin-left: 10vw

				.img-wrapper
					width: 100%

			&.ambient
				height: 45vh

			.hidden
				opacity: 0

			.img-wrapper
				overflow: hidden
				height: 100%
				z-index: 1
				position: relative
				width: 95%
				margin-right: 5%
				box-shadow: 3px 9px 18px rgba(0, 0, 0, 0.2)
				
				img
					height: 100%
					width: 100%
					object-fit: cover
					position: absolute
					top: 50%
					left: 50%
					transform: translate(-50%, -50%)
					-webkit-transform: translate(-50%, -50%)
					opacity: 0.5

				.placeholder-image
					height: 110%
					width: 110%
					background: #333
					color: white
					display: flex
					align-items: center
					justify-content: center
					font-size: 2vh
					text-align: center
					position: absolute
					top: 50%
					left: 50%
					transform: translate(-50%, -50%)
					-webkit-transform: translate(-50%, -50%)
					border-radius: 0.5vh

			.text-top-wrapper
				position: absolute
				top: 6vh
				right: 0
				z-index: 2
				word-wrap: break-word
				white-space: normal
				text-align: right

				.item-index
					font-size: 1vw
					letter-spacing: 0.1vw
					text-transform: uppercase
					font-family: consts.$font

			.text-wrapper
				box-sizing: border-box
				display: flex
				flex-direction: column
				justify-content: flex-end
				position: absolute
				bottom: 6vh
				right: 0
				text-align: right
				z-index: 2

				.button
					font-size: 1.3vw
					letter-spacing: 0.1vw
					margin-top: 2vh
					text-transform: uppercase

				.item-title
					font-family: consts.$font
					font-weight: normal
					font-size: 2.5vw
					z-index: 0
					opacity: 1
					letter-spacing: 0.1vw
					line-height: 110%
					word-spacing: 80vw
					text-transform: none
					word-wrap: break-word
					white-space: normal


				.inline-wrapper
					width: 100%
					position: relative
					margin-top: 1vh

					*
						display: inline-block

		@media only screen and (max-width: 1450px)
			.list-item
				width: 27vw

		@media only screen and (max-width: 1110px)
			.list-item
				width: 43.2vw

				.text-top-wrapper
					.item-index
						font-size: 2vh

				.text-wrapper
					width: calc(55vw - 10vh)

					.item-title
						font-size: 5vw

					.item-link
						font-size: 2vh

		@media only screen and (max-width: 650px)
			.list-item
				width: 76.5vw

				.text-wrapper
					width: calc(70vw - 10vh)

					.item-title
						font-size: 4.5vh

	.scroll-indicator
		position: absolute
		bottom: 8vh
		left: 8vw
		display: flex
		flex-direction: row
		align-items: center
		z-index: 10
		pointer-events: none

		.scroll-arrow
			overflow: hidden
			height: 2vh
			margin-left: 1.5vh
			order: 2

			img
				height: 2.3vh
				animation: scrollArrowHorizontal 3s ease infinite

		.scroll-text
			font-size: 2vh
			letter-spacing: 0.5vh
			font-family: consts.$font
			text-transform: uppercase
			color: white
			order: 1

	@keyframes scrollArrowHorizontal
		0%
			transform: translateX(-120%) rotate(-90deg)
		
		30%
			transform: translateX(0%) rotate(-90deg)
		
		70%
			transform: translateX(0%) rotate(-90deg)
		
		100%
			transform: translateX(120%) rotate(-90deg)

</style>