const { Button } = wp.components;

/**
 * Class that handles creating editable and removable blocks for <input> elements in the Gutenberg editor.
 */
export class InputBlockCreator {
	/**
	 * Create editable/removable blocks for <input> elements with text values.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attribute List of attributes, which contain all the information required for setting up these blocks.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createBlocks(props, attributes, attributesHelper) {
		return attributes.map((attribute) => {
			const editableBlock = this.createEditableBlock(attribute, attributesHelper);
			const removableBlock = this.createRemovableBlock(props, attribute, attributesHelper);
			return props.attributes[attribute.key] ? removableBlock : editableBlock;
		});
	}

	/**
	 * Creates removable block, which displays already written values in props.attributes.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attribute Attribute, which contains all the information required for setting up this block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createRemovableBlock(props, attribute, attributesHelper) {
		return (
			<div class="editor-block">
				<b>{attribute.description}</b>
				<span>{props.attributes[attribute.key]}</span>
				{props.isSelected ? (
					<Button aria-label={attribute.ariaLabel} name={attribute.key} onClick={attributesHelper.onAttributeRemove.bind(attributesHelper)}>
						Usuń
					</Button>
				) : null}
			</div>
		);
	}

	/**
	 * Creates editable block with an <input> element for a given text value.
	 * @param attribute Attribute, which contains all the information required for setting up this block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createEditableBlock(attribute, attributesHelper) {
		return (
			<div class="editor-block">
				<label>{attribute.title}</label>
				<input type="text" name={attribute.key} onChange={attributesHelper.onChange.bind(attributesHelper)} />
			</div>
		);
	}
}
