/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType} from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */

import povlyBlockEdit from './blocks/povly-block/edit';
import povlyBlockSave from './blocks/povly-block/save';
import povlyBlockMetadata from './blocks/povly-block/block.json';

registerBlockType(povlyBlockMetadata, {
    edit: povlyBlockEdit,
    save: povlyBlockSave
});

import postBlockMetadata from "./components/PovlySelectPosts/post-block.json";
import PovlySelectPosts from "./components/PovlySelectPosts/PovlySelectPosts";

registerBlockType(postBlockMetadata, {
    edit: function (props) {
        return (
            <PovlySelectPosts {...props}/>
        )
    },
    save: function( props ) {
        return (
            <div className={ props.className }>
                <div className="post">
                    <a href={ props.attributes.link }><h2 dangerouslySetInnerHTML={ { __html: props.attributes.title } }></h2></a>
                    <p dangerouslySetInnerHTML={ { __html: props.attributes.content } }></p>
                </div>
            </div>
        );
    }
});

import slidersBlockData from "./components/Sliders/block.json";
import Sliders from "./components/Sliders/Sliders";


registerBlockType(slidersBlockData, {
    edit: function (props) {
        return (
            <Sliders  {...props}/>
        )
    },
    save: function (props) {
        return (
            <div className={props.className}>
                Sliders
            </div>
        );
    },
});
