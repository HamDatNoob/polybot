module.exports = {
	name: 'guideAutocomplete',
	async execute(interaction){
		const category = interaction.options._hoistedOptions[0].value;

		if(category == 'basics'){
			let categories = [
				{ name: 'Triangles', value: 'triangles' },
				{ name: 'Steel Triangles', value: 'steeltriangles' },
				{ name: 'Springs', value: 'springs' },
				{ name: 'Muscles/Diamonds', value: 'muscles' },
				{ name: 'Wall Bracing', value: 'wallbracing' },
				{ name: 'Compression vs Tension', value: 'cvst' }
			];

			return interaction.respond(categories);
		}else if(category == 'hydraulics'){
			let categories = [
				{ name: 'Basic Drawbridge', value: 'drawbridge' },
				{ name: 'Common Mistakes', value: 'mistakes' },
				{ name: 'Split Joints', value: 'splitjoints' },
				{ name: '3-Way Split Joints', value: 'threeway' },
				{ name: 'Hydraulic Controller', value: 'hydrauliccontroller' }
			];

			return interaction.respond(categories);
		}else if(category == 'sandbox'){
			let categories = [
				{ name: 'Hydraulic Phases', value: 'hydraulicphases' },
				{ name: 'Submitting to Workshop', value: 'workshop' },
				{ name: 'Event Editor', value: 'eventeditor' },
				{ name: 'Checkpoints', value: 'checkpoints' },
				{ name: 'Vehicle Stats', value: 'stats' }
			];

			return interaction.respond(categories);
		}else if(category == 'budgeting'){
			let categories = [
				{ name: 'Simple Shaving', value: 'shaving' },
				{ name: 'Removing Redundancies', value: 'redundancies' },
				{ name: 'Utalizing Advanced Techniques', value: 'uat' }
			];

			return interaction.respond(categories);
		}
	}
}