import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-references", {
	/**
	 * Name of the block.
	 */
	title: __("O nas - Referencje (#2)"),
	/**
	 * Icon visible in the edit menu.
	 */
	icon: "archive",
	/**
	 * Category of the block. Visible in edit mode.
	 */
	category: "common",
	keywords: [__("O nas"), __("Referencje")],
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
		function onFileSelect(images) {
			const mappedImages = images.map((image) => {
				return { imgUrl: image.url, imgAlt: image.alt };
			});
			props.setAttributes({ images: mappedImages });
		}

		/**
		 * Method invoked after removing every image.
		 */
		function onImageDelete() {
			props.setAttributes({ images: null });
		}

		function onTitleRemove() {
			props.setAttributes({ title: null });
		}

		function onDescriptionRemove() {
			props.setAttributes({ description: null });
		}

		return (
			<div class="editor-block">
				<h2>O nas - Referencje (#2)</h2>
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

				<div className="media-wrapper">
					{props.attributes.images ? (
						<div>
							{props.attributes.images.map((image) => {
								return <img src={image.imgUrl} alt={image.imgAlt} />;
							})}
							{props.isSelected ? (
								<Button aria-label="Remove Image" onClick={onImageDelete}>
									Remove
								</Button>
							) : null}
						</div>
					) : (
						<MediaUpload
							multiple={true}
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
				const normalImage = (
					<img data-id={index} src={image.imgUrl} class="image" />
				);
				const hiddenImage = (
					<img data-id={index} src={image.imgUrl} class="image image--hidden" />
				);
				const nextImage = (
					<img
						data-id={index}
						src={image.imgUrl}
						class="image image--small image--next"
					/>
				);
				const previousImage = (
					<img
						data-id={index}
						src={image.imgUrl}
						class="image image--small image--previous"
					/>
				);

				const isPictureActive = index === middleElementIndex;
				const isPictureAfterOrBeforeActive =
					index === middleElementIndex - 1 || index === middleElementIndex + 1;

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
			<div
				className="dot-gallery"
				class="dot-gallery wp-block-cgb-damex-about-us-references"
			>
				<a class="anchor" id="referencje"></a>
				<div class="images">{renderPictures()}</div>
				<div class="dots">{renderDots()}</div>
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
