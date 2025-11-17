import {__, sprintf} from '@wordpress/i18n';
import {PanelBody, Button, SelectControl, TextControl} from '@wordpress/components';

const MIN_OPTIONS = 1;
const MAX_OPTIONS = 15;

const CustomField = ({field, index, onChange, onRemove, canRemove}) => {
    const {
        fieldType,
        fieldLabel,
        fieldName,
        options = [''],
    } = field;

    // Make sure there is always at least one option
    const normalizedOptions = options.length ? options : [''];

    const updateField = (patch) => {
        onChange({
            ...field,
            ...patch,
        });
    };

    const updateOptions = (newOptions) => {
        updateField({options: newOptions});
    };

    const updateOption = (value, optionIndex) => {
        const newOptions = [...normalizedOptions];
        newOptions[optionIndex] = value;
        updateOptions(newOptions);
    };

    const addOption = () => {
        if (normalizedOptions.length >= MAX_OPTIONS) return;
        updateOptions([...normalizedOptions, '']);
    };

    const removeOption = (optionIndex) => {
        if (normalizedOptions.length <= MIN_OPTIONS) return;

        const newOptions = normalizedOptions.filter(
            (_, i) => i !== optionIndex
        );

        updateOptions(newOptions.length ? newOptions : ['']);
    };

    // Only show options UI for select / checkbox
    const hasOptions = fieldType === 'select' || fieldType === 'checkbox';

    // Simple sanitizing: only lowercase letters and underscores
    const handleFieldNameChange = (val) => {
        const sanitized = val.toLowerCase().replace(/[^a-z_]/g, '');
        updateField({fieldName: sanitized});
    };

    // Title: "Custom field X" if name empty, otherwise the field name
    const titleText =
        fieldLabel && fieldLabel.trim().length
            ? fieldLabel.trim()
            : sprintf(__('Custom field %d', 'planet4-gpch-tamaro'), index + 1);

    return (
        <PanelBody
            title={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <span>{titleText}</span>
                    <Button
                        icon="trash"
                        label={__(
                            'Remove custom field',
                            'planet4-gpch-tamaro'
                        )}
                        onClick={onRemove}
                        isDestructive
                        disabled={!canRemove}
                    />
                </div>
            }
            initialOpen={false}
            __next40pxDefaultSize
        >
            <SelectControl
                label="Field Type"
                value={fieldType}
                options={[
                    {label: 'Single line text', value: 'text'},
                    {label: 'Multi line text', value: 'textarea'},
                    {label: 'Select field', value: 'select'},
                    {label: 'Checkbox', value: 'checkbox'},
                ]}
                onChange={(val) => updateField({fieldType: val})}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
            />

            <TextControl
                label="Field Label"
                value={fieldLabel}
                onChange={(val) => updateField({fieldLabel: val})}
                help={__(
                    'The label of the custom field which will be displayed to the user. Example: T-Shirt Size',
                    'planet4-gpch-tamaro'
                )}
            />

            <TextControl
                label="Field Name"
                value={fieldName}
                onChange={handleFieldNameChange}
                help={__(
                    'The name of the custom field for our internal use. Use lower case letters and underscores only. Example: tshirt_size',
                    'planet4-gpch-tamaro'
                )}
            />

            {hasOptions && (
                <>
                    {normalizedOptions.map((option, optionIndex) => (
                        <div
                            key={optionIndex}
                            className="my-block__option-row"
                            style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                                marginBottom: '8px',
                            }}
                        >
                            <TextControl
                                label={sprintf(
                                    __('Option %d', 'planet4-gpch-tamaro'),
                                    optionIndex + 1
                                )}
                                value={option}
                                onChange={(value) =>
                                    updateOption(value, optionIndex)
                                }
                                style={{flexGrow: 1}}
                            />

                            <Button
                                icon="no-alt"
                                label={__(
                                    'Remove option',
                                    'planet4-gpch-tamaro'
                                )}
                                onClick={() => removeOption(optionIndex)}
                                isDestructive
                                disabled={
                                    normalizedOptions.length <= MIN_OPTIONS
                                }
                            />
                        </div>
                    ))}

                    <div
                        style={{
                            marginTop: '12px',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="secondary"
                            onClick={addOption}
                            disabled={
                                normalizedOptions.length >= MAX_OPTIONS
                            }
                        >
                            {__('Add option', 'planet4-gpch-tamaro')}
                        </Button>

                        <span>
                            {sprintf(
                                __(
                                    '%1$d / %2$d options',
                                    'planet4-gpch-tamaro'
                                ),
                                normalizedOptions.length,
                                MAX_OPTIONS
                            )}
                        </span>
                    </div>
                </>
            )}
        </PanelBody>
    );
};

export default CustomField;
