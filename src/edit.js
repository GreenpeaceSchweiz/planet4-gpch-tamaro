import {
    Tip,
    TextControl,
    TextareaControl,
    SelectControl,
    CheckboxControl,
    ToggleControl,
    Button, Panel, PanelBody, PanelRow,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import {useBlockProps} from '@wordpress/block-editor';
import CustomField from "./components/CustomField/CustomField";

const MIN_FIELDS = 0;
const MAX_FIELDS = 5;

export default function Edit({attributes, setAttributes}) {
    const {
        debug,
        testMode,
        language,
        defaultPaymentType,
        defaultRecurringInterval,
        minimumCustomAmountOnetime,
        amountsOnetime,
        minimumCustomAmountRecurringMonthly,
        amountsRecurringMonthly,
        preselectCoverTransactionFees,
        salesforceCampaignID,
        salesforceProduct,
        useAmountDescriptions,
        amountDescriptionsOnetime = {},
        amountDescriptionCustomOnetime,
        amountDescriptionsRecurringMonthly = {},
        amountDescriptionCustomRecurring,
        useCustomFields,
        customFieldsSectionTitle,
        customFieldsSectionText,
        customFieldsPlacement,
        customFields = [],
    } = attributes;

    const addCustomField = () => {
        if (customFields.length >= MAX_FIELDS) return;

        const newField = {
            fieldType: 'text',
            fieldLabel: '',
            fieldName: '',
            options: [''],
        };

        setAttributes({
            customFields: [...customFields, newField],
        });
    };

    const updateCustomField = (index, newField) => {
        const nextFields = [...customFields];
        nextFields[index] = newField;
        setAttributes({customFields: nextFields});
    };

    const removeCustomField = (index) => {
        if (customFields.length <= MIN_FIELDS) return;

        const nextFields = customFields.filter((_, i) => i !== index);
        setAttributes({customFields: nextFields});
    };

    return (
        <div {...useBlockProps()}>
            <Tip>
                The widget will use the default values for the settings, if they
                are not set here.
            </Tip>
            <br />
            <Panel header="Tamaro Donation Form Settings">
                <PanelBody title="General Settings" initialOpen={ true }>
                    <PanelRow>
                        <TextControl
                            label="Salesforce Campaign ID"
                            value={ salesforceCampaignID }
                            onChange={ ( val ) =>
                                setAttributes( { salesforceCampaignID: val } )
                            }
                            help="Uses a default value if not set. The default value can be set in plugin options."
                        />
                    </PanelRow>

                    <PanelRow>
                        <SelectControl
                            label="Salesforce Product"
                            value={ salesforceProduct }
                            options={ [
                                {
                                    label: 'Select an option ...',
                                    value: '',
                                    disabled: false,
                                },
                                {
                                    label: 'Standard Donation',
                                    value: 'Standard Donation',
                                },
                                {
                                    label: 'Sponsorship Agriculture',
                                    value: 'Sponsorship Agriculture',
                                },
                                {
                                    label: 'Sponsorship Climate',
                                    value: 'Sponsorship Climate',
                                },
                                {
                                    label: 'Sponsorship Fleet',
                                    value: 'Sponsorship Fleet',
                                },
                                {
                                    label: 'Sponsorship Forest',
                                    value: 'Sponsorship Forest',
                                },
                                {
                                    label: 'Sponsorship Ocean',
                                    value: 'Sponsorship Ocean',
                                },
                            ] }
                            onChange={ ( val ) =>
                                setAttributes( { salesforceProduct: val } )
                            }
                            help="Default value: Standard Donation."
                        />
                    </PanelRow>

                    <PanelRow>
                        <SelectControl
                            label="Language"
                            value={ language }
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
                            onChange={ ( val ) =>
                                setAttributes( { language: val } )
                            }
                            help="Default value: en."
                        />
                    </PanelRow>

                    <PanelRow>
                        <SelectControl
                            label="Default Payment Type"
                            value={ defaultPaymentType }
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
                    </PanelRow>

                    <PanelRow>
                        <SelectControl
                            label="Default Recurring Interval"
                            value={ defaultRecurringInterval }
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
                                setAttributes( {
                                    defaultRecurringInterval: val,
                                } )
                            }
                            help="Default value: monthly."
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title="Amounts" initialOpen={ false }>
                    <PanelRow className="amount-controls">
                        <TextControl
                            label="Minimum Custom Amount Onetime"
                            value={ minimumCustomAmountOnetime }
                            onChange={ ( val ) =>
                                setAttributes( {
                                    minimumCustomAmountOnetime: parseInt( val ),
                                } )
                            }
                            help="Minimum custom amount which can be set on the form for onetime donations. Default value: 1."
                        />
                    </PanelRow>

                    <PanelRow>
                        <TextControl
                            label="Amounts Onetime"
                            value={ amountsOnetime }
                            onChange={ ( val ) =>
                                setAttributes( { amountsOnetime: val } )
                            }
                            help="Predefined amounts which appear on the form for onetime donations (comma separated list, example: 10,20,30,40). Default value: 39,84,150,250."
                        />
                    </PanelRow>

                    <PanelRow>
                        <TextControl
                            label="Minimum Custom Amount Recurring (monthly)"
                            value={ minimumCustomAmountRecurringMonthly }
                            onChange={ ( val ) =>
                                setAttributes( {
                                    minimumCustomAmountRecurringMonthly:
                                        parseInt( val ),
                                } )
                            }
                            help="Minimum custom amount which can be set on the form for monthly recurring donations. Default value: 2."
                        />
                    </PanelRow>

                    <PanelRow>
                        <TextControl
                            label="Amounts Recurring (monthly)"
                            value={ amountsRecurringMonthly }
                            onChange={ ( val ) =>
                                setAttributes( {
                                    amountsRecurringMonthly: val,
                                } )
                            }
                            help="Predefined amounts which appear on the form for monthly recurring donations (comma separated list, example: 5,10,15,20). Default value: 7,10,20,50."
                        />
                    </PanelRow>

                    <PanelRow>
                        <ToggleControl
                            label="Preselect checkbox to Cover Transaction Fees"
                            checked={ preselectCoverTransactionFees }
                            onChange={ ( val ) =>
                                setAttributes( {
                                    preselectCoverTransactionFees: val,
                                } )
                            }
                            help="Default value: false."
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title="Amount Descriptions" initialOpen={ false }>
                    <PanelRow>
                        <ToggleControl
                            label="Use Amount Descriptions"
                            checked={ useAmountDescriptions }
                            onChange={ ( val ) =>
                                setAttributes( { useAmountDescriptions: val } )
                            }
                        />
                    </PanelRow>

                    { useAmountDescriptions && (
                        <>
                            <Divider />

                            <PanelRow>
                                <p><strong>Onetime Amounts</strong></p>
                            </PanelRow>

                            { amountsOnetime && amountsOnetime.split( ',' ).map( ( amount ) => {
                                const key = amount.trim();
                                return (
                                    <PanelRow key={ `onetime-${ key }` }>
                                        <TextControl
                                            label={ `Amount ${ key } Description` }
                                            value={ amountDescriptionsOnetime?.[ key ] || '' }
                                            onChange={ ( val ) =>
                                                setAttributes( {
                                                    amountDescriptionsOnetime: {
                                                        ...amountDescriptionsOnetime,
                                                        [ key ]: val,
                                                    },
                                                } )
                                            }
                                        />
                                    </PanelRow>
                                );
                            } ) }

                            <PanelRow>
                                <TextControl
                                    label="Custom Amount Description (Onetime)"
                                    value={ amountDescriptionCustomOnetime || '' }
                                    onChange={ ( val ) =>
                                        setAttributes( {
                                            amountDescriptionCustomOnetime: val,
                                        } )
                                    }
                                />
                            </PanelRow>

                            <Divider />

                            <PanelRow>
                                <p><strong>Recurring Monthly Amounts</strong></p>
                            </PanelRow>

                            { amountsRecurringMonthly && amountsRecurringMonthly.split( ',' ).map( ( amount ) => {
                                const key = amount.trim();
                                return (
                                    <PanelRow key={ `recurring-${ key }` }>
                                        <TextControl
                                            label={ `Amount ${ key } Description` }
                                            value={ amountDescriptionsRecurringMonthly?.[ key ] || '' }
                                            onChange={ ( val ) =>
                                                setAttributes( {
                                                    amountDescriptionsRecurringMonthly: {
                                                        ...amountDescriptionsRecurringMonthly,
                                                        [ key ]: val,
                                                    },
                                                } )
                                            }
                                        />
                                    </PanelRow>
                                );
                            } ) }

                            <PanelRow>
                                <TextControl
                                    label="Custom Amount Description (Recurring)"
                                    value={ amountDescriptionCustomRecurring || '' }
                                    onChange={ ( val ) =>
                                        setAttributes( {
                                            amountDescriptionCustomRecurring: val,
                                        } )
                                    }
                                />
                            </PanelRow>
                        </>
                    ) }
                </PanelBody>

                <PanelBody title="Custom Fields" initialOpen={ false }>
                    <PanelRow className="custom-field-controls">
                        <p>
                            Custom fields can be used to add additional
                            information to the donation form. The collected
                            information will only be transferred to RaiseNow,
                            but not to Salesforce.
                        </p>
                    </PanelRow>

                    <PanelRow>
                        <ToggleControl
                            label="Use Custom Fields"
                            checked={ useCustomFields }
                            onChange={ ( val ) =>
                                setAttributes( { useCustomFields: val } )
                            }
                        />
                    </PanelRow>

                    { useCustomFields && (
                        <>
                            <Divider />

                            <PanelRow>
                                <SelectControl
                                    label="Custom Fields Placement"
                                    value={ customFieldsPlacement }
                                    options={ [
                                        {
                                            label: 'Beginning of form',
                                            value: 'beginning',
                                        },
                                        {
                                            label: 'After amount',
                                            value: 'after-amount',
                                        },
                                        { label: 'End of form', value: 'end' },
                                    ] }
                                    onChange={ ( val ) =>
                                        setAttributes( {
                                            customFieldsPlacement: val,
                                        } )
                                    }
                                    help="Select where to place the custom fields in the form."
                                />
                            </PanelRow>

                            <PanelRow>
                                <TextControl
                                    label="Section title"
                                    value={ customFieldsSectionTitle }
                                    onChange={ ( val ) =>
                                        setAttributes( {
                                            customFieldsSectionTitle: val,
                                        } )
                                    }
                                    help="Title of the section containing the custom fields."
                                />
                            </PanelRow>

                            <PanelRow>
                                <TextareaControl
                                    label="Description"
                                    help="Enter additional text to show (optional)."
                                    value={ customFieldsSectionText }
                                    onChange={ ( val ) =>
                                        setAttributes( {
                                            customFieldsSectionText: val,
                                        } )
                                    }
                                />
                            </PanelRow>

                            { customFields.map( ( field, index ) => (
                                <CustomField
                                    key={ index }
                                    index={ index }
                                    field={ field }
                                    onChange={ ( newField ) =>
                                        updateCustomField( index, newField )
                                    }
                                    onRemove={ () =>
                                        removeCustomField( index )
                                    }
                                    canRemove={
                                        customFields.length > MIN_FIELDS
                                    }
                                />
                            ) ) }

                            <PanelRow className="custom-field-controls">
                                <Button
                                    variant="primary"
                                    onClick={ addCustomField }
                                    disabled={
                                        customFields.length >= MAX_FIELDS
                                    }
                                    __next40pxDefaultSize
                                    className="add-custom-field-button"
                                >
                                    Add custom field
                                </Button>

                                <p className="custom-field-count">
                                    { customFields.length } / { MAX_FIELDS }{ ' ' }
                                    custom fields
                                </p>
                            </PanelRow>
                        </>
                    ) }
                </PanelBody>
                <PanelBody title="Debug" initialOpen={ false }>
                    <PanelRow>
                        <CheckboxControl
                            label="Debug"
                            checked={ debug }
                            onChange={ ( val ) =>
                                setAttributes( { debug: val } )
                            }
                            help="Default value: false."
                        />
                    </PanelRow>

                    <PanelRow>
                        <CheckboxControl
                            label="Test Mode"
                            checked={ testMode }
                            onChange={ ( val ) =>
                                setAttributes( { testMode: val } )
                            }
                            help="Default value: false."
                        />
                    </PanelRow>
                </PanelBody>
            </Panel>
        </div>
    );
}
