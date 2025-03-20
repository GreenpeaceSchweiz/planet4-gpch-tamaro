<?php
/**
 * Plugin Name:       Planet4 GPCH Tamaro
 * Description:       A plugin to provide the RaiseNow Tamaro Widget as a configurable block.
 * Version:           1.0.14
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            Greenpeace Switzerland
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       planet4-gpch-tamaro
 *
 * @package           create-block
 */

include('includes/settings.php');

function create_block_planet4_gpch_tamaro_block_init() {
	register_block_type( __DIR__ . '/build', array( 'render_callback' => 'planet4_gpch_tamaro_render_callback' ) );
}

add_action( 'init', 'create_block_planet4_gpch_tamaro_block_init' );

function planet4_gpch_tamaro_render_callback( $block_attributes, $content ) {
	$defaultAttributes = array();
	$tamaroAttributes = array();

	// Default Attributes

	$defaultAttributes['debug'] = 'false';
	$defaultAttributes['testMode'] = 'false';
	$defaultAttributes['language'] = 'en';
	$defaultAttributes['defaultPaymentType'] = 'onetime';
	$defaultAttributes['defaultRecurringInterval'] = 'monthly';
	$defaultAttributes['minimumCustomAmountOnetime'] = 1;
	$defaultAttributes['amountsOnetime'] = '39,84,150,250';
	$defaultAttributes['minimumCustomAmountRecurringMonthly'] = 2;
	$defaultAttributes['minimumCustomAmountRecurringQuarterly'] = 6;
	$defaultAttributes['minimumCustomAmountRecurringSemestral'] = 12;
	$defaultAttributes['minimumCustomAmountRecurringYearly'] = 24;
	$defaultAttributes['amountsRecurringMonthly'] = '7,10,20,50';
    $defaultAttributes['salesforceCampaignID'] = get_option('default_salesforce_campaign_id');
	$defaultAttributes['salesforceProduct'] = 'Standard Donation';

	// Tamaro Attributes

	// debug
	if ( array_key_exists('debug', $block_attributes) && $block_attributes['debug'] === true ) {
		$tamaroAttributes['debug'] = 'true';
	} else {
		$tamaroAttributes['debug'] = $defaultAttributes['debug'];
	}

	// testMode
	if ( array_key_exists('testMode', $block_attributes) && $block_attributes['testMode'] === true ) {
		$tamaroAttributes['testMode'] = 'true';
	} else {
		$tamaroAttributes['testMode'] = $defaultAttributes['testMode'];
	}

	// language
	$allowedLanguages = array( 'de', 'fr', 'it' );
	if ( array_key_exists( 'language', $block_attributes ) && in_array( $block_attributes['language'], $allowedLanguages ) ) {
		$tamaroAttributes['language'] = $block_attributes['language'];
	} else {
		$tamaroAttributes['language'] = $defaultAttributes['language'];
	}

	// defaultPaymentType
	$allowedDefaultPaymentTypes = array( 'onetime', 'recurring' );
	if ( array_key_exists( 'defaultPaymentType', $block_attributes ) && in_array( $block_attributes['defaultPaymentType'], $allowedDefaultPaymentTypes ) ) {
		$tamaroAttributes['defaultPaymentType'] = $block_attributes['defaultPaymentType'];
	} else {
		$tamaroAttributes['defaultPaymentType'] = $defaultAttributes['defaultPaymentType'];
	}

	// defaultRecurringInterval
	$allowedDefaultRecurringIntervals = array( 'monthly', 'quarterly', 'semestral', 'yearly' );
	if ( array_key_exists( 'defaultRecurringInterval', $block_attributes ) && in_array( $block_attributes['defaultRecurringInterval'], $allowedDefaultRecurringIntervals ) ) {
		$tamaroAttributes['defaultRecurringInterval'] = $block_attributes['defaultRecurringInterval'];
	} else {
		$tamaroAttributes['defaultRecurringInterval'] = $defaultAttributes['defaultRecurringInterval'];
	}

	// minimumCustomAmountOnetime
	if ( array_key_exists( 'minimumCustomAmountOnetime', $block_attributes ) && is_integer( $block_attributes['minimumCustomAmountOnetime'] ) ) {
		$tamaroAttributes['minimumCustomAmountOnetime'] = $block_attributes['minimumCustomAmountOnetime'];
	} else {
		$tamaroAttributes['minimumCustomAmountOnetime'] = $defaultAttributes['minimumCustomAmountOnetime'];
	}

	// amountsOnetime
	if ( array_key_exists( 'amountsOnetime', $block_attributes ) && is_string( $block_attributes['amountsOnetime'] ) && ( ! empty( $block_attributes['amountsOnetime'] ) ) ) {
		$tamaroAttributes['amountsOnetime'] = $block_attributes['amountsOnetime'];
	} else {
		$tamaroAttributes['amountsOnetime'] = $defaultAttributes['amountsOnetime'];
	}

	// minimumCustomAmountRecurringMonthly
	if ( array_key_exists( 'minimumCustomAmountRecurringMonthly', $block_attributes ) && is_integer( $block_attributes['minimumCustomAmountRecurringMonthly'] ) ) {
		$minimumCustomAmountRecurringMonthly                       = $block_attributes['minimumCustomAmountRecurringMonthly'];
		$tamaroAttributes['minimumCustomAmountRecurringMonthly']   = $minimumCustomAmountRecurringMonthly;
		$tamaroAttributes['minimumCustomAmountRecurringQuarterly'] = $minimumCustomAmountRecurringMonthly * 3;
		$tamaroAttributes['minimumCustomAmountRecurringSemestral'] = $minimumCustomAmountRecurringMonthly * 6;
		$tamaroAttributes['minimumCustomAmountRecurringYearly']    = $minimumCustomAmountRecurringMonthly * 12;
	} else {
		$tamaroAttributes['minimumCustomAmountRecurringMonthly']   = $defaultAttributes['minimumCustomAmountRecurringMonthly'];
		$tamaroAttributes['minimumCustomAmountRecurringQuarterly'] = $defaultAttributes['minimumCustomAmountRecurringQuarterly'];
		$tamaroAttributes['minimumCustomAmountRecurringSemestral'] = $defaultAttributes['minimumCustomAmountRecurringSemestral'];
		$tamaroAttributes['minimumCustomAmountRecurringYearly']    = $defaultAttributes['minimumCustomAmountRecurringYearly'];
	}

	// amountsRecurringMonthly
	if ( array_key_exists( 'amountsRecurringMonthly', $block_attributes ) && is_string( $block_attributes['amountsRecurringMonthly'] ) && ( ! empty( $block_attributes['amountsRecurringMonthly'] ) ) ) {
		$amountsRecurringMonthly                       = $block_attributes['amountsRecurringMonthly'];
		$tamaroAttributes['amountsRecurringMonthly']   = $amountsRecurringMonthly;
		$tamaroAttributes['amountsRecurringQuarterly'] = multiplyAmounts( $amountsRecurringMonthly, 3 );
		$tamaroAttributes['amountsRecurringSemestral'] = multiplyAmounts( $amountsRecurringMonthly, 6 );
		$tamaroAttributes['amountsRecurringYearly']    = multiplyAmounts( $amountsRecurringMonthly, 12 );
	} else {
		$defaultAmountsRecurringMonthly                = $defaultAttributes['amountsRecurringMonthly'];
		$tamaroAttributes['amountsRecurringMonthly']   = $defaultAmountsRecurringMonthly;
		$tamaroAttributes['amountsRecurringQuarterly'] = multiplyAmounts( $defaultAmountsRecurringMonthly, 3 );
		$tamaroAttributes['amountsRecurringSemestral'] = multiplyAmounts( $defaultAmountsRecurringMonthly, 6 );
		$tamaroAttributes['amountsRecurringYearly']    = multiplyAmounts( $defaultAmountsRecurringMonthly, 12 );
	}

	// salesforceCampaignID
	if ( array_key_exists( 'salesforceCampaignID', $block_attributes ) && is_string( $block_attributes['salesforceCampaignID'] ) && ( ! empty( $block_attributes['salesforceCampaignID'] ) ) ) {
		$tamaroAttributes['salesforceCampaignID'] = $block_attributes['salesforceCampaignID'];
	} else {
		$tamaroAttributes['salesforceCampaignID'] = $defaultAttributes['salesforceCampaignID'];
	}

	// salesforceProduct
	$allowedSalesforceProducts = array(
		'Standard Donation',
		'Sponsorship Agriculture',
		'Sponsorship Climate',
		'Sponsorship Fleet',
		'Sponsorship Forest',
		'Sponsorship Ocean'
	);
	if ( array_key_exists( 'salesforceProduct', $block_attributes ) && in_array( $block_attributes['salesforceProduct'], $allowedSalesforceProducts ) ) {
		$tamaroAttributes['salesforceProduct'] = $block_attributes['salesforceProduct'];
	} else {
		$tamaroAttributes['salesforceProduct'] = $defaultAttributes['salesforceProduct'];
	}

	// prepare parameters for template
	$params = array( 'tamaroAttributes' => $tamaroAttributes );

	// output template
	return \Timber::fetch( __DIR__ . '/templates/tamaro.twig', $params );
}

function multiplyAmounts(string $commaSeparatedAmounts, int $multiplicator)
{
	$amounts = explode(',', $commaSeparatedAmounts);
	$multipliedAmounts = array();

	foreach ($amounts as $amount) {
        $amount_int = intval($amount);
        if ($amount_int > 0) {
            $multipliedAmounts[] = $amount_int * $multiplicator;
        }
	}

	$multipliedCommaSeparatedAmounts = implode(',', $multipliedAmounts);

	return $multipliedCommaSeparatedAmounts;
}
