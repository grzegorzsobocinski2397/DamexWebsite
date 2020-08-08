import { imageSizer } from "../image-sizer";

/**
 * Class responsible for handling attributes saving/removing/editing.
 */
export class AttributesHelper {
	/**
	 * Save the props from the block to be reusable in the class.
	 * @param props Attributes props of a block.
	 */
	constructor(props) {
		this.props = props;
	}

	/**
	 * On image selection. Save the URL and alt description.
	 * @param img Saved image that contains information about picture sizes, descriptions and sources.
	 */
	onFileSelect(img) {
		this.props.setAttributes({ imgUrl: img.url, imgAlt: img.alt });
	}

	/**
	 * Method invoked on input changes. Takes the 'name' attribute and sets it on the props.
	 * @param event Input event invoked on the <input> element.
	 */
	onChange(event) {
		const attribute = event.target.name;
		this.props.setAttributes({ [attribute]: event.target.value });
	}

	/**
	 * Removes given attribute from props.
	 * @param event Click event on the Button.
	 */
	onAttributeRemove(event) {
		const attribute = event.target.name;
		this.props.setAttributes({ [attribute]: null });
	}

	/**
	 * Removes image from props.
	 */
	onImageDelete() {
		this.props.setAttributes({ imgUrl: null, imgAlt: null });
	}

	/**
	 * Invoked after selecting more than one image. Used for galleries.
	 * @param images  Saved image that contain information about picture sizes, descriptions and sources.
	 */
	onFilesSelect(images) {
		const mappedImages = images.map((image) => {
			const srcset = imageSizer(image.sizes);
			return { imgUrl: image.url, imgAlt: image.alt, imgSrcSet: srcset };
		});
		this.props.setAttributes({ images: mappedImages });
	}
}
