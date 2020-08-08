import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { Button } = wp.components;
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
	keywords: [__("Oferta"), __("Cennik")],
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
			attribute: 'id', 
			selector: ".anchor",
		},
	},

	/**
	 * Method that is called in Edit Mode.
	 */
	edit: (props) => {
		/**
		 * Method invoked on every input change.
		 */
		function onChange(event) {
			const attribute = event.target.name;
			props.setAttributes({ [attribute]: event.target.value });
		}

		function onTitleRemove() {
			props.setAttributes({ title: null });
		}

		function onAnchorRemove() {
			props.setAttributes({ anchor: null });
		}

		function onDescriptionRemove() {
			props.setAttributes({ description: null });
		}

		return (
			<div class="editor-block">
				<h2>Header</h2>
				{props.attributes.title ? (
					<div class="editor-block">
						<b>Aktualnie ustawiony tytuł</b>
						<span>{props.attributes.title}</span>
						{props.isSelected ? (
							<Button aria-label="Remove Title" onClick={onTitleRemove}>
								Usuń
							</Button>
						) : null}
					</div>
				) : (
					<div class="editor-block">
						<label>Tytuł</label>
						<input type="text" name="title" onChange={onChange} />
					</div>
				)}

				{props.attributes.description ? (
					<div class="editor-block">
						<b>Aktualnie ustawiony opis</b>
						<span>{props.attributes.description}</span>
						{props.isSelected ? (
							<Button
								aria-label="Remove Description"
								onClick={onDescriptionRemove}
							>
								Usuń
							</Button>
						) : null}
					</div>
				) : (
					<div class="editor-block">
						<label>Opis</label>
						<input type="text" name="description" onChange={onChange} />
					</div>
				)}

{props.attributes.anchor ? (
					<div class="editor-block">
						<b>Link (menu) - może być pusty</b>
						<span>{props.attributes.title}</span>
						{props.isSelected ? (
							<Button aria-label="Remove Link" onClick={onAnchorRemove}>
								Usuń link
							</Button>
						) : null}
					</div>
				) : (
					<div class="editor-block">
						<label>Link</label>
						<input type="text" name="anchor" onChange={onChange} />
					</div>
				)}
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
