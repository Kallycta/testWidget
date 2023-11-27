import { LeadCMRequestManager } from './LeadCMRequestManager';
import {
    LeadCMDesignSettingsInterface,
    LeadCMInitSettingsInterface,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsTypes';
import { LeadCMSettingsTestData } from '@src/callback_widget_schemas/WidgetSettingsDataTest';

export class LeadCMSettings {
    private static _instance?: LeadCMSettings;

    public static getInstance = (): LeadCMSettings =>
        (LeadCMSettings._instance ||= new LeadCMSettings());
    public static deleteInstance = () => delete LeadCMSettings._instance;

    private _settings: LeadCMDesignSettingsInterface;
    private init_settings: LeadCMInitSettingsInterface;

    getSettings = (): LeadCMDesignSettingsInterface => this._settings;
    getInitSettings = (): LeadCMInitSettingsInterface => this.init_settings;

    public static async init() {
        this._instance ??= new LeadCMSettings();

        const init_settings = (this._instance.init_settings = window.leadCM);

        const { widget_key, use_test_settings } = init_settings;

        // production values
        init_settings.settings_url ||= `https://app.leadconnect.cc/api/v1/ext/widget-settings/${widget_key}`;
        init_settings.submit_url ||= 'https://app.leadconnect.cc/api/v1/ext/add-call/';
        init_settings.time_available_url ||= `https://app.leadconnect.cc/api/v1/ext/widget-get-time-available/${widget_key}`;
        init_settings.register_url ||= 'https://app.leadconnect.cc/api/v1/ext/register-event/';
        init_settings.collect_data_url ||= 'https://app.leadconnect.cc/api/v1/ext/collect-data/';

        /* develblock:start */
        if (use_test_settings) {
            // TODO: how to avoid including this in prod
            this._instance._settings = LeadCMSettingsTestData;
            return;
        }
        /* develblock:end */

        if (window.leadCM?.ee_settings)
            try {
                this._instance._settings = JSON.parse(
                    decodeURIComponent(atob(window.leadCM.ee_settings)),
                );

                delete window.leadCM.ee_settings;
                return;
            } catch (e) {
                // console.log('error', e);
                // TODO: log if not prod
                LeadCMRequestManager.dispatchCustomEvent('ERROR_E_SETTINGS', {
                    err: e.toString?.().substring(0, 1024),
                });
            }

        if (window.leadCM?.visit_id) {
            this._instance._settings = JSON.parse(
                await LeadCMRequestManager.settingsGetAsync(
                    init_settings.settings_url,
                    window.leadCM.visit_id,
                ),
            );
        } else {
            try {
                await LeadCMRequestManager.settingsGetAsync(
                    init_settings.settings_url + '/no_visit_id',
                    '',
                );
            } catch (e) {}
        }
    }
}

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window {
        leadCM: LeadCMInitSettingsInterface;
        _leadCM: LeadCMInitSettingsInterface;
    }
}
