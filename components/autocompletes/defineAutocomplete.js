module.exports = {
	name: 'defineAutocomplete',
	async execute(interaction){
		const category = interaction.options._hoistedOptions[0].value;

		if(category == 'exploits'){
			let categories = [
				{ name: 'PFR / Precise Falling Road', value: 'pfr' },
				{ name: 'MFR / Massive Falling Road', value: 'mfr' },
				{ name: 'SFR / Stuck Falling Road', value: 'sfr' },
				{ name: 'SSR / Stuck Spring Road', value: 'ssr' },
				{ name: 'TC / Torque Cannon', value: 'tc' },
				{ name: 'FC / Flip Cannon', value: 'fc' },
				{ name: 'The', value: 'the' },
				{ name: 'SPY / Stuck Platform Yeet', value: 'spy' },
				{ name: 'SCY / Stuck Car Yeet', value: 'scy' },
				{ name: 'SFC / Stuck Falling Car', value: 'sfc' }
			];

			return interaction.respond(categories);
		}else if(category == 'bugs'){
			let categories = [
				{ name: 'Material Warping', value: 'mw' },
				{ name: 'EMW / Explosive Material Warp', value: 'emw' },
				{ name: 'ILM / Illegal Length Material', value: 'ilm' },
				{ name: 'SLR / Stuck Long Road', value: 'slr' }
			];

			return interaction.respond(categories);
		}else if(category == 'bt'){
			let categories = [
				{ name: 'Dangling Bridge', value: 'dangle' },
				{ name: 'Banana Bridge', value: 'banana' },
				{ name: 'Smithy Bridge', value: 'smithy' },
				{ name: 'Muscle', value: 'muscle' },
				{ name: 'SC / Spring Cannon', value: 'sc' },
				{ name: 'FR / Falling Road', value: 'fr' },
				{ name: 'Muscle Fractals / Arglin Diamonds', value: 'mf' },
				{ name: 'Chain / Wood Rope', value: 'wr' },
				{ name: 'Land Bracing / Wall Bracing', value: 'lb' },
				{ name: 'Toothpick', value: 'toothpick' }
			];

			return interaction.respond(categories);
		}else if(category == 'challenges'){
			let categories = [
				{ name: 'RWS / Road Wood Steel', value: 'rws' }
			];

			return interaction.respond(categories);
		}
	}
}