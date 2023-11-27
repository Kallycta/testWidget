import { LeadCMSettings } from '@src/managers/LeadCMSettings';
import {
    AddCallResponse,
    LeadCMRequestManager,
    WssEvent,
} from '@src/managers/LeadCMRequestManager';
import {
    EventType,
    TemplateType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { displayNoneIfExistsQuerySelector, divQuerySelector } from '@src/utils/helpers';
import { asyncWaitSeconds } from '@shared/convolo-core/helpers/helpers/async-wait-seconds';
import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import * as intlTelInput from 'intl-tel-input';
import { LeadCMStateManager } from '@src/managers/LeadCMStateManager';
import { MainState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import { FakeCallType } from '@src/managers/LeadCMFakeCallManager';
import { LeadCMDesignSettingsInterface } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsTypes';
import { LeadCMModalWindow } from '@src/components/LeadCMModalWindow';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';

export async function checkPhoneNumber(countryData: intlTelInput.CountryData, phoneElem) {
    const phone = phoneElem?.value;
    const settings = LeadCMSettings.getInstance().getSettings();

    LeadCMRequestManager.dispatchEvent(EventType.CHECK_PHONE, { phone });

    // if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT)
    //     divQuerySelector('#widgetModal-section-phone').classList.add('-loading');
    // else {
    //     const spinner = document.getElementById('spinner');
    //     if (spinner) {
    //         spinner.style.display = '';
    //         spinner.style.opacity = '';
    //     }
    // }

    const submit_url = 'https://api.leads.convolo.ai/api/v1/support/check-number';
    const { iso2: countryIso2 } = countryData;
    if (phone && typeof phone == 'string') {
        // if (LeadCMModalWindow.getInstance().callDisabled) {
        //     displayNoneIfExistsQuerySelector('#spinner');
        //     divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');
        //     return;
        // }

        // if (
        //     settings.tooltipStyles.tooltipType === TooltipType.TIMER &&
        //     LeadCMWidgetButtonToolTypeTimer.getInstance().callDisabled
        // ) {
        //     displayNoneIfExistsQuerySelector('#spinner');
        //     divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');
        //     return;
        // }
        return await LeadCMRequestManager.checkPhoneNumber(submit_url, phone, countryIso2);
    } else if (!phone) {
        errorPhoneBehavior(settings, phoneElem);
    }
}

export async function callOnClickCommon(
    countryData: intlTelInput.CountryData,
    phoneElem,
    selectedTimeoutDepartment,
) {
    const phone = phoneElem?.value;
    const { widget_key } = LeadCMSettings.getInstance().getInitSettings();
    const settings = LeadCMSettings.getInstance().getSettings();

    LeadCMRequestManager.dispatchEvent(EventType.CALL_ORDER_CLICKED, { phone });

    // noConsole console.log(this.intlTelInput.getSelectedCountryData());

    if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT)
        divQuerySelector('#widgetModal-section-phone').classList.add('-loading');
    else {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.style.display = '';
            spinner.style.opacity = '';
        }
    }

    const { submit_url } = LeadCMSettings.getInstance().getInitSettings();
    const { iso2: countryIso2 } = countryData;

    const departmentId =
        document.querySelector<HTMLSelectElement>('#leadcm_departments_select')?.value ??
        document.querySelector<HTMLInputElement>('input[name="leadcm_departments"]:checked')?.value;

    let department_key = settings.departments?.find((dept) => dept.id === departmentId)?.key;

    if (selectedTimeoutDepartment && settings.timeoutDepartmentKey)
        department_key = settings.timeoutDepartmentKey;

    if (!settings.widgetStyles.departmentsSelectorBeforePhoneField)
        dispatchDepartmentSelected(settings, departmentId, department_key);

    const minuteSelect = document.querySelector<HTMLSelectElement>(
        'select[name="lc_fc_select_minute"]',
    );
    const futureStampMs = minuteSelect ? +minuteSelect.value : undefined;
    const visit_id = LeadCMSettings.getInstance().getInitSettings().visit_id;

    if (submit_url && phone) {
        if (LeadCMModalWindow.getInstance().callDisabled) {
            displayNoneIfExistsQuerySelector('#spinner');
            divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');
            return;
        }

        if (
            settings.tooltipStyles.tooltipType === TooltipType.TIMER &&
            LeadCMWidgetButtonToolTypeTimer.getInstance().callDisabled
        ) {
            displayNoneIfExistsQuerySelector('#spinner');
            divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');
            return;
        }

        let countDown = 5;
        while (LeadCMRequestManager.activeCustomEventCounter > 0 && countDown-- > 0)
            await asyncWaitSeconds(1 as Seconds);
        LeadCMRequestManager.addCallGet(
            {
                submit_url,
                widget_key,
                visit_id,
                phone,
                countryIso2,
                department_key,
                nwt: settings.nonWorkingTime,
                futureStampMs,
            },
            onResponseCommon,
            (errStr) => {
                displayNoneIfExistsQuerySelector('#spinner');
                if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT)
                    divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');

                // noConsole console.log("error!");
                const response = JSON.parse(errStr) as AddCallResponse;

                if (!response.success) {
                    if (
                        response.message?.includes('wrong number') ||
                        response.message?.includes('wrong country')
                    ) {
                        errorPhoneBehavior(settings, phoneElem);
                    }
                }
            },
        );
    } else if (!phone) {
        displayNoneIfExistsQuerySelector('#spinner');
        if (settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT)
            divQuerySelector('#widgetModal-section-phone')?.classList.remove('-loading');
        errorPhoneBehavior(settings, phoneElem);
    }
}

