import { createElementFromHTML, divQuerySelector } from '../utils/helpers';
import { LeadCMWidgetRoot } from './LeadCMWidgetRoot';
import { LeadCMStateManager } from '../managers/LeadCMStateManager';
import { LeadCMSettings } from '../managers/LeadCMSettings';
import { LeadCMRequestManager } from '../managers/LeadCMRequestManager';
import {
    ButtonType,
    EventType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { WindowState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import * as intlTelInput from 'intl-tel-input';
import { callOnClickCommon } from '@src/managers/LeadCMCallManager';

export class LeadCMWidgetButton {
    private static _instance?: LeadCMWidgetButton;

    public static getInstance = (): LeadCMWidgetButton =>
        (LeadCMWidgetButton._instance ||= new LeadCMWidgetButton());
    public static deleteInstance = () => delete LeadCMWidgetButton._instance;

    callbutton: HTMLElement;
    intlTelInput: any;
    selectedTimeoutDepartment = false;

    // во время звонка показывать тултип всё время, пока не закроют принудительно
    public toolTipAlwaysOn = false;
    public toolTipDisabled = false;

    readonly phoneInput?: HTMLInputElement;

    private constructor() {
        const settings = LeadCMSettings.getInstance().getSettings();

        const htmlString = require('../templates/callbuttonTemplate.hbs')({
            ...settings,
            ...settings.widgetStyles,
            ...settings.widgetTexts,
            ...settings.buttonStyles,
            ...settings.tooltipStyles,
        });
        const callbutton = createElementFromHTML(htmlString) as HTMLElement;
        LeadCMWidgetRoot.getInstance().widget.appendChild(callbutton);

        this.callbutton = divQuerySelector('callbutton');

        this.hideTooltip();

        const widgetButtonDiv = divQuerySelector('#lc_widgetButton');
        const animationBorderDiv = divQuerySelector('.lc_button-animation-border');

        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

        if (settings.buttonStyles.buttonTemplate === ButtonType.LEADCM) {
            let isMouseHover = true;
            if (!isIos) {
                widgetButtonDiv?.addEventListener('mouseover', () => {
                    LeadCMRequestManager.dispatchEvent(EventType.BUTTON_HOVERED);
                    if (
                        !settings.alreadyShownTooltip &&
                        settings.tooltipStyles.showTooltipAfterMs > 0 &&
                        !this.toolTipDisabled
                    ) {
                        LeadCMWidgetButton.getInstance().showTooltip();
                        LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                    }
                    if (!this.toolTipAlwaysOn && !this.toolTipDisabled) this.showTooltip();
                    isMouseHover = true;
                });
                widgetButtonDiv?.addEventListener('mouseout', () => {
                    if (
                        !this.toolTipAlwaysOn &&
                        !this.toolTipDisabled &&
                        !settings.tooltipStyles.blockPopupIfShowPhoneField
                    ) {
                        isMouseHover = false;
                        const tooltip = divQuerySelector('#lc_widgetTooltip');

                        tooltip.addEventListener('mouseover', () => {
                            isMouseHover = true;
                        });
                        tooltip.addEventListener('mouseleave', () => {
                            isMouseHover = false;
                            this.hideTooltip();
                        });
                        setTimeout(() => {
                            if (!isMouseHover) {
                                this.hideTooltip();
                            }
                        }, 1000);
                    }
                });
            }

            widgetButtonDiv?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.BUTTON_CLICKED);
                LeadCMStateManager.setWindowState(WindowState.Opened);

                if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                    LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButton.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                }
            });

            const toolTipTextDiv = divQuerySelector('#lc_widgetTooltip-text');
            toolTipTextDiv?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_CLICKED);
                LeadCMStateManager.setWindowState(WindowState.Opened);
            });
        } else {
            if (!isIos) {
                animationBorderDiv?.addEventListener('mouseout', () => {
                    divQuerySelector('.lc_button_callBtn').classList.remove('big');
                    if (!this.toolTipAlwaysOn && !this.toolTipDisabled) this.hideTooltip();
                });
                animationBorderDiv?.addEventListener('mouseover', () => {
                    LeadCMRequestManager.dispatchEvent(EventType.BUTTON_HOVERED);
                    divQuerySelector('.lc_button_callBtn').classList.add('big');
                    if (
                        !settings.alreadyShownTooltip &&
                        settings.tooltipStyles.showTooltipAfterMs > 0 &&
                        !this.toolTipDisabled
                    ) {
                        LeadCMWidgetButton.getInstance().showTooltip();
                        LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                    }
                    if (!this.toolTipAlwaysOn && !this.toolTipDisabled) this.showTooltip();
                });
            }

            animationBorderDiv?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.BUTTON_CLICKED);
                LeadCMStateManager.setWindowState(WindowState.Opened);

                if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                    LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButton.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                }
            });
        }

        if (!settings.alreadyShownTooltip && settings.tooltipStyles.showTooltipAfterMs > 0) {
            const popupTimeout = window.setTimeout(() => {
                if (!this.toolTipDisabled) {
                    LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButton.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                }
            }, settings.tooltipStyles.showTooltipAfterMs);
            window.leadCM.timeouts?.push(popupTimeout);
        }

        document
            .querySelector<HTMLDivElement>('#lc_widgetTooltip-close')
            ?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.CLOSE_TOOLTIP_CLICKED);
                LeadCMWidgetButton.getInstance().toolTipAlwaysOn = false;
                LeadCMWidgetButton.getInstance().hideTooltip();
            });

        this.phoneInput = <HTMLInputElement>document.getElementById('widgetModal-field_tooltip');
        if (this.phoneInput) {
            const onlyCountries = settings.widgetStyles.onlyCountries
                ? settings.widgetStyles.onlyCountries.replace(/ /g, '').split(',')
                : null;

            this.intlTelInput = intlTelInput(this.phoneInput, {
                ...((onlyCountries && onlyCountries.indexOf(settings.country) > -1) ||
                !onlyCountries
                    ? { initialCountry: settings.country }
                    : {}),
                ...(onlyCountries
                    ? { onlyCountries }
                    : { preferredCountries: [] }),
                ...(settings.phoneNumberWithLocalCodePlaceholder
                    ? {
                          utilsScript: settings.phoneNumberWithLocalCodePlaceholder
                              ? 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.0.6/js/utils.js'
                              : '',
                          autoPlaceholder: 'aggressive',
                      }
                    : {}),
            });

            if (settings.phoneNumberWithoutDialCode) {
                this.phoneInput.value = ``;
            } else {
                this.phoneInput.value = `+${this.intlTelInput.selectedCountryData.dialCode} `;
            }

            this.phoneInput.addEventListener('keyup', (e) => {
                // TODO: заменить на submit form
                // noinspection JSDeprecatedSymbols
                if (e.key === 'Enter' || e.keyCode === 13) {
                    document.querySelector<HTMLButtonElement>('#lc_submit_button_tooltip')?.click();
                }
            });

            document
                .querySelector('#lc_submit_button_tooltip')
                ?.addEventListener('click', this.callOnClick.bind(this, settings));
        }
    }

    // noinspection JSMethodCanBeStatic
    public showButton() {
        this.callbutton.removeAttribute('aria-hidden');
        this.callbutton.style.visibility = '';
    }

    // noinspection JSMethodCanBeStatic
    public hideButton() {
        this.callbutton.setAttribute('aria-hidden', 'true');
        this.callbutton.style.visibility = 'hidden';
    }

    // noinspection JSMethodCanBeStatic
    public showTooltip(animate = false) {
        divQuerySelector('#lc_widgetTooltip').setAttribute('aria-hidden', 'false');
        // TODO: improve classes for new and old tooltip
        if (document.querySelector('.lc_button_tooltip')) {
            if (animate)
                divQuerySelector('.lc_button_tooltip').classList.add(
                    'lc_button_tooltip--show-animate',
                );
            divQuerySelector('.lc_button_tooltip').classList.add('lc_button_tooltip--show');
        }
        divQuerySelector('#lc_widgetTooltip').style.display = '';
    }

    // noinspection JSMethodCanBeStatic
    public hideTooltip() {
        divQuerySelector('#lc_widgetTooltip').setAttribute('aria-hidden', 'true');
        // TODO: improve classes for new and old tooltip
        if (document.querySelector('.lc_button_tooltip')) {
            divQuerySelector('.lc_button_tooltip').classList.remove('lc_button_tooltip--show');
            divQuerySelector('.lc_button_tooltip').classList.remove(
                'lc_button_tooltip--show-animate',
            );
        }
        divQuerySelector('#lc_widgetTooltip').style.display = 'none';
    }

    public async callOnClick(settings) {
        const countryData = this.intlTelInput.getSelectedCountryData();
        const phone = document.querySelector<HTMLInputElement>('#widgetModal-field_tooltip');
        await callOnClickCommon(countryData, phone, this.selectedTimeoutDepartment).then(() => {
            LeadCMRequestManager.dispatchEvent(EventType.BUTTON_CLICKED);
            LeadCMStateManager.setWindowState(WindowState.Opened);

            if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
                LeadCMWidgetButton.getInstance().showTooltip(true);
                LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
            }
        });
    }

    public leadUnreachable() {}

    public weCallYouLater() {}

    public toolTypeTimerDefaultResult() {}

    public toolTypeEnd() {}

    public callOrdered() {}
}
