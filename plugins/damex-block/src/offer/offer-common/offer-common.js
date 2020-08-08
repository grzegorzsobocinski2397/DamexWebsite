import "./editor.scss";
import "./style.scss";
import { AttributesHelper } from "../../helpers/attributes-helper.js";
import { COMMON_ATTRIBUTES } from "../../helpers/constants/common-attributes";
import { InputBlockCreator } from "../../helpers/input-block-creator";
import { TraitsHelper } from "../../helpers/traits-helper";
import { ImageBlockCreator } from "../../helpers/image-block-creator.js";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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
	/**
	 * Search phrases for Gutenberg editor.
	 */
	keywords: [__("Oferta")],
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
		imgSrcSet: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "srcset",
		},
		imgAlt: {
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
		const attributesHelper = new AttributesHelper(props);
		const inputBlockCreator = new InputBlockCreator();
		const traitsHelper = new TraitsHelper(props);
		const imageBlockCreator = new ImageBlockCreator();
		const editableAttributes = [COMMON_ATTRIBUTES.TITLE, COMMON_ATTRIBUTES.DESCRIPTION, COMMON_ATTRIBUTES.OFFER_REDIRECTION];

		return (
			<div class="editor-block">
				<h2>Oferta (#1)</h2>
				{inputBlockCreator.createBlocks(props, editableAttributes, attributesHelper)}
				{traitsHelper.createAddButton()}
				{traitsHelper.renderTraits()}
				{imageBlockCreator.createBlock(props, attributesHelper)}
			</div>
		);
	},

	/**
	 * The output of the user changes.
	 */
	save: (props) => {
		const { imgUrl, title, description, imgSrcSet, imgAlt, offerRedirection } = props.attributes;

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
					<img alt={imgAlt} srcset={imgSrcSet} src={imgUrl}></img>
					<button href={offerRedirection} aria-label="Przejdź do galerii">
						<span>GALERIA</span>
						<i class="fa fa-arrow-right"></i>
					</button>
				</div>
			</div>
		);
	},
});
