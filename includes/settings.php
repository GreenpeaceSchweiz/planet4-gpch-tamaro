<?php

// Hook to create the submenu under "Settings"
add_action('admin_menu', 'custom_settings_page');

function custom_settings_page()
{
    add_options_page(
        'Tamaro widget settings',             // Page title
        'Tamaro',                             // Menu title
        'manage_options',                     // Capability
        'salesforce-campaign-settings',       // Menu slug
        'render_salesforce_campaign_settings' // Callback to render the page
    );
}

// Register the setting
add_action('admin_init', 'register_salesforce_campaign_setting');

function register_salesforce_campaign_setting()
{
    register_setting(
        'salesforce_campaign_settings_group',
        'default_salesforce_campaign_id',
        [
            'type' => 'string',
            'description' => 'Default Salesforce Campaign ID',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => ''
        ]
    );
}

// Render the settings page
function render_salesforce_campaign_settings()
{
    ?>
    <div class="wrap">
        <h1>Default Salesforce Campaign ID</h1>
        <form method="post" action="options.php">
            <?php
            // Print out the settings fields for the 'salesforce_campaign_settings_group' group
            settings_fields('salesforce_campaign_settings_group');
            // Output the settings section for the option
            do_settings_sections('salesforce_campaign_settings_group');
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="default_salesforce_campaign_id">Default Salesforce Campaign ID</label>
                    </th>
                    <td>
                        <input type="text" id="default_salesforce_campaign_id" name="default_salesforce_campaign_id"
                               value="<?php echo esc_attr(get_option('default_salesforce_campaign_id')); ?>"
                               class="regular-text"/>
                    </td>
                </tr>
            </table>
            <?php
            // Submit button to save settings
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
