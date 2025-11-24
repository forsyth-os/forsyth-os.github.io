<script lang="ts">
	import { onMount } from "svelte";
	import { maskSlideIn } from "$lib/animations";
	import { loadImage } from "$lib/utils";

	let pageContainer: HTMLElement = $state()!;
	let isClient = $state(false);

	// Section references for navigation
	let scopeSection: HTMLElement = $state()!;
	let mechanicalSection: HTMLElement = $state()!;
	let thermalSection: HTMLElement = $state()!;
	let electricalSection: HTMLElement = $state()!;
	let softwareSection: HTMLElement = $state()!;
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
					<button class="nav-button" onclick={() => navigate(mechanicalSection)}>
						Mechanical Design
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(thermalSection)}>
						Thermal Design
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(electricalSection)}>
						Electrical Design
					</button>
				</li>
				<li>
					<button class="nav-button" onclick={() => navigate(softwareSection)}>
						Software Design
					</button>
				</li>
			</ul>
		</nav>

		<!-- PROJECT HEADER -->
		<header class="project-header">
			<h1 class="project-title" in:maskSlideIn={{ duration: 1200, delay: 150, reverse: true }}>
				Accelerator Target Slider
			</h1>
			<p class="project-subtitle" in:maskSlideIn={{ duration: 1200, delay: 200, reverse: true }}>
				Mechatronic & Control System Design
			</p>
		</header>

		<!-- PROJECT COVER IMAGE -->
		<div class="project-image">
			{#if isClient}
				{#await loadImage("/assets/imgs/work-back/project1/cover.png") then src}
					<img src="{src}" in:maskSlideIn={{ duration: 1200,
						delay: 100,
						reverse: true,
						maskStyles: [
							{ property: "width", value: "100%"},
							{ property: "height", value: "100%"}
						]
					}} alt="Accelerator Target Slider Cover" class="project-pic">
				{:catch error}
					<div class="placeholder-image">
						<!-- ADD YOUR COVER IMAGE: Place cover.png in static/assets/imgs/work-back/project1/ -->
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

		<!-- SCOPE SECTION -->
		<section bind:this={scopeSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 300, reverse: true }}>
			<h2>Project Scope</h2>
			<div class="text-box">
				<p>
					The accelerator target slider (ATS) is a twin-frame actuation system designed to mount to the Ultra High Vacuum (UHV) target chamber.
					The ATS houses up to eight temperature-controlled samples using novel miniature irradiation sample holders (µPISH). 
					The actuation rods mount to linear actuators, maintain vacuum integrity with bellows, and contain cooling lines connected to aluminum frames.
					This platform supports miniature irradiation sample holders designed to maintain high temperature gradients between adjacent samples using silicon nitride resistance heaters.
					These sample holders form complete irradiation assemblies, each containing a heater, ceramic layer, sample, and tantalum aperture.
					With integrated thermocouples and current pickups, the system enables temperature-regulated and dose-controlled irradiation experiments to be conducted sequentially across multiple samples.
				</p>
			</div>
		</section>

		<!-- MECHANICAL DESIGN TEXT BOX -->
		<section bind:this={mechanicalSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 330, reverse: true }}>
			<h2>Mechanical Design</h2>
			<h3 class="subsection-title">µPISH Stages</h3>
			<div class="text-box">
				<p>
					The mechanical system design began with the development of a miniature Proton Irradiation Sample Holder (µPISH). This design functionally replicates the previous PISH II with a fraction of the footprint, allowing up to four samples to be mounted to each frame totalling eight. The most significant design challenge was enabling samples to be irradiated from room temperature up to 500°C while adjacent samples stay below 100°C to prevent annealing. This was accomplished with a high-temp SS stage shown below, and a low-temp Cu stage for better conductivity with the cooled Al frame. Sample temperature is regulated with PID control of the resistance heaters under each sample and water cooling through the common frame.
				</p>
			</div>
		</section>

		<!-- PROJECT IMAGE 1 -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 430, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image1.png") then src}
						<img src="{src}" alt="Accelerator Target Slider Image 1" class="project-detail-pic image-1">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image1.png in static/assets/imgs/work-back/project1/ -->
							Image 1<br>
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

		<!-- ACTUATION TEXT SECTION (matches hello-world styling) -->
		<section class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 460, reverse: true }}>
			<h3 class="subsection-title">Actuation System</h3>
			<div class="text-box">
				<p>
					The target slider is able to align mounted targets with the proton beam with the use of linear actuators. The frames are attached to custom made cooling lines that pass through a linear sleeve bearing, attached to 8in stroke bellows outside the UHV chamber to hold vacuum. The ends of the cooling line have milled grooves to attach wall mounted liner actuators, and a spout to attach a water or air line to. The actuation system uses a combination of ConFlat flange (CF), quick clamp (KF), and NPT threaded fittings to ensure ultra high vacuum (UHV) compatibility while remaining modular for easy maintenance and upgradability.
				</p>
			</div>
		</section>

		<!-- ACTUATION IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 490, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image2.png") then src}
						<img src="{src}" alt="Accelerator Target Slider Actuation" class="project-detail-pic image-2">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image2.png in static/assets/imgs/work-back/project1/ -->
							Image 2<br>
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

		<!-- THERMAL DESIGN TEXT SECTION (matches hello-world styling) -->
		<section bind:this={thermalSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 520, reverse: true }}>
			<h2>Thermal Design</h2>
			<h3 class="subsection-title">Thermal Modeling</h3>
			<div class="text-box">
				<p>
				Due to the absence of convection in vacuum, significant time was spent iterating the thickness and material of the µPISH stages until both FEA and CFD simulations indicated that thermal performance would be in an acceptable range.
				With SolidWorks FEA thermal analysis, the cooling system was modelled as a convection coefficient ~6000 W/m²K, whereas SolidWorks CFD flow simulation is able to model fluid parameters alongside heating.
				Due to this reason the CFD analysis was favoured and proven to be more accurate. <br><br>
				The final iteration of sample holder met the following criteria to balance adjacent thermal isolation with frame conductivity:
				</p>
				<ul>
					<li>All potential sample types &gt; 500°C from heater only while neighbouring sample &lt; 100°C</li>
					<li>All potential sample types &lt; 300°C from beam energies &gt; 100W</li>
				</ul>			
			</div>
		</section>

		<!-- THERMAL MODELING IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 550, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image3.png") then src}
						<img src="{src}" alt="Thermal Modeling Results" class="project-detail-pic image-3">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image3.png in static/assets/imgs/work-back/project1/ -->
							Thermal Modeling Image<br>
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

		<!-- THERMAL TESTING TEXT SECTION (subsection under Thermal Design) -->
		<section class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 580, reverse: true }}>
			<h3 class="subsection-title">Thermal Testing</h3>
			<div class="text-box">
				<p>
					Once the high-temp and low-temp variations of the µPISH stage were manufactured, various combinations of adjacent stage and sample types were tested for transverse heating. Testing was done to determine transient and steady state responses using a thermocouple housed inside of each sample. Testing showed that the low temperature stage caused and was more susceptible to transverse heating, while more conductive sample types heated faster but ultimately reached a similar steady state. It was proven that the µPISH were successfully designed to mitigate transverse heating as adjacent sample temperatures remained below 35°C with primary temperatures up to 500°C.
				</p>
			</div>
		</section>

		<!-- THERMAL TESTING IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 610, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image4.jpg") then src}
						<img src="{src}" alt="Thermal Testing Results" class="project-detail-pic image-4">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image4.jpg in static/assets/imgs/work-back/project1/ -->
							Thermal Testing Image<br>
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

		<!-- ELECTRICAL DESIGN TEXT SECTION (matches hello-world styling) -->
		<section bind:this={electricalSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 640, reverse: true }}>
			<h2>Electrical Design</h2>
			<h3 class="subsection-title">Electrical Measurement</h3>
			<div class="text-box">
				<p>
					An electrical testing circuit was developed outside of the vacuum chamber connected to the wire feedthrough to assess the heaters leakage current and ceramic performance. 
					It is essential that the current pickup off the sample is not noised by the ceramic resistance heater or lost via a current divider as a result of a poor ceramic resistance profile.
					The circuit shown below is set up to individually measure the ceramic resistance alongside leakage current with and without a 5uA source mimicking the beam current. 
					The voltage across the stack was also measured to determine the presence of a seebeck voltage generated by dissimilar conductors minimally separated with a large temperature gradient.
					Leakage current was measured with across a 100KΩ resistor to match the arduino pickup in the control room, mapping 0-30uA to 0-5v.
				</p>
			</div>
		</section>

		<!-- ELECTRICAL MEASUREMENT IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 670, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image5.png") then src}
						<img src="{src}" alt="Electrical Measurement System" class="project-detail-pic image-5">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image5.png in static/assets/imgs/work-back/project1/ -->
							Electrical Measurement Image<br>
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

		<!-- ELECTRICAL PERFORMANCE TEXT SECTION (subsection under Electrical Design) -->
		<section class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 700, reverse: true }}>
			<h3 class="subsection-title">Electrical Performance</h3>
			<div class="text-box">
				<p>
					Electrical testing proved that the ceramic resistance heater begins to conduct its own trace and leak current into the stack at ~200°C as observed below. It was also observed that the sintered silicone carbide used as an electrical insulator had an extremely poor resistance temperature profile. Due do the current divider this generated, the graph below shows the corrected values for currents measured. Additionally, seebeck voltages previously observed did not occur within the operatable temperature range of the target slider. Moving forward, the SiN ceramic should be replaced by a ceramic that holds over 10MΩ through 500°C to adequately measure the irradiation dose and mitigate noise from the heater.
				</p>
			</div>
		</section>

		<!-- ELECTRICAL PERFORMANCE IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 730, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image6.png") then src}
						<img src="{src}" alt="Electrical Performance Results" class="project-detail-pic image-6">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image6.png in static/assets/imgs/work-back/project1/ -->
							Electrical Performance Image<br>
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

		<!-- SOFTWARE DESIGN TEXT SECTION (matches hello-world styling) -->
		<section bind:this={softwareSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 760, reverse: true }}>
			<h2>Software Design</h2>
			<h3 class="subsection-title">LabVIEW Motor Control</h3>
			<div class="text-box">
				<p>
					To determine the most accurate method of aligning samples with the proton beam, three sets of actuator control VI's were developed.
					A novel PID approach was developed with closed loop feedback from a potentiometer to compare accuracy and response time to the baseline single speed control.
					The performance of the linear actuators is pivotal in an irradiation procedure to ensure that the sample is receiving the measured charge dosage to accurately study the materials failure.
					The PID test VI developed is shown below.
				</p>
			</div>
		</section>

		<!-- ELECTRICAL SETUP IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 790, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image7.png") then src}
						<img src="{src}" alt="Electrical Setup Software" class="project-detail-pic image-7">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image7.png in static/assets/imgs/work-back/project1/ -->
							Electrical Setup Image<br>
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

		<!-- SOFTWARE TESTING TEXT SECTION (subsection under Software Design) -->
		<section class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 820, reverse: true }}>
			<h3 class="subsection-title">Software Testing</h3>
			<div class="text-box">
				<p>
					Software testing was conduced with a line laser to represent the static beam and a micrometer to measure true accuracy with repeated position calling. The PID approach proved to drastically increase steady state accuracy relative to a single speed motor drive. This approach introduced high amplitude low frequency noise into the POT feedback, however, introducing a median filter mitigated this as shown in the top graph below. This software has since been developed to be locally stored on motor controlling Arduino to be resistant to drops in LabVIEW connection while still reporting positional feedback to the control room
				</p>
			</div>
		</section>

		<!-- SOFTWARE TESTING IMAGE SECTION -->
		<section class="project-images" in:maskSlideIn={{ duration: 1200, delay: 850, reverse: true }}>
			<div class="image-container">
				{#if isClient}
					{#await loadImage("/assets/imgs/work-back/project1/image8.png") then src}
						<img src="{src}" alt="Software Testing Results" class="project-detail-pic image-8">
					{:catch error}
						<div class="placeholder-image">
							<!-- ADD YOUR IMAGE: Place image8.png in static/assets/imgs/work-back/project1/ -->
							Software Testing Image<br>
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

		<!-- FUTURE WORK SECTION -->
		<section bind:this={futureSection} class="hello-world" in:maskSlideIn={{ duration: 1200, delay: 880, reverse: true }}>
			<h2>Future Work</h2>
			<div class="text-box">
				<p>
					The remaining work to be completed for the target slider will focus on the development of a completely automated irradiation control system to manage sample alignment, charge dosage, and temperature control. This system will be composed of a master LabVIEW VI to trigger local Arduino motor and temperature control. The control system must be accompanied by various fail safes that trigger beam shut down to reliably run without continuous operator supervision.
				</p>
			</div>
		</section>

		<!-- BACK TO PORTFOLIO -->
		<div class="back-link" in:maskSlideIn={{ duration: 1200, delay: 910, reverse: true }}>
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
			width: 100%
			margin: 0 auto
			box-sizing: border-box

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
			margin-bottom: 5.6vh
			margin-top: 2vh

			.project-title
				font-size: 8vh
				color: white
				margin: 0 0 2vh 0

			.project-subtitle
				font-size: 2.5vh
				color: rgba(255, 255, 255, 0.7)
				text-transform: uppercase
				letter-spacing: 0.5vh
				margin: 0

		.project-image
			width: 100%
			max-width: 100%
			height: 60vh
			margin-bottom: 8vh
			border-radius: 2vh
			overflow: hidden
			position: relative
			aspect-ratio: 4/3
			box-sizing: border-box

			.project-pic
				width: 100%
				max-width: 100%
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

			/* Global subsection subtitle style (applies to µPISH Stages and Actuation System) */
			.subsection-title
				font-size: 2.6vh
				margin-bottom: 2vh
				color: rgba(255, 255, 255, 0.9)
				letter-spacing: 0.1vh

			.text-box
				background: rgba(255, 255, 255, 0.05)
				padding: 4vh
				border-radius: 2vh
				border: 1px solid rgba(255, 255, 255, 0.1)
				max-width: 95%
				width: 100%
				margin: 0 auto
				box-sizing: border-box

				p
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin-bottom: 2vh

					&:last-child
						margin-bottom: 0

				ul
					font-size: 2.2vh
					line-height: 1.6
					color: rgba(255, 255, 255, 0.9)
					margin: 2vh 0
					padding-left: 3vh

					li
						margin-bottom: 1vh
						list-style-type: disc

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
				max-width: 100%
				height: 45vh
				border-radius: 2vh
				overflow: hidden
				position: relative
				aspect-ratio: 4/3
				box-sizing: border-box

				.project-detail-pic
					width: 100%
					max-width: 100%
					height: 100%
					object-fit: contain
					margin: 0 auto
					display: block

				/* Individual image sizing - each image can have different sizes */
				/* First project image (µPISH Stages) */
				.image-1
					width: 85%
					height: 85%

				/* Second project image (Actuation) */
				.image-2
					width: 100%
					height: 100%

				/* Third project image (Thermal Modeling) */
				.image-3
					width: 90%
					height: 90%

				/* Fourth project image (Thermal Testing) */
				.image-4
					width: 85%
					height: 85%

				/* Fifth project image (Electrical Measurement) */
				.image-5
					width: 80%
					height: 80%

				/* Sixth project image (Electrical Performance) */
				.image-6
					width: 95%
					height: 95%

				/* Seventh project image (Electrical Setup) */
				.image-7
					width: 100%
					height: 100%

				/* Eighth project image (Software Testing) */
				.image-8
					width: 90%
					height: 90%

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
			margin: 1vh 0 3vh 0

			.nav-list
				flex-direction: column
				gap: 0.5vh

				li
					.nav-button
						font-size: 1.5vh !important
						padding: 1vh 0

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
					
					/* Override individual image percentage sizes */
					&.image-1,
					&.image-2,
					&.image-3,
					&.image-4,
					&.image-5,
					&.image-6,
					&.image-7,
					&.image-8
						width: 100% !important
						height: auto !important
						max-height: var(--mobile-image-max-height, none) !important
						margin: 0 !important
						padding: 0 !important
						vertical-align: bottom !important
</style>
