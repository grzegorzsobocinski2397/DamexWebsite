const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

/**
 * Responsible for handling a single image adding and removal.
 */
export class ImageBlockCreator {
	/**
	 * Create block based on the status of the properties.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createBlock(props, attributesHelper) {
		return props.attributes.imgUrl ? this.createRemovableBlock(props, attributesHelper) : this.createEditableBlock(attributesHelper);
	}

	/**
	 * Creates removable block, which displays already written values in props.attributes.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createRemovableBlock(props, attributesHelper) {
		return (
			<div>
				<span>Wybrany obrazek. Po przyciśnięciu obrazka pojawi się guzik "Remove" do usunięcia obrazka.</span>
				<img src={props.attributes.imgUrl} alt={props.attributes.imgAlt} />
				{props.isSelected ? (
					<Button aria-label="Remove Image" onClick={attributesHelper.onImageDelete.bind(attributesHelper)}>
						Remove
					</Button>
				) : null}
			</div>
		);
	}

	/**
	 * Creates editable block with an <input> element for a given text value.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createEditableBlock(attributesHelper) {
		return (
			<div>
				<span>Wybierz obrazek klikając przycisk poniżej. </span>
				<MediaUpload
					onSelect={attributesHelper.onFileSelect.bind(attributesHelper)}
					value={1}
					render={({ open }) => (
						<Button aria-label="Open Gallery" onClick={open}>
							Open Library
						</Button>
					)}
				/>
			</div>
		);
	}
}
