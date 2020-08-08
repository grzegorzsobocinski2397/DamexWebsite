import "./editor.scss";
import "./style.scss";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-offer-header-description", {
	/**
	 * Name of the block.
	 */
	title: __("Oferta - Opis tabeli"),
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
	keywords: [__("Oferta"), __("Cennik")],
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
		anchor: {
			type: "string",
			source: "attribute",
			attribute: "id",
			selector: ".anchor",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		const attributesHelper = new AttributesHelper(props);
		const inputBlockCreator = new InputBlockCreator();
		const editableAttributes = [COMMON_ATTRIBUTES.TITLE, COMMON_ATTRIBUTES.DESCRIPTION, COMMON_ATTRIBUTES.ANCHOR];

		return (
			<div class="editor-block">
				<h2>Nagłówek</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { title, description, anchor } = props.attributes;

		return (
			<div class="wp-block-cgb-damex-offer-header-description">
				<a class="anchor" id={anchor ? anchor : null}></a>
				<div class="texts">
					<div class="text-block">
						<div class="text-block__line"></div>
						<h1 class="text-block__title">{title}</h1>
						<span class="text-block__description">{description}</span>
					</div>
				</div>
			</div>
		);
	},
});
