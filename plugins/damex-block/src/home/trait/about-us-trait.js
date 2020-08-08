import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-trait", {
	/**
	 * Name of the block visible in the Gutenberg editor.
	 */
	title: __("Home - Blok (#3)"),
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
	keywords: [__("O nas - blok"), __("About us - block")],
	
	attributes: {
		title: {
			type: "string",
			source: "text",
			selector: ".about-us-trait__title",
		},
		description: {
			type: "string",
			source: "text",
			selector: ".about-us-trait__description",
		},
		icon: {
			type: "string",
			source: "attribute",
			selector: "i",
			attribute: "class",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		function onChange(event) {
			const attribute = event.target.name;

			props.setAttributes({
				[attribute]: event.target.value,
			});
		}

		function onReset() {
			props.setAttributes({ description: null, icon: null, title: null });
		}

		const { description, icon, title } = props.attributes;

		return (
			<div class="media-wrapper">
				<h2>Home - Block (#3)</h2>
				{description && icon && title ? (
					<div>
						<b>
							Zaznacz ten blok i przyciśnij przycisk poniżej aby usunąć wybrany
							tekst.
						</b>
						<span>{title}</span>
						<span>{description}</span>
						<span>{icon}</span>
						{props.isSelected ? (
							<Button aria-label="Reset" onClick={onReset}>Remove</Button>
						) : null}
					</div>
				) : (
					<div class="editor-block">
						<label>Tytuł</label>
						<input type="text" name="title" onChange={onChange} />
						<label>Opis</label>
						<input type="text" name="description" onChange={onChange} />
						<label>Ikona</label>
						<input type="text" name="icon" onChange={onChange} />
					</div>
				)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		return (
			<div>
				<i class={props.attributes.icon}></i>
				<span class="about-us-trait__title">{props.attributes.title}</span>
				<span class="about-us-trait__description">
					{props.attributes.description}
				</span>
			</div>
		);
	},
});
