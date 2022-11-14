import { TextControl, SelectControl, CheckboxControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<CheckboxControl label="Debug" checked={ attributes.debug } onChange={ ( val ) => setAttributes( { debug: val } ) }/>
			<CheckboxControl label="Test Mode" checked={ attributes.testMode } onChange={ ( val ) => setAttributes( { testMode: val } ) }/>
			<SelectControl label="Language" value={ attributes.language } options={ [{ label: 'German', value: 'de' }, { label: 'French', value: 'fr' }, { label: 'Italian', value: 'it' }] } onChange={ ( val ) => setAttributes( { language: val } ) }/>
			<SelectControl label="Default Payment Type" value={ attributes.defaultPaymentType } options={ [{ label: 'Onetime', value: 'onetime' }, { label: 'Recurring', value: 'recurring' }] } onChange={ ( val ) => setAttributes( { defaultPaymentType: val } ) }/>
			<SelectControl label="Default Recurring Interval" value={ attributes.defaultRecurringInterval } options={ [{ label: 'Monthly', value: 'monthly' }, { label: 'Quarterly', value: 'quarterly' }, { label: 'Semestral', value: 'semestral' }, { label: 'Yearly', value: 'yearly' }] } onChange={ ( val ) => setAttributes( { defaultRecurringInterval: val } ) }/>
			<TextControl label="Minimum Custom Amount Onetime" value={ attributes.minimumCustomAmountOnetime } onChange={ ( val ) => setAttributes( { minimumCustomAmountOnetime: val } ) }/>
			<TextControl label="Amounts Onetime" value={ attributes.amountsOnetime } onChange={ ( val ) => setAttributes( { amountsOnetime: val } ) }/>
			<TextControl label="Minimum Custom Amount Recurring (monthly)" value={ attributes.minimumCustomAmountRecurringMonthly } onChange={ ( val ) => setAttributes( { minimumCustomAmountRecurringMonthly: val } ) }/>
			<TextControl label="Amounts Recurring (monthly)" value={ attributes.amountsRecurringMonthly } onChange={ ( val ) => setAttributes( { amountsRecurringMonthly: val } ) }/>
			<TextControl label="Salesforce Campaign ID" value={ attributes.salesforceCampaignID } onChange={ ( val ) => setAttributes( { salesforceCampaignID: val } ) }/>
			<SelectControl label="Salesforce Product" value={ attributes.salesforceProduct } options={ [{ label: 'Standard Donation', value: 'Standard Donation' }, { label: 'Sponsorship Agriculture', value: 'Sponsorship Agriculture' }, { label: 'Sponsorship Climate', value: 'Sponsorship Climate' }, { label: 'Sponsorship Fleet', value: 'Sponsorship Fleet' }, { label: 'Sponsorship Forest', value: 'Sponsorship Forest' }, { label: 'Sponsorship Ocean', value: 'Sponsorship Ocean' }] } onChange={ ( val ) => setAttributes( { salesforceProduct: val } ) }/>
		</div>
	);
}
