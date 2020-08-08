import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

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
	keywords: [__("O nas"), __("Podsumowanie")],
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
		url: {
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
		/**
		 * Method invoked on every input change.
		 */
		function onChange(event) {
			const attribute = event.target.name;
			props.setAttributes({ [attribute]: event.target.value });
		}
		/**
		 * Method invoked after image selection.
		 */
		function onFileSelect(img) {
			props.setAttributes({ url: img.url });
		}

		/**
		 * Method invoked after removing every image.
		 */
		function onImageDelete() {
			props.setAttributes({ url: null });
		}

		function onTitleRemove() {
			props.setAttributes({ title: null });
		}

		function onDescriptionRemove() {
			props.setAttributes({ description: null });
		}

		return (
			<div class="editor-block">
				<h2>O nas - Podsumowanie (#1)</h2>
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

				{props.attributes.offerRedirection ? (
					<div class="editor-block">
						<b>Aktualnie ustawiony link na przycisku Oferta</b>
						<span>{props.attributes.offerRedirection}</span>
						{props.isSelected ? (
							<Button
								aria-label="Remove offer redirection"
								onClick={onTitleRemove}
							>
								Usuń
							</Button>
						) : null}
					</div>
				) : (
					<div class="editor-block">
						<label>Aktualnie ustawiony link na przycisku Oferta</label>
						<input type="text" name="offerRedirection" onChange={onChange} />
					</div>
				)}

				<div className="media-wrapper">
					{props.attributes.url ? (
						<div>
							<img src={props.attributes.url} />
							{props.isSelected ? (
								<Button aria-label="Remove Image" onClick={onImageDelete}>
									Remove
								</Button>
							) : null}
						</div>
					) : (
						<MediaUpload
							onSelect={onFileSelect}
							value={1}
							render={({ open }) => (
								<Button aria-label="Open Gallery" onClick={open}>
									Open Library
								</Button>
							)}
						/>
					)}
				</div>
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { url, title, description, offerRedirection } = props.attributes;

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
					<img src={url}></img>
					<button href={offerRedirection} aria-label="Przejdź do oferty">
						<span>Oferta</span>
						<i class="fa fa-arrow-right"></i>
					</button>
				</div>
			</div>
		);
	},
});
