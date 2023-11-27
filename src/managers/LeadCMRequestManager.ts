import { FakeCallType, isTypeOfFakeCall, LeadCMFakeCallManager } from './LeadCMFakeCallManager';
import { LeadCMSettings } from './LeadCMSettings';
import {
    EventType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { emptyFunction } from '@shared/convolo-core/helpers/helpers/empty-function';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';

export interface CheckPhoneNumberResponse {
    success: boolean;
    ip: {
        E164?: string;
        countryISO2?: string;
        internationalFormat?: string;
        isValidNumber?: boolean;
        isValidNumberForRegion?: boolean;
        nationalFormat?: string;
        numberType?: number;
        originalFormat?: string;
    };
}
export interface AddCallResponse {
    success: boolean;
    subscribe_ws_url: string;
    phone_number: string;
    message?: string;
}

export enum WssEvent {
    CB_MANAGER_ANSWERED = 'cb_manager_answered',
    CB_LEAD_ANSWERED = 'cb_lead_answered',
    CB_LEAD_NOT_ANSWERED = 'cb_lead_not_answered',
    CB_CALL_FINISHED = 'cb_call_finished',
}

export class LeadCMRequestManager {
    public static checkPhoneNumber = async (
        url: string,
        phone: string,
        countryIso2: string,
    ): Promise<string> =>
        new Promise((resolve, reject) =>
            LeadCMRequestManager.xhrGet(
                url + '?' + `number=${encodeURIComponent(phone)}&` + `country=${countryIso2}`,
                resolve,
                reject,
            ),
        );
    public static addCallGet(
        {
            submit_url,
            widget_key,
            visit_id,
            phone,
            countryIso2,
            department_key,
            nwt,
            futureStampMs,
            rating,
        }: {
            submit_url: string;
            widget_key?: string;
            visit_id?: string;
            phone: string;
            countryIso2: string;
            department_key?: string;
            nwt: boolean;
            futureStampMs?: number;
            rating?: number;
        },
        callback: (response: string) => void,
        onErrorStatus: (response: string) => void = emptyFunction,
    ): void {
        if (isTypeOfFakeCall(phone)) return LeadCMFakeCallManager.fakeCall(phone, callback);

        if (phone.replace(/\D/g, '').length < 5) {
            onErrorStatus(JSON.stringify({ success: false, message: `wrong number ${phone}` }));
            return;
        }

        if (LeadCMSettings.getInstance().getInitSettings().no_real_calls) {
            const response: AddCallResponse = {
                success: true,
                subscribe_ws_url: phone,
                phone_number: phone,
            };
            callback(JSON.stringify(response));
            return;
        }

        if (widget_key && visit_id) {
            const url =
                `${submit_url}?` +
                `widget_key=${encodeURIComponent(widget_key)}&` +
                `phone=${encodeURIComponent(phone)}&` +
                `country=${countryIso2}&` +
                (department_key ? `department_key=${encodeURIComponent(department_key)}&` : '') +
                `nwt=${nwt ? '1' : '0'}&` +
                (futureStampMs ? `futureMs=${encodeURIComponent(futureStampMs.toString())}&` : '') +
                `visit_id=${encodeURIComponent(visit_id)}`;
            this.xhrGet(url, callback, onErrorStatus);
        }
    }

    public static settingsGetAsync = async (url: string, visit_id: string): Promise<string> =>
        new Promise((resolve, reject) =>
            LeadCMRequestManager.xhrGet(
                url + '?uri=' + encodeURIComponent(window.location.href) + '&visit_id=' + visit_id,
                resolve,
                reject,
            ),
        );

    public static xhrGet(
        url: string,
        callback: (response: string) => void,
        onErrorStatus: (response: string) => void,
    ) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    onErrorStatus(xhr.responseText);
                    // noConsole console.log("request failed...");
                }
            }
        };
        xhr.onerror = () => {
            // noConsole console.log("request failed...");
        };
        xhr.send();
    }

    public static wssRequest(
        wssUrl: FakeCallType,
        eventHandlers: { [s: string]: (data: any) => void },
        onCloseHandler: () => void,
    ): void {
        if (isTypeOfFakeCall(wssUrl)) {
            LeadCMFakeCallManager.fakeWssRequest(wssUrl, eventHandlers, onCloseHandler).catch();
            return;
        }
        if (LeadCMSettings.getInstance().getInitSettings().no_real_calls) {
            // noConsole console.log("No real calls wss");
            return;
        }

        const socket = new WebSocket(wssUrl);

        socket.onopen = function () {
            // noConsole console.log("ws: connected ");
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                // noConsole console.log('ws: clean end');
            } else {
                // noConsole console.log('ws: break end');
            }
            // noConsole console.log(event);
            onCloseHandler();
        };

        socket.onmessage = function (event) {
            // noConsole console.log("ws: data", event.data);
            const data = JSON.parse(event.data);
            if (data.event && eventHandlers[data.event]) eventHandlers[data.event](data);
        };

        socket.onerror = function (/*error*/) {
            // noConsole console.log("ws: error ", error);
        };
    }

    private static eventSet = new Set<EventType>();

    public static collectData(params: object = {}) {
        const { visit_id, collect_data_url } = LeadCMSettings.getInstance().getInitSettings();

        // TODO: send a distress message with details
        if (!visit_id) return;

        LeadCMRequestManager.xhrGet(
            `${collect_data_url}?visit_id=${visit_id}&params=${encodeURIComponent(
                JSON.stringify(params),
            )}`,
            emptyFunction,
            emptyFunction,
        );
    }

    // we start call only if all events are dispatched
    public static activeCustomEventCounter = 0;

    public static dispatchCustomEvent(
        event: string,
        additionalParams = {},
        callback: () => void = emptyFunction,
    ) {
        this.activeCustomEventCounter++;

        LeadCMRequestManager.xhrGet(
            LeadCMSettings.getInstance().getInitSettings().register_url +
                `?event=${encodeURIComponent(event)}` +
                `&visit_id=${window.leadCM.visit_id}` +
                `&params=${encodeURIComponent(JSON.stringify(additionalParams))}`,
            () => {
                this.activeCustomEventCounter--;
                callback();
            },
            () => {
                this.activeCustomEventCounter--;
            },
        );

        if (Array.isArray(window.leadCM?.event_handlers_array))
            // noinspection SuspiciousTypeOfGuard
            window.leadCM.event_handlers_array
                .filter((i) => i.event === event)
                .map((i) => (i.callback instanceof Function ? i.callback(additionalParams) : null));
    }

    public static dispatchEvent(event: EventType, additionalParams = {}) {
        if (!this.eventSet.has(event) || event === EventType.CUSTOM_PARAMS) {
            this.eventSet.add(event);
            if (window.leadCM?.visit_id)
                LeadCMRequestManager.xhrGet(
                    LeadCMSettings.getInstance().getInitSettings().register_url +
                        `?event=${event}` +
                        `&visit_id=${window.leadCM.visit_id}` +
                        `&params=${encodeURIComponent(JSON.stringify(additionalParams))}`,
                    emptyFunction,
                    emptyFunction,
                );

            if (Array.isArray(window.leadCM?.event_handlers_array))
                // noinspection SuspiciousTypeOfGuard
                window.leadCM.event_handlers_array
                    .filter((i) => i.event === event)
                    .map((i) =>
                        i.callback instanceof Function ? i.callback(additionalParams) : null,
                    );

            const settings = LeadCMSettings.getInstance().getSettings();
            if (
                event === EventType.CALL_SUCCESSFULLY_ORDERED &&
                settings.tooltipStyles.tooltipType === TooltipType.TIMER
            ) {
                LeadCMWidgetButtonToolTypeTimer.toolTypeTimerCall();
            }
        }
    }
}
