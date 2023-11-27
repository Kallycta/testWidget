import { LeadCMSettings } from '../managers/LeadCMSettings';
import {
    createElementFromHTML,
    displayNoneIfExistsQuerySelector,
    displayShowIfExistsQuerySelector,
    divQuerySelector,
} from '../utils/helpers';
import { LeadCMWidgetRoot } from './LeadCMWidgetRoot';
import { LeadCMRequestManager } from '../managers/LeadCMRequestManager';
import { LeadCMStateManager } from '../managers/LeadCMStateManager';
import { LeadCMTimeSelector } from './LeadCMTimeSelector';
import { LeadCMWidgetButton } from './LeadCMWidgetButton';
import * as intlTelInput from 'intl-tel-input';
import {
    EventType,
    TemplateType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { WindowState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import { isNotEmptyArray } from '@shared/convolo-core/helpers/helpers/is-not-empty-array';
import { checkType } from '@shared/convolo-core/helpers/helpers/check-type';
import type { IcallbackJsEventRatingDto } from '@shared/convolo-icallback-js/dto/icallback-js/icallback-js-event-rating.dto';
import {
    callOnClickCommon,
    dispatchDepartmentSelected,
    onResponseCommon,
} from '../managers/LeadCMCallManager';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';

const TEMPLATES = {
    [TemplateType.LEADCM]: require('../templates/leadcm/callwidgetTemplate.hbs'),
    [TemplateType.LEADCM_CHAT]: require('../templates/leadcm/chatwidgetTemplate.hbs'),
    [TemplateType.LEADCM_DEFAULT]: require('../templates/leadcm/modals/default/modal.hbs'),
};

export class LeadCMModalWindow {
    private static _instance?: LeadCMModalWindow;

    public static getInstance = (): LeadCMModalWindow =>
        (LeadCMModalWindow._instance ||= new LeadCMModalWindow());
    public static deleteInstance = () => delete LeadCMModalWindow._instance;

    callDisabled: boolean = false;
    endTimeoutDisabled: boolean = false;

    // phone validator field instance
    intlTelInput: any;

    readonly callwidget: HTMLElement;
    readonly phoneInput?: HTMLInputElement;

    selectedTimeoutDepartment = false;

    private constructor() {
        const settings = LeadCMSettings.getInstance().getSettings();

        // @ts-ignore
        const htmlString = TEMPLATES[settings.widgetStyles.template]({
            ...settings,
            ...settings.widgetStyles,
            ...settings.widgetTexts,
            widgetKey: LeadCMSettings.getInstance().getInitSettings().widget_key,
            siteDomain: window.location.hostname,
        });
        this.callwidget = <HTMLElement>createElementFromHTML(htmlString);

        LeadCMWidgetRoot.getInstance().widget.appendChild(this.callwidget);

        try {
            document.querySelector('.widgetModal-close')?.addEventListener('click', () => {
                LeadCMRequestManager.dispatchEvent(EventType.CLOSE_MODAL_CLICKED);
                LeadCMStateManager.setWindowState(WindowState.Minimized);
            });

            if (settings.widgetStyles.template !== TemplateType.LEADCM_DEFAULT) {
                document
                    .querySelector('#lc_submit_button')
                    ?.addEventListener('click', this.callOnClick.bind(this));
            } else {
                if (isNotEmptyArray(settings.departments)) {
                    if (settings.widgetStyles.departmentsSelectorBeforePhoneField) {
                        displayNoneIfExistsQuerySelector('#widgetModal-section-phone');
                        displayShowIfExistsQuerySelector('#widgetModal-section-department');

                        if (settings.widgetTexts.departmentSelectorFirstLine)
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.departmentSelectorFirstLine;
                        if (settings.widgetTexts.departmentSelectorSecondLine)
                            divQuerySelector('.widgetModal-subTitle').innerHTML =
                                settings.widgetTexts.departmentSelectorSecondLine;

                        document
                            .querySelector('#lc_submit_button')
                            ?.addEventListener('click', this.callOnClick.bind(this));

                        document
                            .querySelector('#widgetModal-formButton-confirmDepartment')
                            ?.addEventListener('click', () => {
                                displayShowIfExistsQuerySelector('#widgetModal-section-phone');
                                displayNoneIfExistsQuerySelector('#widgetModal-section-department');

                                divQuerySelector('.widgetModal-title').innerHTML =
                                    settings.widgetTexts.title;
                                divQuerySelector('.widgetModal-subTitle').innerHTML =
                                    settings.widgetTexts.subTitle;

                                if (
                                    settings.nonWorkingTime &&
                                    settings.widgetStyles.allowChoosingTime &&
                                    settings.widgetStyles.openTimeSelectorForNonworkingTimeByDefault
                                )
                                    this.showTimeSelector();

                                dispatchDepartmentSelected(settings);
                            });
                    } else {
                        document
                            .querySelector('#lc_submit_button')
                            ?.addEventListener('click', () => {
                                divQuerySelector('#widgetModal-section-phone')?.classList.add(
                                    '-loading',
                                );
                                displayNoneIfExistsQuerySelector('#widgetModal-section-phone');
                                displayShowIfExistsQuerySelector('#widgetModal-section-department');

                                if (settings.widgetTexts.departmentSelectorFirstLine)
                                    divQuerySelector('.widgetModal-title').innerHTML =
                                        settings.widgetTexts.departmentSelectorFirstLine;
                                if (settings.widgetTexts.departmentSelectorSecondLine)
                                    divQuerySelector('.widgetModal-subTitle').innerHTML =
                                        settings.widgetTexts.departmentSelectorSecondLine;

                                LeadCMRequestManager.dispatchEvent(EventType.DEPARTMENTS_OPENED);

                                let timeoutDepartmentTimeout: any = null;

                                if (
                                    settings.timeoutDepartmentKey &&
                                    settings.timeoutDepartmentTimeoutMs
                                ) {
                                    timeoutDepartmentTimeout = setTimeout(() => {
                                        this.selectedTimeoutDepartment = true;
                                        displayShowIfExistsQuerySelector(
                                            '#widgetModal-section-phone',
                                        );
                                        displayNoneIfExistsQuerySelector(
                                            '#widgetModal-section-department',
                                        );

                                        divQuerySelector('.widgetModal-title').innerHTML =
                                            settings.widgetTexts.title;
                                        divQuerySelector('.widgetModal-subTitle').innerHTML =
                                            settings.widgetTexts.subTitle;

                                        this.callOnClick().then().catch();
                                    }, settings.timeoutDepartmentTimeoutMs);
                                }

                                document
                                    .querySelector('#widgetModal-formButton-confirmDepartment')
                                    ?.addEventListener('click', () => {
                                        displayShowIfExistsQuerySelector(
                                            '#widgetModal-section-phone',
                                        );
                                        displayNoneIfExistsQuerySelector(
                                            '#widgetModal-section-department',
                                        );

                                        divQuerySelector('.widgetModal-title').innerHTML =
                                            settings.widgetTexts.title;
                                        divQuerySelector('.widgetModal-subTitle').innerHTML =
                                            settings.widgetTexts.subTitle;

                                        if (timeoutDepartmentTimeout)
                                            clearTimeout(timeoutDepartmentTimeout);
                                        setTimeout(() => this.callOnClick(), 1000);
                                    });
                            });
                    }
                } else {
                    document
                        .querySelector('#lc_submit_button')
                        ?.addEventListener('click', this.callOnClick.bind(this));
                }
            }

            if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT)
                divQuerySelector('#widgetModal-formButton-close').addEventListener('click', () => {
                    const store = LeadCMStateManager.getInstance().store;
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
                    LeadCMStateManager.setWindowState(WindowState.Minimized);
                    LeadCMModalWindow.buttonInstance(
                        settings.tooltipStyles.tooltipType,
                    ).hideButton();
                });

            if (settings.widgetStyles.template === TemplateType.LEADCM_CHAT)
                document
                    .querySelector('#widgetModal-optionsTitle')
                    ?.addEventListener('click', () => {
                        displayNoneIfExistsQuerySelector('#widgetModal-optionsTitle');
                        displayShowIfExistsQuerySelector('#widgetModal-optionsContent');
                        const widgetModalContainer =
                            document.querySelector('.widgetModal-container');
                        if (widgetModalContainer)
                            widgetModalContainer.scrollTop = widgetModalContainer.scrollHeight;
                    });

            this.phoneInput = <HTMLInputElement>document.getElementById('widgetModal-field_modal');

            this.phoneInput.addEventListener('keyup', (e) => {
                // TODO: заменить на submit form
                // noinspection JSDeprecatedSymbols
                if (e.key === 'Enter' || e.keyCode === 13) {
                    document.querySelector<HTMLButtonElement>('#lc_submit_button')?.click();
                }
            });

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
                    document.querySelector<HTMLButtonElement>('#lc_submit_button')?.click();
                }
            });
        } catch (e) {
            console.log('smth wrong', e);
        }

        if (!this.phoneInput) {
            this.phoneInput = document.querySelector<HTMLInputElement>('.lc_input') ?? undefined;
        }

        const chooseTimeButton = document.querySelector<HTMLButtonElement>('#chooseTimeButton');
        chooseTimeButton?.addEventListener('click', this.showTimeSelector.bind(this));

        if (
            settings.nonWorkingTime &&
            settings.widgetStyles.allowChoosingTime &&
            settings.widgetStyles.openTimeSelectorForNonworkingTimeByDefault &&
            !settings.widgetStyles.departmentsSelectorBeforePhoneField
        )
            this.showTimeSelector();
    }

    private showTimeSelector() {
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT) {
            displayShowIfExistsQuerySelector('#widgetModal-section-selectTime');
            displayNoneIfExistsQuerySelector('#widgetModal-section-phone');

            if (settings.widgetTexts.timeSelectorFirstLine)
                divQuerySelector('.widgetModal-title').innerHTML =
                    settings.widgetTexts.timeSelectorFirstLine;
            if (settings.widgetTexts.timeSelectorSecondLine)
                divQuerySelector('.widgetModal-subTitle').innerHTML =
                    settings.widgetTexts.timeSelectorSecondLine;

            const confirmTimeButton = document.querySelector<HTMLButtonElement>(
                '#widgetModal-formButton-confirmTime',
            );
            if (confirmTimeButton)
                confirmTimeButton.addEventListener('click', () => {
                    displayNoneIfExistsQuerySelector('#widgetModal-section-selectTime');
                    displayShowIfExistsQuerySelector('#widgetModal-section-phone');

                    divQuerySelector('.widgetModal-title').innerHTML = settings.widgetTexts.title;
                    divQuerySelector('.widgetModal-subTitle').innerHTML =
                        settings.widgetTexts.subTitle;
                });
        } else {
            LeadCMRequestManager.dispatchEvent(EventType.CHOOSE_TIME_OPENED);
            displayShowIfExistsQuerySelector('#lc_future_calls');
            displayNoneIfExistsQuerySelector('#chooseTimeButton');
        }

        LeadCMTimeSelector.getInstance();
    }

    public showModal(noFocus = false) {
        document.querySelector('callwidget')?.removeAttribute('aria-hidden');
        if (!noFocus) document.getElementById('widgetModal-field_modal')?.focus();
    }

    // noinspection JSMethodCanBeStatic
    public hideModal = () =>
        document.querySelector('callwidget')?.setAttribute('aria-hidden', 'true');

    public async callOnClick() {
        const countryData = this.intlTelInput.getSelectedCountryData();
        const phone = document.querySelector<HTMLInputElement>('#widgetModal-field_modal');
        await callOnClickCommon(countryData, phone, this.selectedTimeoutDepartment);
    }

    public onResponse(responseString: string) {
        onResponseCommon(responseString);
    }

    static buttonInstance(tooltipType: TooltipType) {
        if (tooltipType === TooltipType.TIMER) {
            return LeadCMWidgetButtonToolTypeTimer.getInstance();
        } else {
            return LeadCMWidgetButton.getInstance();
        }
    }
}
