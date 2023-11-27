/**
 * TODO: turn off fakes for production
 */
import { AddCallResponse, WssEvent } from './LeadCMRequestManager';
import { LeadCMSettings } from './LeadCMSettings';
import { ObjectKeys } from '../utils/helpers';
import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { patternMatchExec } from '@shared/convolo-core/helpers/helpers/pattern-match-exec';
import { asyncWaitSeconds } from '@shared/convolo-core/helpers/helpers/async-wait-seconds';

export enum FakeCallType {
    managerDoesntAnswer = 'nom',
    ManagerAnsweredLeadDoesntAnswer = 'nol',
    LeadAnswered = 'ok',
    LeadUnreachable = 'fail',
    WSSFailed = 'wss',
}

export function isTypeOfFakeCall(value: string): boolean {
    // ES5 variant of Object.values(FakeCallType).includes(value)
    return (
        ObjectKeys(FakeCallType)
            .map((key) => FakeCallType[key])
            .indexOf(value as any) > -1
    );
}

export class LeadCMFakeCallManager {
    public static fakeCall(type: string, callback: (response: string) => void): void {
        // noConsole console.log(`faking call as ${type}`);
        const fake_call_response: AddCallResponse = {
            success: true,
            subscribe_ws_url: type,
            phone_number: '+4681234567',
        };

        callback(JSON.stringify(fake_call_response));
    }

    public static fakeWssRequest = async (
        type: FakeCallType,
        eventHandlers: { [s: string]: (data?: any) => void },
        onCloseHandler: () => void,
    ) =>
        patternMatchExec(type, {
            [FakeCallType.LeadAnswered]: async () => {
                await asyncWaitSeconds(5 as Seconds);
                eventHandlers[WssEvent.CB_MANAGER_ANSWERED]({
                    params: {
                        name: LeadCMSettings.getInstance().getSettings().widgetTexts.userName,
                    },
                });
                await asyncWaitSeconds(7 as Seconds);
                eventHandlers[WssEvent.CB_LEAD_ANSWERED]();
                await asyncWaitSeconds(5 as Seconds);
                onCloseHandler();
            },
            [FakeCallType.LeadUnreachable]: async () => {
                await asyncWaitSeconds(5 as Seconds);
                eventHandlers[WssEvent.CB_MANAGER_ANSWERED]({
                    params: {
                        name: LeadCMSettings.getInstance().getSettings().widgetTexts.userName,
                    },
                });
                await asyncWaitSeconds(7 as Seconds);
                eventHandlers[WssEvent.CB_LEAD_NOT_ANSWERED]();
                await asyncWaitSeconds(5 as Seconds);
                onCloseHandler();
            },
            [FakeCallType.ManagerAnsweredLeadDoesntAnswer]: async () => {
                await asyncWaitSeconds(5 as Seconds);
                eventHandlers[WssEvent.CB_MANAGER_ANSWERED]({
                    params: {
                        name: LeadCMSettings.getInstance().getSettings().widgetTexts.userName,
                    },
                });
                await asyncWaitSeconds(5 as Seconds);
                onCloseHandler();
            },
            [FakeCallType.managerDoesntAnswer]: async () => {
                await asyncWaitSeconds(5 as Seconds);
                onCloseHandler();
            },
            [FakeCallType.WSSFailed]: async () => {
                // noConsole console.log("wss failed doing nothing");
            },
        });
}
