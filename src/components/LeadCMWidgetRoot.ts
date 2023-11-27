import { createElementFromHTML, divQuerySelector, hexToRgbA } from '../utils/helpers';
import { LeadCMSettings } from '../managers/LeadCMSettings';
import { LeadCMStateManager } from '../managers/LeadCMStateManager';
import { LeadCMModalWindow } from './LeadCMModalWindow';
import { LeadCMTimeSelector } from './LeadCMTimeSelector';
import { LeadCMWidgetButton } from './LeadCMWidgetButton';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';
import { TemplateType } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { MainState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';

const STYLES: Record<TemplateType, (settings: any) => string> = {
    [TemplateType.LEADCM]: require('../templates/leadcm/widgetStyles.hbs'),
    [TemplateType.LEADCM_DEFAULT]: require('../templates/leadcm/modals/default/styles.hbs'),
    [TemplateType.LEADCM_CHAT]: require('../templates/leadcm/widgetChatStyles.hbs'),
};

export class LeadCMWidgetRoot {
    private static _instance?: LeadCMWidgetRoot;

    public static getInstance = (): LeadCMWidgetRoot =>
        (LeadCMWidgetRoot._instance ||= new LeadCMWidgetRoot());
    public static deleteInstance = () => delete LeadCMWidgetRoot._instance;

    readonly widget: HTMLDivElement;

    private constructor() {
        // To avoid deadlock should not use child component instances here like LeadCMWidgetButton, LeadCMModalWindow
        const settings = LeadCMSettings.getInstance().getSettings();
        this.widget = document.createElement('div');
        this.widget.classList.add('lc_callback_widget');

        if (!document.body) throw new Error('The document has no body!');

        document.body.appendChild(this.widget);

        const styleTagString = STYLES[settings.widgetStyles.template]({
            ...settings,
            ...settings.widgetStyles,
            ...settings.widgetTexts,
            ...settings.buttonStyles,
            ...settings.tooltipStyles,
        });
        const styles = <HTMLStyleElement>createElementFromHTML(styleTagString);
        styles.id = 'lc_widget_styles';
        document.body.appendChild(styles);

        const buttonStyleTagString = require('../templates/buttonStyles.hbs')({
            ...settings,
            ...settings.widgetStyles,
            ...settings.widgetTexts,
            ...settings.buttonStyles,
            ...settings.tooltipStyles,

            pulseRGBStart: hexToRgbA(settings.buttonStyles.buttonPulseColor, 0.4),
            pulseRGBEnd: hexToRgbA(settings.buttonStyles.buttonPulseColor, 0),
        });
        const buttonStyles = <HTMLStyleElement>createElementFromHTML(buttonStyleTagString);
        buttonStyles.id = 'lc_button_styles';
        document.body.appendChild(buttonStyles);
    }

    public static finishWidget() {
        LeadCMStateManager.setMainState(MainState.Ended);
        LeadCMStateManager.getInstance().autoPopupAlreadyTriggered = true;

        LeadCMStateManager.deleteInstance();
        LeadCMSettings.deleteInstance();
        LeadCMModalWindow.deleteInstance();
        LeadCMTimeSelector.deleteInstance();
        LeadCMWidgetButton.deleteInstance();
        LeadCMWidgetButtonToolTypeTimer.deleteInstance();
        LeadCMWidgetRoot.deleteInstance();

        let el;

        el = divQuerySelector('.lc_callback_widget');
        el?.parentNode?.removeChild(el);
        el = document.querySelector('#lc_widget_styles');
        el?.parentNode?.removeChild(el);
        el = document.querySelector('#lc_button_styles');
        el?.parentNode?.removeChild(el);

        window.leadCM.timeouts?.map((t) => window.clearTimeout(t));
        window.leadCM.listeners?.map((el) => el.target.removeEventListener(el.event, el.listener));
        window.leadCM.timeouts = [];
        window.leadCM.listeners = [];
    }
}
