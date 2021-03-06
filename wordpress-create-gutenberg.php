<?php
/**
 * Plugin Name:       Povly Block
 * Description:       Povly Blocks
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       povly-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_povly_block_block_init() {
	register_block_type( __DIR__ . '\src\blocks\povly-block' );
}
add_action( 'init', 'create_block_povly_block_block_init' );

// add filters
require_once __DIR__ . '/inc/filters.php';