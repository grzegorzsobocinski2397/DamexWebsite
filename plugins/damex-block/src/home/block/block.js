import "./editor.scss";
import "./style.scss";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";
import { ImageBlockCreator } from "../../helpers/image-block-creator";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/block-damex-block", {
	/**
	 * Name of the block visible in the Gutenberg editor.
	 */
	title: __("Home - Intro (#1)"),
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
	keywords: [__("Main Page"), __("Slider")],
	/**
	 * Editable attributes by the user.
	 */
	attributes: {
		imgUrl: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
		},
		imgAlt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img",
		},
		title: {
			type: "string",
			source: "text",
			selector: ".container__title",
		},
		description: {
			type: "string",
			source: "text",
			selector: ".container__content",
		},
		offerRedirection: {
			type: "string",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		const attributesHelper = new AttributesHelper(props);
		const imageBlockCreator = new ImageBlockCreator();
		const inputBlockCreator = new InputBlockCreator();
		const editableAttributes = [COMMON_ATTRIBUTES.TITLE, COMMON_ATTRIBUTES.DESCRIPTION, COMMON_ATTRIBUTES.OFFER_REDIRECTION];

		return (
			<div className="media-wrapper">
				<h2>Home - Intro (#1)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
				{imageBlockCreator.createBlock(props, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { imgUrl, imgAlt, title, description, offerRedirection } = props.attributes;

		return (
			<div>
				<img alt={imgAlt} class="image-block" src={imgUrl} />
				<div class="container">
					<span class="container__title">{title}</span>
					<p class="container__content">{description}</p>
					<button aria-label="Przycisk do oferty" href={offerRedirection}>
						Oferta
					</button>
				</div>
			</div>
		);
	},
});
