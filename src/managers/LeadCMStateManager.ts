import { LeadCMWidgetButton } from '../components/LeadCMWidgetButton';
import { LeadCMModalWindow } from '../components/LeadCMModalWindow';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';
import {
    addToChat,
    blurThePage,
    displayNoneIfExistsQuerySelector,
    displayShowIfExistsQuerySelector,
    divQuerySelector,
    htmlEntities,
    unblurThePage,
} from '../utils/helpers';
import { LeadCMSettings } from './LeadCMSettings';
import { LeadCMRequestManager } from './LeadCMRequestManager';

import {
    BackgroundType,
    EventType,
    TemplateType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { LeadCMDesignSettingsInterface } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsTypes';
import {
    MainState,
    WindowState,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import { throwNewErr } from '@shared/convolo-core/helpers/helpers/throw-new-err';
import { pick } from '@shared/convolo-core/helpers/helpers/pick';
import { patternMatchExec } from '@shared/convolo-core/helpers/helpers/pattern-match-exec';
import { emptyFunction } from '@shared/convolo-core/helpers/helpers/empty-function';
import { FormItemWidget } from '@src/callback_widget_schemas/FormItemWidget';
import { fGet } from '@shared/convolo-core/helpers/helpers/f-get';

export class LeadCMStateManager {
    private static _instance?: LeadCMStateManager;

    public static getInstance = () =>
        LeadCMStateManager._instance ?? throwNewErr('state manager not init!');
    public static deleteInstance = () => delete LeadCMStateManager._instance;

    public autoPopupAlreadyTriggered = false;

    // TODO: make it immutable maybe
    public store: {
        phone?: string;
        agentName?: string;
        callerId?: string;
        MESSAGE?: string;
        TIME_MS?: number;
        rating?: string;
        leadAnswered: boolean;
        callBackMessage?: string;
        callBackTags?: string[];
        callBackForm?: FormItemWidget[];
    } = { leadAnswered: false };

    public mainState: MainState = MainState.InitialWorkingTime;
    public windowState: WindowState = WindowState.Minimized;

    public static init(mainState: MainState, windowState: WindowState) {
        (this._instance ||= new LeadCMStateManager()).mainState = mainState;
        window.leadCM.mainState = mainState;
        const { tooltipStyles } = LeadCMSettings.getInstance().getSettings();
        if (tooltipStyles.tooltipType === TooltipType.TIMER) {
            LeadCMWidgetButtonToolTypeTimer.getInstance().showButton();
        } else {
            LeadCMWidgetButton.getInstance().showButton();
        }
        this._instance.windowState = WindowState.Minimized;
        window.leadCM.windowState = WindowState.Minimized;
        this.setWindowState(windowState);

        window.leadCM.getStore = () =>
            pick(this._instance!.store, 'phone', 'agentName', 'callerId');
    }

    static setWindowState(newWindowState: WindowState, params: { noFocus?: boolean, force?: boolean } = {}) {
        const { widgetStyles, tooltipStyles } = LeadCMSettings.getInstance().getSettings();
        if (LeadCMStateManager.getInstance().windowState !== newWindowState) {
            if (newWindowState === WindowState.Minimized) {
                if (tooltipStyles.tooltipType === TooltipType.TIMER) {
                    LeadCMWidgetButtonToolTypeTimer.getInstance().showButton();
                } else {
                    LeadCMWidgetButton.getInstance().showButton();
                }
                LeadCMModalWindow.getInstance().hideModal();
                if (widgetStyles.backgroundType === BackgroundType.BLUR) unblurThePage();

                if (LeadCMStateManager.getInstance().mainState === MainState.Ended) {
                    if (tooltipStyles.tooltipType === TooltipType.TIMER) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
                    } else {
                        LeadCMWidgetButton.getInstance().hideButton();
                    }
                }
            } else {
                if (tooltipStyles.showPhoneField && tooltipStyles.blockPopupIfShowPhoneField && !params.force)
                    return;

                LeadCMStateManager.getInstance().autoPopupAlreadyTriggered = true;

                if (tooltipStyles.tooltipType === TooltipType.TIMER) {
                    LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
                } else {
                    LeadCMWidgetButton.getInstance().hideButton();
                }
                LeadCMModalWindow.getInstance().showModal(params.noFocus);
                if (widgetStyles.backgroundType === BackgroundType.BLUR) blurThePage();
            }
            LeadCMStateManager.getInstance().windowState = newWindowState;
            window.leadCM.windowState = newWindowState;
        }
    }

    static setMainState(newMainState: MainState) {
        if (LeadCMStateManager.getInstance().mainState !== newMainState) {
            const store = LeadCMStateManager.getInstance().store;

            const settings = LeadCMSettings.getInstance().getSettings();
            switch (newMainState) {
                case MainState.CallOrdered:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_CALL_ORDERED);

                    store.MESSAGE = settings.widgetTexts.callingTo.replace(
                        /###phone###/gi,
                        store.phone ?? '',
                    );

                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            displayNoneIfExistsQuerySelector('.widgetModal-aside');

                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.afterOrderingTitle;
                            divQuerySelector('.widgetModal-text').innerHTML =
                                settings.widgetTexts.afterOrderingText;

                            divQuerySelector('.widgetModal-main').style.width = '100%';
                            divQuerySelector('.widgetModal-title').style.textAlign = 'center';
                            divQuerySelector('.widgetModal-subTitle').style.textAlign = 'center';
                            divQuerySelector('.widgetModal-text').style.textAlign = 'center';

                            divQuerySelector('.widgetModal-subTitle').innerHTML =
                                store.MESSAGE ?? '';

                            displayNoneIfExistsQuerySelector('#lc_phone_input_form');
                            displayNoneIfExistsQuerySelector('#lc_future_calls');
                            displayNoneIfExistsQuerySelector('#lc_departments_select_form');
                            displayNoneIfExistsQuerySelector('#chooseTimeButton');
                        },
                        [TemplateType.LEADCM_CHAT]: () => {
                            addToChat(settings.widgetTexts.afterOrderingTitle);
                            addToChat(settings.widgetTexts.afterOrderingText);

                            addToChat('', 'lc_timer_result');
                            divQuerySelector('#lc_timer_result').classList.add('lc_timer_go');
                        },
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.afterOrderingTitle;
                            divQuerySelector('.widgetModal-subTitle').innerHTML =
                                settings.widgetTexts.afterOrderingText;

                            divQuerySelector('#widgetModal-timerLabel').innerHTML =
                                settings.widgetTexts.callingTo.replace(
                                    /###PHONE###/gi,
                                    htmlEntities(store.phone ?? ''),
                                );

                            displayNoneIfExistsQuerySelector('#widgetModal-section-phone');
                            displayNoneIfExistsQuerySelector('#lc_tooltip_phone_field');
                            displayShowIfExistsQuerySelector('#widgetModal-section-timer');
                        },
                    });
                    if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
                        if (!LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipDisabled) {
                            LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
                            LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip();
                            LeadCMWidgetButtonToolTypeTimer.getInstance().callOrdered();
                        }
                    } else {
                        if (!LeadCMWidgetButton.getInstance().toolTipDisabled) {
                            LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
                            LeadCMWidgetButton.getInstance().showTooltip();
                            LeadCMWidgetButton.getInstance().callOrdered();
                        }
                    }

                    divQuerySelector('#lc_widgetTooltip-text').innerHTML =
                        store.MESSAGE + ' ' + settings.widgetTexts.afterOrderingText + '!';

                    break;

                case MainState.ManagerAnswered:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_MANAGER_ANSWERED);

                    store.MESSAGE =
                        this.replaceTags(settings.widgetTexts.managerTryingToReachYou) +
                        '\n' +
                        store.MESSAGE;

                    patternMatchExec<typeof settings.widgetStyles.template, any>(
                        settings.widgetStyles.template,
                        {
                            [TemplateType.LEADCM]: () =>
                                (divQuerySelector('.widgetModal-text').innerHTML =
                                    settings.widgetTexts.pleasePickUp),
                            [TemplateType.LEADCM_CHAT]: () =>
                                addToChat(store.MESSAGE + '\n' + settings.widgetTexts.pleasePickUp),
                            [TemplateType.LEADCM_DEFAULT]: () =>
                                (divQuerySelector('.widgetModal-subTitle').innerHTML =
                                    this.replaceTags(settings.widgetTexts.managerTryingToReachYou) +
                                    ' ' +
                                    settings.widgetTexts.pleasePickUp),
                        },
                    );

                    divQuerySelector('#lc_widgetTooltip-text').innerHTML =
                        this.replaceTags(settings.widgetTexts.managerTryingToReachYou) +
                        ' ' +
                        settings.widgetTexts.pleasePickUp +
                        '!';

                    break;

                case MainState.LeadAnswered:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_LEAD_ANSWERED);
                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.successfullyReached;
                            divQuerySelector('.widgetModal-subTitle').style.display = 'none';
                            divQuerySelector('.widgetModal-text').style.display = 'none';
                        },
                        [TemplateType.LEADCM_CHAT]: () =>
                            addToChat(settings.widgetTexts.successfullyReached),
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-subTitle').innerText = '';

                            displayNoneIfExistsQuerySelector('#widgetModal-section-timer');
                            displayShowIfExistsQuerySelector('#widgetModal-section-message');
                        },
                    });

                    if (settings.widgetStyles.isSendLeadForm && !settings.nonWorkingTime) {
                        LeadCMStateManager.getInstance().processLeadForm(settings);
                    } else {
                        divQuerySelector('#widgetModal-message').innerHTML =
                            settings.widgetTexts.successfullyReached;
                    }

                    // for test unreal calls
                    if (LeadCMSettings.getInstance().getInitSettings().no_real_calls) {
                        //     LeadCMWidgetButtonToolTypeTimer.toolTypeEnd();
                    }
                    if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().toolTypeEnd();
                    } else {
                        LeadCMWidgetButton.getInstance().toolTypeEnd();
                    }

                    if (
                        !settings.widgetStyles.isSendLeadForm &&
                        settings.widgetStyles.isSetRating &&
                        !settings.nonWorkingTime
                    ) {
                        LeadCMStateManager.getInstance().showRating(settings);
                    }

                    break;

                case MainState.LeadUnreachable:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_LEAD_UNREACHABLE);

                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.cantReach;
                            divQuerySelector('.widgetModal-subTitle').style.display = 'none';
                            divQuerySelector('.widgetModal-text').style.display = 'none';
                        },
                        [TemplateType.LEADCM_CHAT]: () => addToChat(settings.widgetTexts.cantReach),
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-subTitle').innerText = '';

                            displayNoneIfExistsQuerySelector('#widgetModal-section-timer');
                            displayShowIfExistsQuerySelector('#widgetModal-section-message');
                            divQuerySelector('#widgetModal-message').innerHTML =
                                settings.widgetTexts.cantReach;
                        },
                    });

                    divQuerySelector('#lc_widgetTooltip-text').innerHTML =
                        settings.widgetTexts.cantReach;

                    if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().leadUnreachable();
                    } else {
                        LeadCMWidgetButton.getInstance().leadUnreachable();
                    }

                    if (settings.widgetStyles.isSetRatingUnreachable && !settings.nonWorkingTime) {
                        LeadCMStateManager.getInstance().showRating(settings);
                    }

                    break;

                case MainState.DefaultResult:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_DEFAULT_RESULT);

                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.defaultMessage;
                            divQuerySelector('.widgetModal-subTitle').style.display = 'none';
                            divQuerySelector('.widgetModal-text').style.display = 'none';
                        },
                        [TemplateType.LEADCM_CHAT]: () =>
                            addToChat(settings.widgetTexts.defaultMessage),
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-subTitle').innerText = '';

                            displayNoneIfExistsQuerySelector('#widgetModal-section-timer');
                            displayShowIfExistsQuerySelector('#widgetModal-section-message');
                            divQuerySelector('#widgetModal-message').innerHTML =
                                settings.widgetTexts.defaultMessage;
                        },
                    });
                    divQuerySelector('#lc_widgetTooltip-text').innerHTML =
                        settings.widgetTexts.defaultMessage;

                    if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().toolTypeTimerDefaultResult();
                    } else {
                        LeadCMWidgetButton.getInstance().toolTypeTimerDefaultResult();
                    }

                    if (settings.widgetStyles.isSetRatingUnreachable && !settings.nonWorkingTime) {
                        LeadCMStateManager.getInstance().showRating(settings);
                    }

                    break;

                case MainState.WeCallYouLater:
                    LeadCMRequestManager.dispatchEvent(EventType.STATE_WE_CALL_YOU_LATER);

                    const weCallYouLaterString = getCallYouLaterString(settings);

                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML = weCallYouLaterString;
                            divQuerySelector('.widgetModal-subTitle').style.display = 'none';
                            divQuerySelector('.widgetModal-text').style.display = 'none';
                        },
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-subTitle').innerText = '';
                            displayNoneIfExistsQuerySelector('#widgetModal-section-timer');
                            displayShowIfExistsQuerySelector('#widgetModal-section-message');

                            divQuerySelector('#widgetModal-message').innerHTML =
                                weCallYouLaterString;
                        },
                        [TemplateType.LEADCM_CHAT]: emptyFunction,
                    });

                    divQuerySelector('#lc_widgetTooltip-text').innerHTML =
                        settings.widgetTexts.weCallYouLater;

                    if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
                        LeadCMWidgetButtonToolTypeTimer.getInstance().weCallYouLater();
                    } else {
                        LeadCMWidgetButton.getInstance().weCallYouLater();
                    }

                    break;

                case MainState.Ended:
                    patternMatchExec(settings.widgetStyles.template, {
                        [TemplateType.LEADCM]: () => {
                            divQuerySelector('.widgetModal-title').innerHTML =
                                settings.widgetTexts.successfullyReached;
                            divQuerySelector('.widgetModal-subTitle').style.display = 'none';
                            divQuerySelector('.widgetModal-text').style.display = 'none';
                        },
                        [TemplateType.LEADCM_CHAT]: () =>
                            addToChat(settings.widgetTexts.successfullyReached),
                        [TemplateType.LEADCM_DEFAULT]: () => {
                            divQuerySelector('.widgetModal-subTitle').innerText = '';

                            displayNoneIfExistsQuerySelector('#widgetModal-section-timer');
                            displayShowIfExistsQuerySelector('#widgetModal-section-message');
                            // divQuerySelector('#widgetModal-message').style.display = 'none';

                            if (
                                LeadCMStateManager.getInstance().windowState ===
                                    WindowState.Minimized &&
                                LeadCMSettings.getInstance().getSettings().tooltipStyles
                                    .tooltipType !== TooltipType.TIMER
                            ) {
                                LeadCMWidgetButton.getInstance().hideButton();
                            } else if (
                                LeadCMSettings.getInstance().getSettings().tooltipStyles
                                    .tooltipType === TooltipType.TIMER
                            ) {
                                LeadCMWidgetButtonToolTypeTimer.getInstance().hideButton();
                            }
                        },
                    });

                    // TODO maybe delete it?
                    if (
                        !settings.widgetStyles.isSendLeadForm &&
                        LeadCMStateManager.getInstance().store.leadAnswered &&
                        settings.widgetStyles.isSetRating &&
                        !settings.nonWorkingTime
                    ) {
                        LeadCMStateManager.getInstance().showRating(settings);
                    }

                    break;
            }

            window.leadCM.onMainStateChange?.(
                LeadCMStateManager.getInstance().mainState,
                newMainState,
            );

            LeadCMStateManager.getInstance().mainState = newMainState;
            window.leadCM.mainState = newMainState;
        }

        function getCallYouLaterString(settings: LeadCMDesignSettingsInterface) {
            const minuteSelectValue = document.querySelector<HTMLSelectElement>(
                'select[name="lc_fc_select_minute"]',
            )?.value;

            if (minuteSelectValue) {
                const date = new Date(+minuteSelectValue);

                const localTimeString = Intl.DateTimeFormat(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(date);

                const localDateString = Intl.DateTimeFormat(navigator.language, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                }).format(date);

                return settings.widgetTexts.weCallYouLaterIn
                    .replace(/###DATE###/gi, localDateString)
                    .replace(/###TIME###/gi, localTimeString);
            } else {
                return settings.widgetTexts.weCallYouLater;
            }
        }
    }

    private processLeadForm(settings: LeadCMDesignSettingsInterface) {
        this.store.callBackForm = settings.formItems.map((item, index) => ({
            ...item,
            isSend: false,
            isCurrent: index === 0,
            value: '',
            step: index + 1,
        }));
        divQuerySelector('#widgetModal-message').style.display = 'none';
        displayShowIfExistsQuerySelector('#widgetModal-step-form-container');
        displayShowIfExistsQuerySelector('#widgetModal-form-message');
        displayShowIfExistsQuerySelector('#widgetModal-sub-message');
        divQuerySelector('#widgetModal-formButton-close').style.display = 'none';
        divQuerySelector('#widgetModal-step-buttons-text').style.display = settings.widgetStyles
            .leadFormEnterTextVisible
            ? 'flex'
            : 'none';
        divQuerySelector('.widgetModal-step-form-container').style.display = 'flex';
        divQuerySelector('.widgetModal-form-message').style.display = 'flex';
        divQuerySelector('.widgetModal-sub-message').style.display = 'flex';
        divQuerySelector('#widgetModal-form-message').innerHTML =
            settings.widgetTexts.fillFormBelowTitle;

        divQuerySelector('#widgetModal-sub-message').innerHTML =
            settings.widgetTexts.fillFormBelowSubTitle;

        divQuerySelector('#widgetModal-form-message').style.textAlign = 'start';
        divQuerySelector('#widgetModal-form-message').style.fontWeight = 'bold';
        divQuerySelector('#widgetModal-sub-message').style.textAlign = 'start';
        divQuerySelector('.widgetModal-step-buttons-text-enter').innerHTML =
            settings.widgetTexts.press;
        divQuerySelector('.widgetModal-step-buttons-text-enter-bold').innerHTML =
            settings.widgetTexts.enter;
        let activeItem = this.store.callBackForm.find(fGet('isCurrent'));

        const inputLeadInfo = document.getElementById('widgetModal-step-input') as HTMLInputElement;

        if (activeItem) {
            divQuerySelector('.widgetModal-step-title').innerText = activeItem.title;
            divQuerySelector('.widgetModal-step-ok-button').innerText = activeItem.okText;
            inputLeadInfo.placeholder = activeItem.name;
        }

        // IF ONE ITEM
        if (settings.formItems.length === 1) {
            divQuerySelector('#widgetModal-step-press-container').style.display = 'none';
        } else {
            // MORE ONE ITEM
            divQuerySelector(`#widgetModal-step-prev-button-container`).classList.add('first');
        }

        const nextStepAction = () => {
            // GUARD  ITEM
            if (!activeItem) return;

            // GUARD IF INPUT VALUE
            if (!inputLeadInfo.value) return;
            if (activeItem.value !== inputLeadInfo.value) {
                activeItem.value = inputLeadInfo.value;

                // SEND VALUE
                const sendObject = {
                    ['lc_param_' + activeItem.name.replace(/ /g, '_').toLowerCase()]:
                        activeItem.value,
                };
                LeadCMRequestManager.dispatchEvent(EventType.CUSTOM_PARAMS, sendObject);
            }

            const newActiveItem = this.store.callBackForm?.find(
                (item) => activeItem && item.step === activeItem.step + 1,
            );

            // GUARD NEW ITEM
            if (!newActiveItem) return;

            divQuerySelector(`#widgetModal-step-prev-button-container`).classList.remove('first');

            inputLeadInfo.value = newActiveItem.value;
            divQuerySelector('.widgetModal-step-title').innerText = newActiveItem.title;
            divQuerySelector('#widgetModal-step-ok-button').innerText = newActiveItem.okText;

            inputLeadInfo.placeholder = newActiveItem.name;

            // ADD ACTIVE LAST STYLE
            if (newActiveItem.step === settings.formItems.length) {
                divQuerySelector(`#widgetModal-step-next-button-container`).classList.add('last');
            }

            // FIX NEW ITEM IN ARRAY
            this.store.callBackForm?.forEach((item) => {
                if (activeItem && item.step === activeItem.step) item.isCurrent = false;
                if (item.step === newActiveItem.step) item.isCurrent = true;
            });
            activeItem = newActiveItem;
        };

        const prevStepAction = () => {
            if (!activeItem) return;

            if (activeItem.value !== inputLeadInfo.value) {
                activeItem.value = inputLeadInfo.value;
            }

            const newActiveItem = this.store.callBackForm?.find(
                (item) => activeItem && item.step === activeItem.step - 1,
            );

            if (!newActiveItem) return;

            // ADD ACTIVE FIRST STYLE
            if (newActiveItem.step === 1) {
                divQuerySelector(`#widgetModal-step-prev-button-container`).classList.add('first');
            }

            divQuerySelector(`#widgetModal-step-next-button-container`).classList.remove('last');
            inputLeadInfo.value = newActiveItem.value;
            divQuerySelector('.widgetModal-step-title').innerText = newActiveItem.title;
            divQuerySelector('#widgetModal-step-ok-button').innerText = newActiveItem.okText;
            inputLeadInfo.placeholder = newActiveItem.name;

            this.store.callBackForm?.forEach((item) => {
                if (activeItem && item.step === activeItem.step) item.isCurrent = false;
                if (item.step === newActiveItem.step) item.isCurrent = true;
            });
            activeItem = newActiveItem;
        };

        const endFillFormScript = () => {
            if (inputLeadInfo.value && activeItem?.step === settings.formItems.length) {
                activeItem.isSend = true;
                displayShowIfExistsQuerySelector('#widgetModal-formButton-close');
                divQuerySelector('#widgetModal-form-message').style.display = 'none';
                divQuerySelector('#widgetModal-step-form-container').style.display = 'none';
                divQuerySelector('#widgetModal-sub-message').style.display = 'none';
                // divQuerySelector('#widgetModal-message').style.textAlign = 'center';

                if (settings.widgetStyles.isSetRating && !settings.nonWorkingTime)
                    this.showRating(settings);

                divQuerySelector('#widgetModal-message').style.display = '';
                divQuerySelector('#widgetModal-message').innerHTML =
                    settings.widgetTexts.successfullyReached;
            }
        };

        divQuerySelector('#widgetModal-step-prev-button-container').addEventListener(
            'click',
            () => {
                if (activeItem?.step === 1) return;
                prevStepAction();
            },
        );

        divQuerySelector('#widgetModal-step-next-button-container').addEventListener(
            'click',
            () => {
                if (activeItem?.step === settings.formItems.length) return;
                nextStepAction();
            },
        );

        divQuerySelector('#widgetModal-step-ok-button').addEventListener('click', () => {
            nextStepAction();
            endFillFormScript();
        });

        inputLeadInfo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                nextStepAction();
                endFillFormScript();
            }
        });
    }

    showRating(settings: LeadCMDesignSettingsInterface) {

        let headerModal = divQuerySelector('.widgetModal-header');
        if (headerModal) headerModal.style.transition = 'min-height 0.4s ease-out;';
        if (headerModal) headerModal.style.minHeight = 'auto';

        const store = this.store;
        divQuerySelector('#widgetModal-formButton-close').innerText =
            settings.widgetTexts.ratingCloseWindowButton;

        displayShowIfExistsQuerySelector('#widgetModal-rating');
        divQuerySelector('#widgetModal-message').innerHTML =
            settings.widgetTexts.rateAgent + ' ' + store.agentName;
        let ratingButtons = document.querySelectorAll('.widgetModal-rating-star');
        ratingButtons.forEach((button) => {
            let rating = button.getAttribute('data-rating');
            button.addEventListener('click', () => {
                if (store.rating === rating) return;
                store.rating = rating || undefined;
                store.callBackTags = [];
                let ratingModal = document.querySelector('#widgetModal-rating');
                let ratingModalStarsContainer = document.querySelector('#widgetModal-rating-stars');
                ratingModal?.setAttribute('data-rating', store.rating || '');
                ratingModalStarsContainer?.setAttribute('data-stars', store.rating || '');
                let tagsContainer = divQuerySelector('#widgetModal-rating-tags');
                let timeHeight = tagsContainer.clientHeight;
                tagsContainer.style.height = timeHeight + 'px';
                tagsContainer.innerHTML = '';

                // Bug with height in some widget - todo check is help
                tagsContainer.style.position = 'absolute';

                // Create template tag container for calculate height
                const tagsContainerClone = document.createElement("div") as HTMLDivElement;
                tagsContainerClone.style.display = 'flex';
                tagsContainerClone.style.flexWrap = 'wrap';
                tagsContainerClone.style.visibility = 'hidden';
                tagsContainerClone.style.overflow = 'hidden';

                let ratingTitles = settings.ratingTitles?.find(
                    (item) => item.level.toString() === rating,
                );
                if (ratingTitles) {
                    ratingTitles.tags.map((item) => {
                        let tag = document.createElement('div');
                        tag.classList.add('widgetModal-rating-tag');
                        tag.innerHTML = item;
                        tag.addEventListener('click', () => {
                            if (store.callBackTags?.includes(tag.innerHTML)) {
                                tag.classList.remove('active');
                                store.callBackTags = store.callBackTags.filter(
                                    (e) => e !== tag.innerHTML,
                                );
                            } else {
                                store.callBackTags?.push(tag.innerHTML);
                                tag.classList.add('active');
                            }
                        });
                        tagsContainerClone.appendChild(tag);
                    });
                }

                tagsContainer.parentNode?.appendChild(tagsContainerClone);
                const cachedHeight = tagsContainerClone.clientHeight;
                tagsContainer.style.position = 'static';
                tagsContainer.parentNode?.removeChild(tagsContainerClone);

                // Add tag in current container
                if (ratingTitles) {
                    ratingTitles.tags.map((item) => {
                        let tag = document.createElement('div');
                        tag.classList.add('widgetModal-rating-tag');
                        tag.innerHTML = item;
                        tag.addEventListener('click', () => {
                            if (store.callBackTags?.includes(tag.innerHTML)) {
                                tag.classList.remove('active');
                                store.callBackTags = store.callBackTags.filter(
                                    (e) => e !== tag.innerHTML,
                                );
                            } else {
                                store.callBackTags?.push(tag.innerHTML);
                                tag.classList.add('active');
                            }
                        });
                        tagsContainer.appendChild(tag);
                    });
                }
                tagsContainer.style.maxHeight = '0px';
                tagsContainer.style.height = settings.widgetStyles.ratingTagsHeight;
                tagsContainer.style.display = 'flex';
                tagsContainer.style.flexWrap = 'wrap';

                setTimeout(() => {
                    tagsContainer.style.transition = 'min-height 0.4s ease-out;';
                    tagsContainer.style.maxHeight = cachedHeight + 'px';
                }, 10);
            });
        });
        const textAreaRating = document.getElementById(
            'widgetModal-rating-textarea',
        ) as HTMLInputElement;
        textAreaRating.placeholder = settings.widgetTexts.ratingTextAreaPlaceholderText;
        textAreaRating?.addEventListener('input', (_e) => {
            store.callBackMessage = textAreaRating.value;
        });
        divQuerySelector('.widgetModal-rating-description').innerText =
            settings.widgetTexts.ratingDescription;
    }

    // noinspection JSMethodCanBeStatic
    public drawTimer() {
        let time_ms = LeadCMStateManager.getInstance().getStore().TIME_MS ?? 0;

        const min = Math.floor(time_ms / 60.0 / 1000.0);
        const minStr = min > 9 ? min.toString() : '0' + min.toString();

        const sec = Math.floor((time_ms / 1000.0) % 60.0);
        const secStr = sec > 9 ? sec.toString() : '0' + sec.toString();

        const mSec = Math.floor((time_ms % 1000.0) / 10.0);
        const mSecStr = mSec > 9 ? mSec.toString() : '0' + mSec.toString();

        const truncSec = Math.trunc(time_ms / 1000.0);

        if (
            LeadCMSettings.getInstance().getSettings().tooltipStyles.tooltipType ===
            TooltipType.TIMER
        ) {
            const circleElem = divQuerySelector('#lc_widgetTooltip-timer-circle');
            const countRatio = 360 / LeadCMSettings.getInstance().getSettings().secondsToGo;
            circleElem.style.setProperty(
                '--deg',
                (360 - Math.ceil(truncSec * countRatio)).toString(),
            );
            circleElem.style.setProperty('--col', `hsla(213, 100%, 50%, 1)`);
            const currentNumber = Number(
                divQuerySelector('#lc_widgetTooltip-timer-numbers').innerHTML,
            );
            if (currentNumber === 0 || (currentNumber && currentNumber >= truncSec)) {
                divQuerySelector(
                    '#lc_widgetTooltip-timer-numbers',
                ).innerHTML = `${truncSec.toString()}`;
            }
        }

        if (
            LeadCMSettings.getInstance().getSettings().widgetStyles.template === TemplateType.LEADCM
        ) {
            divQuerySelector('.widgetModal-subTitle').innerHTML =
                `${LeadCMStateManager.getInstance().store.MESSAGE} ${minStr}:${secStr}` +
                (LeadCMSettings.getInstance().getSettings().widgetStyles.useTimerMilliseconds
                    ? `:${mSecStr}`
                    : '');
        } else if (
            LeadCMSettings.getInstance().getSettings().widgetStyles.template ===
            TemplateType.LEADCM_DEFAULT
        ) {
            divQuerySelector('#widgetModal-counterNumber-min').innerText = minStr;
            divQuerySelector('#widgetModal-counterNumber-sec').innerText = secStr;
            divQuerySelector('#widgetModal-counterNumber-msec').innerText = mSecStr;
        } else {
            divQuerySelector(
                '#lc_timer_result',
            ).innerHTML = `0:<span class="lc_timer_result">${sec}</span>,${mSec}</span>`;
        }
    }

    public startTimer() {
        const startDate = Date.now();
        updateTimer();

        function updateTimer() {
            const current =
                LeadCMSettings.getInstance().getSettings().secondsToGo * 1000 -
                (Date.now() - startDate);
            LeadCMStateManager.getInstance().getStore().TIME_MS = current;
            LeadCMStateManager.getInstance().drawTimer();

            if (current > 0) {
                setTimeout(updateTimer, Math.floor(10 * Math.random() + 5));
            } else {
                LeadCMStateManager.getInstance().getStore().TIME_MS = 0;
                LeadCMStateManager.getInstance().drawTimer();
            }
        }
    }

    static replaceTags(str: string) {
        const { agentName, callerId } = LeadCMStateManager.getInstance().getStore();

        return str
            .replace(/###MANAGER###/gi, htmlEntities(agentName ?? ''))
            .replace(/###AGENT_NAME###/gi, htmlEntities(agentName ?? ''))
            .replace(/###CALLERID###/gi, htmlEntities(callerId ?? ''));
    }

    getStore = () => this.store;
}
