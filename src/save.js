/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<div>{ attributes.language }</div>
			<div>{ attributes.defaultPaymentType }</div>
			<div>{ attributes.defaultRecurringInterval }</div>
			<div className="rnw-widget-container"></div>
			<script src="https://tamaro.raisenow.com/greenpeace-ch-default/latest/widget.js"></script>
			<script src="https://tamaro.greenpeace.ch/tamaro_standard_de.js"></script>
		</div>
	);
}
