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

	$defaultAttributes = array();
	$tamaroAttributes = array();

	// Default Attributes
	// $defaultAttributes[''] = '';

	$defaultAttributes['debug'] = 'false';
	$defaultAttributes['testMode'] = 'false';
	$defaultAttributes['language'] = 'en';
	$defaultAttributes['defaultPaymentType'] = 'onetime';
	$defaultAttributes['defaultRecurringInterval'] = 'monthly';
	$defaultAttributes['minimumCustomAmountOnetime'] = 1;
	$defaultAttributes['amountsOnetime'] = [39,84,150,250];
	$defaultAttributes['minimumCustomAmountRecurringMonthly'] = 2;
	$defaultAttributes['amountsRecurringMonthly'] = [7,10,20,50];
	$defaultAttributes['salesforceCampaignID'] = '701090000005aTcAAI';
	$defaultAttributes['salesforceProduct'] = 'Standard Donation';

	// Tamaro Attributes
	// $tamaroAttributes[''] = $block_attributes[''];

	$tamaroAttributes['debug'] = $block_attributes['debug'] ? 'true' : 'false';
	$tamaroAttributes['testMode'] = $block_attributes['testMode'] ? 'true' : 'false';
	$tamaroAttributes['language'] = $block_attributes['language'];

	$tamaroAttributes['defaultPaymentType'] = $block_attributes['defaultPaymentType'];
	$tamaroAttributes['defaultRecurringInterval'] = $block_attributes['defaultRecurringInterval'];

	$tamaroAttributes['minimumCustomAmountOnetime'] = $block_attributes['minimumCustomAmountOnetime'];
	$tamaroAttributes['amountsOnetime'] = $block_attributes['amountsOnetime'];

	$tamaroAttributes['minimumCustomAmountRecurringMonthly'] = $block_attributes['minimumCustomAmountRecurringMonthly'];
	$tamaroAttributes['amountsRecurringMonthly'] = $block_attributes['amountsRecurringMonthly'];

	$tamaroAttributes['salesforceCampaignID'] = $block_attributes['salesforceCampaignID'];
	$tamaroAttributes['salesforceProduct'] = $block_attributes['salesforceProduct'];

	// prepare parameters for template
	$params = array(
		'blockAttributes' => $block_attributes,
		'tamaroAttributes' => $tamaroAttributes
	);

	// output template
	return \Timber::fetch( __DIR__ . '/templates/tamaro.twig', $params );
}
