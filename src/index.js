/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Components
 */
import './components/povluSelectPosts/povluSelectPosts';

/**
 * Internal dependencies
 */

import povlyBlockEdit from './blocks/povly-block/edit';
import povlyBlockSave from './blocks/povly-block/save';
import povlyBlockMetadata from './blocks/povly-block/povlyblock.json';

registerBlockType(povlyBlockMetadata, {
	edit: povlyBlockEdit,
	save: povlyBlockSave
});


