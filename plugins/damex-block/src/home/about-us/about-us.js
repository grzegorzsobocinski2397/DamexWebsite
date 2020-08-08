import "./style.scss";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us", {
	/**
	 * Name of the block visible in the Gutenberg editor.
	 */
	title: __("Home - Główna informacja (#2)"),
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
	keywords: [__("O nas"), __("About us")],
	/**
	 * Editable attributes by the user.
	 */
	attributes: {
		description: {
			type: "string",
			source: "text",
			selector: ".text-block__description",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		const attributesHelper = new AttributesHelper(props);
		const inputBlockCreator = new InputBlockCreator()
		const editableAttributes = [COMMON_ATTRIBUTES.DESCRIPTION];

		return (
			<div className="media-wrapper">
				<h2>Home - Główna Informacja (#2)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		return (
			<div>
				<div class="text-block">
					<div class="text-block__line"></div>
					<h1 class="text-block__title">O nas</h1>
					<span class="text-block__description">{props.attributes.description}</span>
				</div>
			</div>
		);
	},
});
