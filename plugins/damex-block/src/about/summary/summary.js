
import "./style.scss";
import { ImageBlockCreator } from "../../helpers/image-block-creator";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-summary", {
	/**
	 * Name of the block.
	 */
	title: __("O nas - Podsumowanie (#1)"),
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
	keywords: [__("O nas"), __("Podsumowanie")],
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
		imgUrl: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
			default: "",
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
			<div class="editor-block">
				<h2>O nas - Podsumowanie (#1)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
				{imageBlockCreator.createBlock(props, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { imgUrl, title, description, offerRedirection } = props.attributes;

		return (
			<div class="wp-block-cgb-damex-about-us-summary">
				<a class="anchor" id="historia"></a>
				<div class="texts">
					<div class="text-block">
						<div class="text-block__line"></div>
						<h1 class="text-block__title">{title}</h1>
						<span class="text-block__description">{description}</span>
					</div>
				</div>
				<div class="image-container">
					<img src={imgUrl}></img>
					<button href={offerRedirection} aria-label="Przejdź do oferty">
						<span>Oferta</span>
						<i class="fa fa-arrow-right"></i>
					</button>
				</div>
			</div>
		);
	},
});
