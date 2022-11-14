import { TextControl, SelectControl, CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const [ isChecked, setChecked ] = useState( true );
	return (
		<div { ...useBlockProps() }>
			<CheckboxControl label="Test Mode" checked={ isChecked } onChange={ setChecked }/>
			<SelectControl label="Language" value={ attributes.language } options={ [{ label: 'German', value: 'de' }, { label: 'French', value: 'fr' }, { label: 'Italian', value: 'it' }] } onChange={ ( val ) => setAttributes( { language: val } ) }/>
			<SelectControl label="Default Payment Type" value={ attributes.defaultPaymentType } options={ [{ label: 'Onetime', value: 'onetime' }, { label: 'Recurring', value: 'recurring' }] } onChange={ ( val ) => setAttributes( { defaultPaymentType: val } ) }/>
			<SelectControl label="Default Recurring Interval" value={ attributes.defaultRecurringInterval } options={ [{ label: 'Monthly', value: 'monthly' }, { label: 'Quarterly', value: 'quarterly' }, { label: 'Semestral', value: 'semestral' }, { label: 'Yearly', value: 'yearly' }] } onChange={ ( val ) => setAttributes( { defaultRecurringInterval: val } ) }/>
		</div>
	);
}
