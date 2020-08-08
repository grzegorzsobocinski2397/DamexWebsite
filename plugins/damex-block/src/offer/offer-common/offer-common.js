import "./editor.scss";
import { imageSizer } from "../../image-sizer";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-offer-common", {
	/**
	 * Name of the block.
	 */
	title: __("Oferta (#1)"),
	/**
	 * Icon visible in the edit menu.
	 */
	icon: "archive",
	/**
	 * Category of the block. Visible in edit mode.
	 */
	category: "common",
	keywords: [__("Oferta")],
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
		link: {
			type: "string",
			source: "text",
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src",
			default: "",
		},
		srcset: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "srcset",
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt",
		},
		traits: {
			type: "array",
			default: [],
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
			const srcset = imageSizer(img.sizes);
			props.setAttributes({ url: img.url, srcset, alt: img.alt });
		}

		/**
		 * Method invoked after removing every image.
		 */
		function onImageDelete() {
			props.setAttributes({ url: null });
		}

		/**
		 * Method invoked on trait change. Modify existing one or add another.
		 */
		function onTraitChange(event) {
			const traits = props.attributes.traits;
			const modifiedTrait = traits.find(
				(trait) => trait.name === event.target.name
			);
			if (modifiedTrait !== undefined) {
				modifiedTrait.value = event.target.value;
				const filteredTraits = traits.filter(
					(trait) => trait.name !== event.target.name
				);
				props.setAttributes({ traits: [...filteredTraits, modifiedTrait] });
			} else {
				const trait = { name: event.target.name, value: event.target.value };
				props.setAttributes({ traits: [...props.attributes.traits, trait] });
			}
		}

		/**
		 * Create new trait and add it to the array.
		 */
		function addNewTrait() {
			const trait = {
				name: `trait-${props.attributes.traits.length}`,
				value: "",
			};
			props.setAttributes({ traits: [...props.attributes.traits, trait] });
		}

		function removeTrait(event) {
			const name = event.target.parentElement.querySelector("input").name;
			const traits = props.attributes.traits.filter(
				(trait) => trait.name !== name
			);
			props.setAttributes({ traits });
		}

		function onTitleRemove() {
			props.setAttributes({ title: null });
		}

		function onDescriptionRemove() {
			props.setAttributes({ description: null });
		}

		return (
			<div class="editor-block">
				<h2>Oferta (#1)</h2>
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

				<Button aria-label="Add Trait" onClick={addNewTrait}>
					Dodaj kolejną zaletę
				</Button>
				{props.attributes.traits.map((trait, index) => {
					return (
						<div class="trait-edit">
							<input
								name={trait.name}
								type="text"
								value={trait.value}
								onChange={onTraitChange}
							/>
							<Button aria-label="Remove Trait" onClick={removeTrait}>
								Usuń zaletę
							</Button>
						</div>
					);
				})}
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
		const { url, title, description, srcset, alt, offerRedirection } = props.attributes;

		return (
			<div>
				<div class="content">
					<div class="texts">
						<div class="text-block">
							<div class="text-block__line"></div>
							<h1 class="text-block__title">{title}</h1>
							<span class="text-block__description">{description}</span>
						</div>
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

				<div class="image-container">
					<img alt={alt} srcset={srcset} src={url}></img>
					<button href={offerRedirection} aria-label="Przejdź do galerii">
						<span>GALERIA</span>
						<i class="fa fa-arrow-right"></i>
					</button>
				</div>
			</div>
		);
	},
});
