import {
	Tip,
	TextControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div { ...useBlockProps() }>
			<Tip>
				The widget will use the default values for the settings, if they
				are not set here.
			</Tip>
			<br />
			<CheckboxControl
				label="Debug"
				checked={ attributes.debug }
				onChange={ ( val ) => setAttributes( { debug: val } ) }
				help="Default value: false."
			/>
			<CheckboxControl
				label="Test Mode"
				checked={ attributes.testMode }
				onChange={ ( val ) => setAttributes( { testMode: val } ) }
				help="Default value: false."
			/>
			<br />
			<SelectControl
				label="Language"
				value={ attributes.language }
				options={ [
					{
						label: 'Select an option ...',
						value: '',
						disabled: false,
					},
					{ label: 'German', value: 'de' },
					{ label: 'French', value: 'fr' },
					{ label: 'Italian', value: 'it' },
				] }
				onChange={ ( val ) => setAttributes( { language: val } ) }
				help="Default value: en."
			/>
			<SelectControl
				label="Default Payment Type"
				value={ attributes.defaultPaymentType }
				options={ [
					{
						label: 'Select an option ...',
						value: '',
						disabled: false,
					},
					{ label: 'Onetime', value: 'onetime' },
					{ label: 'Recurring', value: 'recurring' },
				] }
				onChange={ ( val ) =>
					setAttributes( { defaultPaymentType: val } )
				}
				help="Default value: onetime."
			/>
			<SelectControl
				label="Default Recurring Interval"
				value={ attributes.defaultRecurringInterval }
				options={ [
					{
						label: 'Select an option ...',
						value: '',
						disabled: false,
					},
					{ label: 'Monthly', value: 'monthly' },
					{ label: 'Quarterly', value: 'quarterly' },
					{ label: 'Semestral', value: 'semestral' },
					{ label: 'Yearly', value: 'yearly' },
				] }
				onChange={ ( val ) =>
					setAttributes( { defaultRecurringInterval: val } )
				}
				help="Default value: monthly."
			/>

			<TextControl
				label="Minimum Custom Amount Onetime"
				value={ attributes.minimumCustomAmountOnetime }
				onChange={ ( val ) =>
					setAttributes( {
						minimumCustomAmountOnetime: parseInt( val ),
					} )
				}
				help="Minimum custom amount which can be set on the form for onetime donations. Default value: 1."
			/>
			<TextControl
				label="Amounts Onetime"
				value={ attributes.amountsOnetime }
				onChange={ ( val ) => setAttributes( { amountsOnetime: val } ) }
				help="Predefined amounts which appear on the form for onetime donations (comma separated list, example: 10,20,30,40). Default value: 39,84,150,250."
			/>
			<TextControl
				label="Minimum Custom Amount Recurring (monthly)"
				value={ attributes.minimumCustomAmountRecurringMonthly }
				onChange={ ( val ) =>
					setAttributes( {
						minimumCustomAmountRecurringMonthly: parseInt( val ),
					} )
				}
				help="Minimum custom amount which can be set on the form for monthly recurring donations. Default value: 2."
			/>
			<TextControl
				label="Amounts Recurring (monthly)"
				value={ attributes.amountsRecurringMonthly }
				onChange={ ( val ) =>
					setAttributes( { amountsRecurringMonthly: val } )
				}
				help="Predefined amounts which appear on the form for monthly recurring donations (comma separated list, example: 5,10,15,20). Default value: 7,10,20,50."
			/>

			<TextControl
				label="Salesforce Campaign ID"
				value={ attributes.salesforceCampaignID }
				onChange={ ( val ) =>
					setAttributes( { salesforceCampaignID: val } )
				}
				help="Default value: 70109000001JUJIAA4."
			/>
			<SelectControl
				label="Salesforce Product"
				value={ attributes.salesforceProduct }
				options={ [
					{
						label: 'Select an option ...',
						value: '',
						disabled: false,
					},
					{ label: 'Standard Donation', value: 'Standard Donation' },
					{
						label: 'Sponsorship Agriculture',
						value: 'Sponsorship Agriculture',
					},
					{
						label: 'Sponsorship Climate',
						value: 'Sponsorship Climate',
					},
					{ label: 'Sponsorship Fleet', value: 'Sponsorship Fleet' },
					{
						label: 'Sponsorship Forest',
						value: 'Sponsorship Forest',
					},
					{ label: 'Sponsorship Ocean', value: 'Sponsorship Ocean' },
				] }
				onChange={ ( val ) =>
					setAttributes( { salesforceProduct: val } )
				}
				help="Default value: Standard Donation."
			/>
		</div>
	);
}
