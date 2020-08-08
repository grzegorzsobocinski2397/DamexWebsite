const { Button } = wp.components;

/**
 * Helper class that handles traits for all components.
 */
export class TraitsHelper {
	/**
	 * Save the props from the block to be reusable in the class.
	 * @param props Attributes props of a block.
	 */
	constructor(props) {
		this.props = props;
	}

	/**
	 * Invoked on change on the <input> element for the trait. Saves the trait in the attributes.
	 * @param event Invoked on change on the <input> element.
	 */
	onTraitChange(event) {
		const traits = this.props.attributes.traits;
		const modifiedTrait = traits.find((trait) => trait.name === event.target.name);
		if (modifiedTrait !== undefined) {
			modifiedTrait.value = event.target.value;
			const filteredTraits = traits.filter((trait) => trait.name !== event.target.name);
			this.props.setAttributes({ traits: [...filteredTraits, modifiedTrait] });
		} else {
			const trait = { name: event.target.name, value: event.target.value };
			this.props.setAttributes({ traits: [...props.attributes.traits, trait] });
		}
	}

	/**
	 * Create new trait and add it to the array.
	 */
	addNewTrait() {
		const traitName = `trait-${this.props.attributes.traits.length}`;
		const trait = { name: traitName, value: "" };
		this.props.setAttributes({ traits: [...this.props.attributes.traits, trait] });
	}

	/**
	 * Invoked on button click. Removes the trait from the attributes.
	 * @param event Invoked on the <button> event.
	 */
	removeTrait(event) {
		const name = event.target.parentElement.querySelector("input").name;
		const traits = this.props.attributes.traits.filter((trait) => trait.name !== name);
		this.props.setAttributes({ traits });
	}

	/**
	 * Creates add button and binds the `addNewTrait` method.
	 */
	createAddButton() {
		return (
			<Button aria-label="Add Trait" onClick={this.addNewTrait.bind(this)}>
				Dodaj kolejną zaletę
			</Button>
		);
	}

	/**
	 * Render all created traits.
	 */
	renderTraits() {
		return this.props.attributes.traits.map((trait) => {
			return (
				<div class="trait-edit">
					<input name={trait.name} type="text" value={trait.value} onChange={this.onTraitChange.bind(this)} />
					<Button aria-label="Remove Trait" onClick={this.removeTrait.bind(this)}>
						Usuń zaletę
					</Button>
				</div>
			);
		});
	}
}
