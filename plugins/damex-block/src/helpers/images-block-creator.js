const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

/**
 * Responsible for handling many images adding and removal.
 */
export class ImagesBlockCreator {
	/**
	 * Create block based on the status of the properties.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createBlocks(props, attributesHelper) {
		return props.attributes.images ? this.createRemovableBlock(props, attributesHelper) : this.createEditableBlock(attributesHelper);
	}

	/**
	 * Creates removable block, which displays already written values in props.attributes.
	 * @param props Contains attributes of the Gutenberg block.
	 * @param attributesHelper Class responsible for handling attributes saving/removing/editing.
	 */
	createRemovableBlock(props, attributesHelper) {
		return (
			<div>
				{props.attributes.images.map((image) => {
					return <img src={image.imgUrl} alt={image.imgAlt} />;
				})}
				{props.isSelected ? (
					<Button name="images" aria-label="Remove Image" onClick={attributesHelper.onAttributeRemove.bind(attributesHelper)}>
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
			<MediaUpload
				multiple={true}
				onSelect={attributesHelper.onFilesSelect.bind(attributesHelper)}
				value={1}
				render={({ open }) => (
					<Button aria-label="Open Gallery" onClick={open}>
						Open Library
					</Button>
				)}
			/>
		);
	}
}
