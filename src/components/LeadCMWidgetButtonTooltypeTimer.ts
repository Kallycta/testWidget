import {
    createElementFromHTML,
    displayNoneIfExistsQuerySelector,
    divQuerySelector,
} from '../utils/helpers';
import { LeadCMWidgetRoot } from './LeadCMWidgetRoot';
import { LeadCMStateManager } from '../managers/LeadCMStateManager';
import { LeadCMSettings } from '../managers/LeadCMSettings';
import { CheckPhoneNumberResponse, LeadCMRequestManager } from '../managers/LeadCMRequestManager';
import {
    ButtonType,
    EventType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { WindowState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import * as intlTelInput from 'intl-tel-input';
import {
    callOnClickCommon,
    checkPhoneNumber,
    dispatchDepartmentSelected,
} from '@src/managers/LeadCMCallManager';
import { checkType } from '@shared/convolo-core/helpers/helpers/check-type';
import { IcallbackJsEventRatingDto } from '@shared/convolo-icallback-js/dto/icallback-js/icallback-js-event-rating.dto';
import { isNotEmptyArray } from '@shared/convolo-core/helpers/helpers/is-not-empty-array';

export class LeadCMWidgetButtonToolTypeTimer {
    private static _instance?: LeadCMWidgetButtonToolTypeTimer;

    public static getInstance = (): LeadCMWidgetButtonToolTypeTimer =>
        (LeadCMWidgetButtonToolTypeTimer._instance ||= new LeadCMWidgetButtonToolTypeTimer());
    public static deleteInstance = () => delete LeadCMWidgetButtonToolTypeTimer._instance;

    callbutton: HTMLElement;
    intlTelInput: any;
    callDisabled: boolean = false;
    selectedTimeoutDepartment = false;
    firstDepartmentsBeforePhoneField = true;

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
            const widgetToolTitle = document.querySelector('#lc_widgetTooltip-timer-title');
            const widgetToolSubTitle = document.querySelector('#lc_widgetTooltip-timer-desc');
            if (widgetToolTitle) widgetToolTitle.innerHTML = settings.widgetTexts.title;
            if (widgetToolSubTitle) widgetToolSubTitle.innerHTML = settings.widgetTexts.subTitle;
            let isMouseHover = true;
            if (!isIos) {
                widgetButtonDiv?.addEventListener('mouseover', () => {
                    LeadCMRequestManager.dispatchEvent(EventType.BUTTON_HOVERED);
                    if (
                        !settings.alreadyShownTooltip &&
                        settings.tooltipStyles.showTooltipAfterMs > 0 &&
                        !this.toolTipDisabled
                    ) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip();
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
                        tooltip.addEventListener('mouseover', function (event) {
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
                    LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                    this.showFullTooltip();
                }
            });

            const widgetToolTipDiv = divQuerySelector('#lc_widgetTooltip-timer');
            widgetToolTipDiv?.addEventListener('click', () => {
                if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                    this.showFullTooltip();
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
                        LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip();
                        LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                    }
                    if (!this.toolTipAlwaysOn && !this.toolTipDisabled) this.showTooltip();
                    this.showFullTooltip();
                });
            }

            animationBorderDiv?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.BUTTON_CLICKED);
                LeadCMStateManager.setWindowState(WindowState.Opened);

                if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                    LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                }
            });
        }

        if (!settings.alreadyShownTooltip && settings.tooltipStyles.showTooltipAfterMs > 0) {
            const popupTimeout = window.setTimeout(() => {
                if (!this.toolTipDisabled) {
                    LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
                    LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip(true);
                    LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
                }
            }, settings.tooltipStyles.showTooltipAfterMs);
            window.leadCM.timeouts?.push(popupTimeout);
        }

        document
            .querySelector<HTMLDivElement>('#lc_widgetTooltip-close')
            ?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.CLOSE_TOOLTIP_CLICKED);
                LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = false;
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
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
        this.showFullTooltip();
    }

    // noinspection JSMethodCanBeStatic
    public showFullTooltip() {
        const settings = LeadCMSettings.getInstance().getSettings();

        divQuerySelector('.lc_button_tooltip-inner').style.borderBottom = '1px solid #DFDFDF';
        displayNoneIfExistsQuerySelector('#lc_button_tooltip-top-add-container');

        if (isNotEmptyArray(settings.departments)) {
            if (
                settings.widgetStyles.departmentsSelectorBeforePhoneField
                // && !divQuerySelector('#widgetModal-section-phone-tooltype').style.display
            ) {
                const widgetToolTitle = document.querySelector(
                    '#lc_widgetTooltip-timer-depart-title',
                );
                const widgetToolSubTitle = document.querySelector(
                    '#lc_widgetTooltip-timer-depart-desc',
                );
                if (widgetToolTitle) widgetToolTitle.innerHTML = settings.widgetTexts.title;
                if (widgetToolSubTitle)
                    widgetToolSubTitle.innerHTML = settings.widgetTexts.subTitle;
                if (this.firstDepartmentsBeforePhoneField)
                    divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'block';
                divQuerySelector(
                    '#lc_widgetTooltip-timer-formButton-confirmDepartment',
                )?.addEventListener('click', () => {
                    dispatchDepartmentSelected(settings);

                    this.firstDepartmentsBeforePhoneField = false;
                    divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'flex';
                    divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'none';
                });
            } else {
                const widgetToolTitle = document.querySelector(
                    '#lc_widgetTooltip-timer-depart-title',
                );
                const widgetToolSubTitle = document.querySelector(
                    '#lc_widgetTooltip-timer-depart-desc',
                );
                if (widgetToolTitle) widgetToolTitle.innerHTML = settings.widgetTexts.title;
                if (widgetToolSubTitle)
                    widgetToolSubTitle.innerHTML = settings.widgetTexts.subTitle;
                if (!divQuerySelector('#lc_widgetTooltip-timer-department').style.display)
                    divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'flex';
            }
        } else if (
            !divQuerySelector('#lc_widgetTooltip-timer-end').style.display &&
            !divQuerySelector('#lc_widgetTooltip-timer-rating').style.display &&
            !divQuerySelector('#lc_widgetTooltip-timer-call').style.display
        ) {
            divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'flex';
        }
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

    public async callOnClick() {
        const countryData = this.intlTelInput.getSelectedCountryData();
        const phone = document.querySelector<HTMLInputElement>('#widgetModal-field_tooltip');
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.tooltipStyles.checkPhoneNumber) {
            const result = await checkPhoneNumber(countryData, phone)
                .then(JSON.parse)
                .then((response: CheckPhoneNumberResponse) => response.ip.isValidNumber)
                .catch((err) => {
                    console.log(err);
                    return false;
                });
            if (!result) {
                divQuerySelector('#lc_enterPhoneLabel').innerText =
                    settings.widgetTexts.numberWrong;
                divQuerySelector('#lc_enterPhoneLabel').style.color = 'red';
                divQuerySelector('#widgetModal-field_tooltip').style.borderColor = 'red';
                return;
            }
        }
        if (
            isNotEmptyArray(settings.departments) &&
            !settings.widgetStyles.departmentsSelectorBeforePhoneField
        ) {
            let timeoutDepartmentTimeout: any = null;
            divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'block';
            divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'none';
            divQuerySelector('#widgetModal-section-phone-tooltype').classList.add('-loading');

            LeadCMRequestManager.dispatchEvent(EventType.DEPARTMENTS_OPENED);

            if (settings.timeoutDepartmentKey && settings.timeoutDepartmentTimeoutMs) {
                timeoutDepartmentTimeout = setTimeout(() => {
                    this.selectedTimeoutDepartment = true;
                    divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'none';
                    // divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'block';

                    // TODO ADD AWAIT
                    LeadCMWidgetButtonToolTypeTimer.callClickButton(
                        countryData,
                        phone,
                        this.selectedTimeoutDepartment,
                    );
                }, settings.timeoutDepartmentTimeoutMs);
            }
            document
                .querySelector('#lc_widgetTooltip-timer-formButton-confirmDepartment')
                ?.addEventListener('click', () => {
                    divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'none';
                    divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'flex';
                    const spinner = document.getElementById('spinner');
                    if (spinner) {
                        spinner.style.display = '';
                        spinner.style.opacity = '';
                    }
                    if (timeoutDepartmentTimeout) clearTimeout(timeoutDepartmentTimeout);
                    setTimeout(() => {
                        LeadCMWidgetButtonToolTypeTimer.callClickButton(
                            countryData,
                            phone,
                            this.selectedTimeoutDepartment,
                        );
                    }, 1000);
                });
        } else if (phone?.value) {
            divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'none';
            await LeadCMWidgetButtonToolTypeTimer.callClickButton(
                countryData,
                phone,
                this.selectedTimeoutDepartment,
            );
        }
    }

    static async callClickButton(countryData, phone, selectedTimeoutDepartment) {
        await callOnClickCommon(countryData, phone, selectedTimeoutDepartment).then(() => {
            LeadCMRequestManager.dispatchEvent(EventType.BUTTON_CLICKED);
            LeadCMStateManager.setWindowState(WindowState.Opened);
            const settings = LeadCMSettings.getInstance().getSettings();
            if (settings.tooltipStyles.blockPopupIfShowPhoneField) {
                LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
                LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip(true);
                LeadCMRequestManager.dispatchEvent(EventType.TOOLTIP_SHOWN);
            }
        });
    }

    static toolTypeTimerRating() {
        if (
            LeadCMSettings.getInstance().getSettings().tooltipStyles.tooltipType ===
            TooltipType.TIMER
        ) {
            const store = LeadCMStateManager.getInstance().store;
            divQuerySelector('#lc_widgetTooltip-timer-end').style.display = 'none';
            divQuerySelector('#lc_widgetTooltip-timer-rating').style.display = 'flex';
            displayNoneIfExistsQuerySelector('#lc_widgetTooltip-timer-call');
            let ratingButtons = document.querySelectorAll('.lc_widgetTooltip-rating-star');
            ratingButtons.forEach((button) => {
                let rating = button.getAttribute('data-rating');
                button.addEventListener('click', () => {
                    store.rating = rating || undefined;
                    store.callBackTags = [];
                    let ratingToolType = document.querySelector('#lc_widgetTooltip-rating');
                    let ratingToolTypeStarsContainer = document.querySelector(
                        '#lc_widgetTooltip-rating-stars',
                    );
                    ratingToolType?.setAttribute('data-rating', store.rating || '');
                    ratingToolTypeStarsContainer?.setAttribute('data-stars', store.rating || '');
                    this.toolTypeTimerStart();
                    LeadCMRequestManager.dispatchEvent(
                        EventType.RATING_SET,
                        checkType<IcallbackJsEventRatingDto>({
                            callBackTags: store.callBackTags ?? [],
                            rating: store.rating ?? '',
                            callBackMessage: store.callBackMessage ?? '',
                            agentName: store.agentName ?? '',
                            callerId: store.callerId ?? '',
                        }),
                    );
                    LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
                    LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
                });
            });
        }
    }

    static toolTypeTimerStart() {
        if (
            LeadCMSettings.getInstance().getSettings().tooltipStyles.tooltipType ===
            TooltipType.TIMER
        ) {
            divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'flex';
            divQuerySelector('#lc_tooltip_phone_field').style.display = 'block';
            divQuerySelector('.lc_button_tooltip-inner').style.borderBottom = '1px solid #DFDFDF';
            displayNoneIfExistsQuerySelector('#lc_widgetTooltip-timer-end');
            displayNoneIfExistsQuerySelector('#lc_button_tooltip-top-add-container');
        }
    }

    static toolTypeTimerCall() {
        if (
            LeadCMSettings.getInstance().getSettings().tooltipStyles.tooltipType ===
            TooltipType.TIMER
        ) {
            divQuerySelector('#lc_widgetTooltip-timer-call').style.display = 'block';
            divQuerySelector('#widgetModal-section-phone-tooltype').style.display = 'none';
            divQuerySelector('#lc_button_tooltip-top-add-container').style.display = 'none';
            divQuerySelector('#lc_widgetTooltip-timer-department').style.display = 'none';
        }
    }

    public toolTypeEnd() {
        if (divQuerySelector('#lc_widgetTooltip-timer-default-result').style.display) return;
        divQuerySelector('#lc_widgetTooltip-timer-end').style.display = 'flex';
        divQuerySelector('#lc_widgetTooltip-timer-call').style.display = 'none';
        if (divQuerySelector('#lc_widgetTooltip-timer-text-end-title'))
            divQuerySelector('#lc_widgetTooltip-timer-text-end-title').innerHTML =
                LeadCMSettings.getInstance().getSettings().widgetTexts.successfullyReached;
        divQuerySelector('#lc_widgetTooltip-timer-end-button-goodbye').addEventListener(
            'click',
            () => {
                if (
                    LeadCMSettings.getInstance().getSettings().widgetStyles.isSetRating &&
                    !LeadCMSettings.getInstance().getSettings().nonWorkingTime
                ) {
                    LeadCMWidgetButtonToolTypeTimer.toolTypeTimerRating();
                } else {
                    // divQuerySelector('#lc_widgetTooltip-timer-end').style.display = 'none';
                    LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
                    LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
                }
            },
        );
    }

    public toolTypeTimerDefaultResult() {
        if (divQuerySelector('#lc_widgetTooltip-timer-lead-we-call-you-later').style.display)
            return;
        if (divQuerySelector('#lc_widgetTooltip-timer-lead-unreachable').style.display) return;
        if (divQuerySelector('#lc_widgetTooltip-timer-text-default'))
            divQuerySelector('#lc_widgetTooltip-timer-text-default').innerHTML =
                LeadCMSettings.getInstance().getSettings().widgetTexts.defaultMessage;
        divQuerySelector('#lc_widgetTooltip-timer-call').style.display = 'none';
        divQuerySelector('#lc_widgetTooltip-timer-default-result').style.display = 'block';
        divQuerySelector('#lc_widgetTooltip-timer-default-result-button').addEventListener(
            'click',
            () => {
                divQuerySelector('#lc_widgetTooltip-timer-default-result').style.display = 'none';
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
            },
        );
    }

    public leadUnreachable() {
        if (divQuerySelector('#lc_widgetTooltip-timer-lead-we-call-you-later').style.display)
            return;
        if (divQuerySelector('#lc_widgetTooltip-timer-default-result').style.display) return;
        if (divQuerySelector('#lc_widgetTooltip-timer-text-lead-unreachable'))
            divQuerySelector('#lc_widgetTooltip-timer-text-lead-unreachable').innerHTML =
                LeadCMSettings.getInstance().getSettings().widgetTexts.cantReach;
        divQuerySelector('#lc_widgetTooltip-timer-call').style.display = 'none';
        divQuerySelector('#lc_widgetTooltip-timer-lead-unreachable').style.display = 'block';
        divQuerySelector('#lc_widgetTooltip-timer-lead-unreachable-button').addEventListener(
            'click',
            () => {
                divQuerySelector('#lc_widgetTooltip-timer-lead-unreachable').style.display = 'none';
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
            },
        );
    }

    public weCallYouLater() {
        if (divQuerySelector('#lc_widgetTooltip-timer-lead-unreachable').style.display) return;
        if (divQuerySelector('#lc_widgetTooltip-timer-default-result').style.display) return;
        if (divQuerySelector('#lc_widgetTooltip-timer-text-we-call-you-later'))
            divQuerySelector('#lc_widgetTooltip-timer-text-we-call-you-later').innerHTML =
                LeadCMSettings.getInstance().getSettings().widgetTexts.weCallYouLater;
        divQuerySelector('#lc_widgetTooltip-timer-call').style.display = 'none';
        divQuerySelector('#lc_widgetTooltip-timer-lead-we-call-you-later').style.display = 'block';
        divQuerySelector('#lc_widgetTooltip-timer-lead-we-call-you-later-button').addEventListener(
            'click',
            () => {
                divQuerySelector('#lc_widgetTooltip-timer-lead-we-call-you-later').style.display =
                    'none';
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
                LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
            },
        );
    }

    public callOrdered() {
        divQuerySelector('.lc_widgetTooltip-timer-title').innerHTML =
            LeadCMSettings.getInstance().getSettings().widgetTexts.afterOrderingTitle;
        divQuerySelector('.widgetModal-text').innerHTML =
            LeadCMSettings.getInstance().getSettings().widgetTexts.afterOrderingText;
    }
}
