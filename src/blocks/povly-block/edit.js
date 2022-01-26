import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';

const MY_TEMPLATE =  [
	["core/image", {}],
	["core/heading", {placeholder: "Giveaway Title"}],
	["core/paragraph", {placeholder: "Giveaway Description", className: 'test-block' }],
	["core/button", {placeholder: "Call to Action"}],
];

export default function Edit() {
	return (
		<div {...useBlockProps()}>
			<InnerBlocks
				template={MY_TEMPLATE}
				allowedBlocks={["povly-block/social-row"]}
			/>
		</div>
	);
}
