<?php

// Add a category where you can add and view blocks
function filter_block_categories_when_post_provided( $block_categories, $editor_context ) {
	if ( ! empty( $editor_context->post ) ) {
		array_push(
			$block_categories,
			array(
				'slug'  => 'povly',
				'title' => __( 'Povly', 'povly-block' ),
				'icon'  => null,
			)
		);
	}
	return $block_categories;
}

add_filter( 'block_categories_all', 'filter_block_categories_when_post_provided', 10, 2 );