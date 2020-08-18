import "./style.scss";
import { ImagesBlockCreator } from "../../helpers/images-block-creator";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-references", {
	/**
	 * Name of the block.
	 */
	title: __("O nas - Referencje (#2)"),
	/**
	 * Icon visible in the edit menu.
	 */
	icon: "archive",
	/**
	 * Category of the block. Visible in edit mode.
	 */
	category: "common",

	keywords: [__("O nas"), __("Referencje")],
	/**
	 * Editable attributes by the user.
	 */
	attributes: {
		title: {
			type: "string",
			source: "text",
			selector: ".text-block__title",
		},
		description: {
			type: "string",
			source: "text",
			selector: ".text-block__description",
		},
		images: {
			type: "array",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		const attributesHelper = new AttributesHelper(props);
		const imagesBlockCreator = new ImagesBlockCreator();
		const inputBlockCreator = new InputBlockCreator();
		const editableAttributes = [COMMON_ATTRIBUTES.TITLE, COMMON_ATTRIBUTES.DESCRIPTION];

		return (
			<div class="editor-block">
				<h2>O nas - Referencje (#2)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
				{imagesBlockCreator.createBlocks(props, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { images, title, description } = props.attributes;

		function renderDots() {
			if (images === null || images === undefined) {
				return;
			}
			const middleElementIndex = Math.floor(images.length / 2);
			return images.map((image, index) => {
				const normalDot = <div data-id={index} class="dot"></div>;
				const activeDot = <div data-id={index} class="dot dot--active"></div>;
				return index === middleElementIndex ? activeDot : normalDot;
			});
		}

		function renderPictures() {
			if (images === null || images === undefined) {
				return;
			}
			const middleElementIndex = Math.floor(images.length / 2);
			return images.map((image, index) => {
				const normalImage = <img data-id={index} src={image.imgUrl} class="image" />;
				const hiddenImage = <img data-id={index} src={image.imgUrl} class="image image--hidden" />;
				const nextImage = <img data-id={index} src={image.imgUrl} class="image image--small image--next" />;
				const previousImage = <img data-id={index} src={image.imgUrl} class="image image--small image--previous" />;

				const isPictureActive = index === middleElementIndex;
				const isPictureAfterOrBeforeActive = index === middleElementIndex - 1 || index === middleElementIndex + 1;

				if (isPictureActive) {
					return normalImage;
				}

				if (isPictureAfterOrBeforeActive) {
					return index === middleElementIndex - 1 ? previousImage : nextImage;
				}

				return hiddenImage;
			});
		}

		return (
			<div className="dot-gallery">
				<a class="anchor" id="referencje"></a>
				<div class="texts texts--padding-bottom">
					<div class="text-block">
						<div class="text-block__line"></div>
						<h1 class="text-block__title">{title}</h1>
						<span class="text-block__description">{description}</span>
					</div>
				</div>
				<div class="images">{renderPictures()}</div>
				<div class="dots">{renderDots()}</div>
			</div>
		);
	},
});
