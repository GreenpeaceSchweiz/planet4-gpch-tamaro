<?php
/**
 * Plugin Name:       Planet4 GPCH Tamaro
 * Description:       A plugin to provide the RaiseNow Tamaro Widget as a configurable block.
 * Version:           0.1.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            Greenpeace Switzerland
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       planet4-gpch-tamaro
 *
 * @package           create-block
 */

function create_block_planet4_gpch_tamaro_block_init() {
	register_block_type( __DIR__ . '/build', array( 'render_callback' => 'planet4_gpch_tamaro_render_callback' ) );
}

add_action( 'init', 'create_block_planet4_gpch_tamaro_block_init' );

function planet4_gpch_tamaro_render_callback( $block_attributes, $content ) {

	// prepare parameters for template
	$params = array( 'attributes' => $block_attributes );

	// output template
	return \Timber::fetch( __DIR__ . '/templates/tamaro.twig', $params );
}
