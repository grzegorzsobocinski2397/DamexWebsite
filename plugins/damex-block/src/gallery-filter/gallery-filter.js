import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-gallery-filter", {
	/**
	 * Name of the block.
	 */
	title: __("Galery - Filtr (#2)"),
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
	keywords: [__("Galeria"), __("Filtr")],
	/**
	 * Editable attributes by the user.
	 */
	attributes: {},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: () => {
		return (
			<div class="editor-block">
				<h2>Galeria - Filtr (#2)</h2>
				<span>Filtr sam się skonfiguruje.</span>
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: () => {
		return (
			<div>
				<select class="gallery-select-element"></select>
			</div>
		);
	},
});
