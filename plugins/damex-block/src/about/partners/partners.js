import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;

/**
 * Register the Block Type so it can be seen by the user.
 */
registerBlockType("cgb/damex-about-us-partners", {
	/**
	 * Name of the block.
	 */
	title: __("O nas - Partnerzy (#3)"),
	/**
	 * Icon visible in the edit menu.
	 */
	icon: "archive",
	/**
	 * Category of the block. Visible in edit mode.
	 */
	category: "common",
	keywords: [__("O nas"), __("Partnerzy")],
	attributes: {
		blocks: {
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
			const index = event.target.getAttribute("data-index");
			const blocks = props.attributes.blocks;
			const block = {...blocks[index], link: event.target.value}
			blocks[index] = block;
			
			props.setAttributes({ blocks: [...blocks] });
		}

		/**
		 * Method invoked after image selection.
		 */
		function onFileSelect(images) {
			const blocks = images.map((image) => {
				return { link: "", url: image.url };
			});
			props.setAttributes({ blocks });
		}

		/**
		 * Method invoked after removing every image.
		 */
		function onBlocksDelete() {
			props.setAttributes({ blocks: null });
		}

		function onBlockDelete(event) {
			const src = event.target.parentElement.querySelector("img").src;
			const blocks = props.attributes.blocks.filter(
				(block) => block.url !== src
			);
			props.setAttributes({ blocks: blocks });
		}

		return (
			<div class="editor-block">
				<h2>O nas - Partnerzy (#3)</h2>

				<div className="media-wrapper">
					{props.attributes.blocks ? (
						<div>
							{props.attributes.blocks.map((block, index) => {
								return (
									<div class="edit-block">
										<img src={block.url} />
										<label>Link do strony partnera</label>
										<input data-index={index} onChange={onChange} value={block.link}/>
										<Button aria-label="Remove Block" onClick={onBlockDelete}>Usuń Partnera</Button>
									</div>
								);
							})}
							{props.isSelected ? (
								<Button aria-label="Remove Blocks" onClick={onBlocksDelete}>
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
									Open Gallery
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
		const blocks = props.attributes.blocks;

		function renderPictures() {
			if (blocks === null || blocks === undefined) {
				return;
			}
			const MAX_BLOCKS_COUNT = 6;
			return blocks.map((block, index) => {
				const classes =
					index >= MAX_BLOCKS_COUNT
						? "partner-link partner-link--hidden"
						: "partner-link";

				return (
					<div class={classes}>
						<a target="_blank" href={'' + block.link} rel="noopener noreferrer">
							<img src={block.url} />
						</a>
					</div>
				);
			});
		}

		return (
			<div >
				<a class="anchor" id="partnerzy"></a>
				<div class="line"></div>
				<span class="title">Partnerzy</span>

				<div class="images">
					<button aria-label="Kolejny obrazek" class="next-button">
						<i class="fa fa-arrow-right"></i>
					</button>
					<button aria-label="Poprzedni obrazek" class="previous-button">
						<i class="fa fa-arrow-left"></i>
					</button>
					{renderPictures()}
				</div>
			</div>
		);
	},
});
