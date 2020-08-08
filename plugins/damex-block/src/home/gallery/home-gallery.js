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
registerBlockType("cgb/damex-home-gallery", {
	/**
	 * Name of the block.
	 */
	title: __("Home - Galeria (#5)"),
	/**
	 * Icon visible in the edit menu.
	 */
	icon: "archive",
	/**
	 * Category of the block. Visible in edit mode.
	 */
	category: "common",
		/**
	 * Search phrases for Gutenberg editor.
	 */
	keywords: [__("Home"), __("Galeria")],
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
				<h2>Home - Galeria (#5)</h2>
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

		function renderPictures() {
			if (images === null || images === undefined) {
				return;
			}
			const middleElementIndex = Math.floor(images.length / 2);
			return images.map((image, index) => {
				const normalImage = <img alt={image.imgAlt} data-id={index} src={image.imgUrl} srcset={image.imgSrcSet} class="image" />;
				const hiddenImage = <img alt={image.imgAlt} data-id={index} src={image.imgUrl} srcset={image.imgSrcSet} class="image image--hidden" />;
				const nextImage = <img data-id={index} alt={image.imgAlt} srcset={image.imgSrcSet} src={image.imgUrl} class="image image--small image--next" />;

				const isPictureActive = index === middleElementIndex;
				const isPictureAfterOrBeforeActive = index === middleElementIndex - 1 || index === middleElementIndex + 1;

				if (isPictureActive) {
					return normalImage;
				}

				if (isPictureAfterOrBeforeActive) {
					return nextImage;
				}

				return hiddenImage;
			});
		}

		return (
			<div className="normal-gallery">
				<div class="texts">
					<div class="text-block">
						<div class="text-block__subtext">Galeria</div>
						<h1 class="text-block__title">{title}</h1>
						<div class="text-block__description-box">
							<div class="text-block__line"></div>
							<span class="text-block__description">{description}</span>
						</div>
					</div>
				</div>

				<div class="images">
					<button aria-label="Następny obrazek" class="next-button">
						<i class="fa fa-arrow-right"></i>
					</button>
					<button aria-label="Poprzedni obrazek" class="previous-button">
						<i class="fa fa-arrow-left"></i>
					</button>

					<span class="counter"></span>
					{renderPictures()}
				</div>
			</div>
		);
	},
});
