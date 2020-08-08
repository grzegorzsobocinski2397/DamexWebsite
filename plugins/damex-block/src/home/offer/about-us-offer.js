import "./editor.scss";
import "./style.scss";
import { ImagesBlockCreator } from "../../helpers/images-block-creator";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";
import { TraitsHelper } from "../../helpers/traits-helper";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-offer", {
	/**
	 * Name of the block visible in the Gutenberg editor.
	 */
	title: __("Home - Oferta (#4)"),
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
	keywords: [__("O nas"), __("Oferta")],
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
		traits: {
			type: "array",
			default: [],
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		const attributesHelper = new AttributesHelper(props);
		const traitsHelper = new TraitsHelper(props);
		const imagesBlockCreator = new ImagesBlockCreator();
		const inputBlockCreator = new InputBlockCreator();
		const editableAttributes = [COMMON_ATTRIBUTES.TITLE, COMMON_ATTRIBUTES.DESCRIPTION];

		return (
			<div class="editor-block">
				<h2>Home - Oferta (#4)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
				{traitsHelper.createAddButton()}
				{traitsHelper.renderTraits()}
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
				const normalImage = <img alt={image.imgAlt} data-id={index} src={image.imgUrl} srcset={image.imgSrcSet} class="image" />;
				const hiddenImage = <img alt={image.imgAlt} data-id={index} src={image.imgUrl} srcset={image.imgSrcSet} class="image image--hidden" />;
				const nextImage = <img alt={image.imgAlt} data-id={index} src={image.imgUrl} srcset={image.imgSrcSet} class="image image--small image--next" />;
				const previousImage = <img alt={image.imgAlt} data-id={index} srcset={image.imgSrcSet} src={image.imgUrl} class="image image--small image--previous" />;

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
				<div class="images">{renderPictures()}</div>
				<div class="dots">{renderDots()}</div>
				<div class="texts">
					<div class="text-block">
						<div class="text-block__line"></div>
						<h1 class="text-block__title">{title}</h1>
						<span class="text-block__description">{description}</span>
					</div>
					<div class="traits">
						<ul class="traits__list">
							{props.attributes.traits.map((trait) => {
								return (
									<li class="trait">
										<i class="fa fa-check"></i>
										<span>{trait.value}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	},
});
