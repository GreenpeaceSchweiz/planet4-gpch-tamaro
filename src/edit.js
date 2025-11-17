import {
    Tip,
    TextControl,
    SelectControl,
    CheckboxControl,
    Button, Panel, PanelRow
} from '@wordpress/components';
import {useBlockProps} from '@wordpress/block-editor';
import CustomField from "./components/CustomField/CustomField";

const MIN_FIELDS = 0;
const MAX_FIELDS = 5;

export default function Edit({attributes, setAttributes}) {
    const {
        customFields = [],
        debug,
        testMode,
        language,
        defaultPaymentType,
        defaultRecurringInterval,
        minimumCustomAmountOnetime,
        amountsOnetime,
        minimumCustomAmountRecurringMonthly,
        amountsRecurringMonthly,
        salesforceCampaignID,
        salesforceProduct,
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
            <br/>
            <CheckboxControl
                label="Debug"
                checked={debug}
                onChange={(val) => setAttributes({debug: val})}
                help="Default value: false."
            />
            <CheckboxControl
                label="Test Mode"
                checked={testMode}
                onChange={(val) => setAttributes({testMode: val})}
                help="Default value: false."
            />
            <br/>
            <SelectControl
                label="Language"
                value={language}
                options={[
                    {
                        label: 'Select an option ...',
                        value: '',
                        disabled: false,
                    },
                    {label: 'German', value: 'de'},
                    {label: 'French', value: 'fr'},
                    {label: 'Italian', value: 'it'},
                ]}
                onChange={(val) => setAttributes({language: val})}
                help="Default value: en."
            />
            <SelectControl
                label="Default Payment Type"
                value={defaultPaymentType}
                options={[
                    {
                        label: 'Select an option ...',
                        value: '',
                        disabled: false,
                    },
                    {label: 'Onetime', value: 'onetime'},
                    {label: 'Recurring', value: 'recurring'},
                ]}
                onChange={(val) =>
                    setAttributes({defaultPaymentType: val})
                }
                help="Default value: onetime."
            />
            <SelectControl
                label="Default Recurring Interval"
                value={defaultRecurringInterval}
                options={[
                    {
                        label: 'Select an option ...',
                        value: '',
                        disabled: false,
                    },
                    {label: 'Monthly', value: 'monthly'},
                    {label: 'Quarterly', value: 'quarterly'},
                    {label: 'Semestral', value: 'semestral'},
                    {label: 'Yearly', value: 'yearly'},
                ]}
                onChange={(val) =>
                    setAttributes({defaultRecurringInterval: val})
                }
                help="Default value: monthly."
            />

            <TextControl
                label="Minimum Custom Amount Onetime"
                value={minimumCustomAmountOnetime}
                onChange={(val) =>
                    setAttributes({
                        minimumCustomAmountOnetime: parseInt(val),
                    })
                }
                help="Minimum custom amount which can be set on the form for onetime donations. Default value: 1."
            />
            <TextControl
                label="Amounts Onetime"
                value={amountsOnetime}
                onChange={(val) => setAttributes({amountsOnetime: val})}
                help="Predefined amounts which appear on the form for onetime donations (comma separated list, example: 10,20,30,40). Default value: 39,84,150,250."
            />
            <TextControl
                label="Minimum Custom Amount Recurring (monthly)"
                value={minimumCustomAmountRecurringMonthly}
                onChange={(val) =>
                    setAttributes({
                        minimumCustomAmountRecurringMonthly: parseInt(val),
                    })
                }
                help="Minimum custom amount which can be set on the form for monthly recurring donations. Default value: 2."
            />
            <TextControl
                label="Amounts Recurring (monthly)"
                value={amountsRecurringMonthly}
                onChange={(val) =>
                    setAttributes({amountsRecurringMonthly: val})
                }
                help="Predefined amounts which appear on the form for monthly recurring donations (comma separated list, example: 5,10,15,20). Default value: 7,10,20,50."
            />

            <TextControl
                label="Salesforce Campaign ID"
                value={salesforceCampaignID}
                onChange={(val) =>
                    setAttributes({salesforceCampaignID: val})
                }
                help="Default value: 70109000001JUJIAA4."
            />
            <SelectControl
                label="Salesforce Product"
                value={salesforceProduct}
                options={[
                    {
                        label: 'Select an option ...',
                        value: '',
                        disabled: false,
                    },
                    {label: 'Standard Donation', value: 'Standard Donation'},
                    {
                        label: 'Sponsorship Agriculture',
                        value: 'Sponsorship Agriculture',
                    },
                    {
                        label: 'Sponsorship Climate',
                        value: 'Sponsorship Climate',
                    },
                    {label: 'Sponsorship Fleet', value: 'Sponsorship Fleet'},
                    {
                        label: 'Sponsorship Forest',
                        value: 'Sponsorship Forest',
                    },
                    {label: 'Sponsorship Ocean', value: 'Sponsorship Ocean'},
                ]}
                onChange={(val) =>
                    setAttributes({salesforceProduct: val})
                }
                help="Default value: Standard Donation."
            />

            <Panel header="Custom Fields">
                <PanelRow className="custom-field-controls">
                    <p>Custom fields can be used to add additional information to the donation form. The collected
                        information will only be transferred to RaiseNow, but not to Salesforce.</p>
                </PanelRow>

                {customFields.map((field, index) => (
                    <CustomField
                        key={index}
                        index={index}
                        field={field}
                        onChange={(newField) => updateCustomField(index, newField)}
                        onRemove={() => removeCustomField(index)}
                        canRemove={customFields.length > MIN_FIELDS}
                    />
                ))}

                <PanelRow className="custom-field-controls">
                    <Button
                        variant="primary"
                        onClick={addCustomField}
                        disabled={customFields.length >= MAX_FIELDS}
                        __next40pxDefaultSize
                        className="add-custom-field-button"
                    >
                        Add custom field
                    </Button>

                    <p className="custom-field-count">
                        {customFields.length} / {MAX_FIELDS} custom fields
                    </p>
                </PanelRow>
            </Panel>
        </div>
    );
}
