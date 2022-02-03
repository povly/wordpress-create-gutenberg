/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType} from '@wordpress/blocks';
import {RichText} from "@wordpress/block-editor";

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

// registerBlockType(postBlockMetadata, {
//     edit: function (props) {
//         return (
//             <PovlySelectPosts {...props}/>
//         )
//     },
//     save: function (props) {
//         return (
//             <div className={props.className}>
//                 <div className="post">
//                     <a href={props.attributes.link}><h2 dangerouslySetInnerHTML={{__html: props.attributes.title}}></h2>
//                     </a>
//                     <div dangerouslySetInnerHTML={{__html: props.attributes.content}}></div>
//                 </div>
//             </div>
//         );
//     }
// });

import slidersBlockData from "./components/Sliders/block.json";
import Sliders from "./components/Sliders/Sliders";


registerBlockType(slidersBlockData, {
    edit: function (props) {
        return (
            <Sliders  {...props}/>
        )
    },
    save: function (props) {
        console.log(props.attributes.slides);
        return (
            <div className={props.className}>
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {props.attributes.slides.map((slide) => {
                            return <div className="swiper-slide">
                                <RichText.Content tagName="h2" value={slide.text}/>
                            </div>
                        })}

                    </div>
                    <div className="swiper-button-prev">налево</div>
                    <div className="swiper-button-next">направо</div>
                </div>
            </div>
        );
    },
});