export function errorPhoneBehavior(settings, phoneElem) {
    if (
        settings.widgetStyles.template === TemplateType.LEADCM ||
        settings.widgetStyles.template === TemplateType.LEADCM_DEFAULT
    ) {
        divQuerySelector('#lc_enterPhoneLabel').innerText = settings.widgetTexts.numberWrong;
        divQuerySelector('#lc_enterPhoneLabel').style.color = 'red';
        phoneElem.style.borderColor = 'red';
        if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
            divQuerySelector('#widgetModal-section-phone').style.display = 'block';
        }
    }
    return;
}

export function onResponseCommon(responseString: string) {
    LeadCMRequestManager.dispatchEvent(EventType.CALL_SUCCESSFULLY_ORDERED);
    displayNoneIfExistsQuerySelector('spinner');

    const response = JSON.parse(responseString) as AddCallResponse;

    const minuteSelect = document.querySelector<HTMLSelectElement>(
        'select[name="lc_fc_select_minute"]',
    );
    const futureStampMs = minuteSelect ? +minuteSelect.value : null;

    const settings = LeadCMSettings.getInstance().getSettings();

    if (settings.nonWorkingTime || settings.onDemand || futureStampMs) {
        LeadCMStateManager.setMainState(MainState.CallOrdered);
        LeadCMStateManager.setMainState(MainState.WeCallYouLater);

        setTimeout(LeadCMStateManager.setMainState.bind(this, MainState.Ended), 5000);
    } else {
        const eventHandlers: { [s: string]: (data?: any) => void } = {
            [WssEvent.CB_MANAGER_ANSWERED]: onCbManagerAnswered,
            [WssEvent.CB_LEAD_ANSWERED]: onCbLeadAnswered,
            [WssEvent.CB_LEAD_NOT_ANSWERED]: onCbLeadNotAnswered,
            [WssEvent.CB_CALL_FINISHED]: onCbCallFinished,
        };

        LeadCMStateManager.getInstance().store.phone = response.phone_number;

        // noConsole console.log(`calling ${response.phone_number}`);

        LeadCMStateManager.setMainState(MainState.CallOrdered);
        if (settings.widgetStyles.useTimer) LeadCMStateManager.getInstance().startTimer();

        LeadCMRequestManager.wssRequest(
            response.subscribe_ws_url as FakeCallType,
            eventHandlers,
            onClose,
        );
    }

    // noConsole console.log('response!', responseString);

    let isOk = false;
    let isFinished = false;

    function onClose() {
        // noConsole console.log("close");

        if (!isFinished) {
            divQuerySelector('.widgetModal-text').innerText = '';
        }
    }

    function onCbManagerAnswered(data: any) {
        // noConsole console.log("manager_answered", data);
        LeadCMStateManager.getInstance().store.agentName = data.params.name;
        LeadCMStateManager.getInstance().store.callerId = data.params.callerId;
        LeadCMStateManager.setMainState(MainState.ManagerAnswered);

        LeadCMRequestManager.dispatchCustomEvent(WssEvent.CB_MANAGER_ANSWERED, {
            name: data.params.name,
        });
    }

    function onCbLeadAnswered() {
        LeadCMRequestManager.dispatchCustomEvent(WssEvent.CB_LEAD_ANSWERED);

        LeadCMStateManager.getInstance().store.leadAnswered = true;

        isOk = true;
        isFinished = true;

        LeadCMStateManager.setMainState(MainState.LeadAnswered);

        setTimeout(LeadCMStateManager.setMainState.bind(this, MainState.Ended), 5000);
    }

    function onCbLeadNotAnswered() {
        LeadCMRequestManager.dispatchCustomEvent(WssEvent.CB_LEAD_NOT_ANSWERED);

        isFinished = true;

        LeadCMStateManager.setMainState(MainState.LeadUnreachable);

        setTimeout(LeadCMStateManager.setMainState.bind(this, MainState.Ended), 5000);
    }

    function onCbCallFinished() {
        LeadCMRequestManager.dispatchCustomEvent(WssEvent.CB_CALL_FINISHED);
    }

    setTimeout(() => {
        if (!isFinished) {
            LeadCMStateManager.setMainState(MainState.DefaultResult);
            setTimeout(LeadCMStateManager.setMainState.bind(this, MainState.Ended), 5000);
        }
    }, settings.secondsToGo * 1000);
}

export function dispatchDepartmentSelected(
    settings: LeadCMDesignSettingsInterface,
    departmentId?: string,
    department_key?: string,
) {
    departmentId =
        departmentId ??
        document.querySelector<HTMLSelectElement>('#leadcm_departments_select')?.value ??
        document.querySelector<HTMLInputElement>('input[name="leadcm_departments"]:checked')?.value;

    department_key =
        department_key ?? settings.departments?.find((dept) => dept.id === departmentId)?.key;

    if (department_key && departmentId)
        LeadCMRequestManager.dispatchEvent(EventType.DEPARTMENT_SELECTED, {
            id: departmentId,
            key: department_key,
        });
}
