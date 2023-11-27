import { LeadCMRequestManager } from './LeadCMRequestManager';
import { LeadCMSettings } from './LeadCMSettings';
import { LeadCMModalWindow } from '../components/LeadCMModalWindow';
import { LeadCMStateManager } from './LeadCMStateManager';
import { LeadCMWidgetButton } from '../components/LeadCMWidgetButton';
import { LeadCMWidgetRoot } from '../components/LeadCMWidgetRoot';
import {
    EventType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { WindowState } from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import { asyncWaitSeconds } from '@shared/convolo-core/helpers/helpers/async-wait-seconds';
import { emptyFunction } from '@shared/convolo-core/helpers/helpers/empty-function';
import { throwNewErr } from '@shared/convolo-core/helpers/helpers/throw-new-err';
import { LeadCMWidgetButtonToolTypeTimer } from '@src/components/LeadCMWidgetButtonTooltypeTimer';

export class LeadCMApiManager {
    public static init = () =>
        (window._leadCM = window.leadCM =
            {
                ...window.leadCM,
                call: LeadCMApiManager.call,
                open: LeadCMApiManager.open,
                close: LeadCMApiManager.close,
                finish: LeadCMApiManager.finish,
                showTooltip: LeadCMApiManager.showTooltip,
                disableTooltip: LeadCMApiManager.disableTooltip,
                disableCall: LeadCMApiManager.disableCall,
                disableEndTimeout: LeadCMApiManager.disableEndTimeout,
                enableCall: LeadCMApiManager.enableCall,
                dispatchCustomEvent: LeadCMApiManager.dispatchCustomEvent,
                updateSettings: LeadCMApiManager.updateSettings,
                getSettings: LeadCMApiManager.getSettings,
                versionBuild: () => '2023-10-01 11:30',
            });

    public static async call(
        phone: string,
        source = 'api',
        department_key?: string,
        future_ms?: Date,
    ): Promise<void> {
        LeadCMRequestManager.dispatchEvent(EventType.CALL_ORDERED_API, { source });

        const settings = LeadCMSettings.getInstance().getSettings();
        const { widget_key, submit_url } = LeadCMSettings.getInstance().getInitSettings();

        const countryIso2 = settings.country ?? 'SE';
        const visit_id = LeadCMSettings.getInstance().getInitSettings().visit_id;

        if (submit_url && widget_key && phone && visit_id) {
            let countDown = 5;
            while (LeadCMRequestManager.activeCustomEventCounter > 0 && countDown-- > 0) {
                await asyncWaitSeconds(1 as Seconds);
            }

            LeadCMRequestManager.addCallGet(
                {
                    submit_url,
                    widget_key,
                    phone,
                    visit_id,
                    countryIso2,
                    department_key,
                    nwt: settings.nonWorkingTime,
                    futureStampMs: future_ms ? +new Date(future_ms) : undefined,
                },
                LeadCMModalWindow.getInstance().onResponse,
                emptyFunction,
            );
        }
    }

    public static open(params: { noFocus?: boolean, force?: boolean } = {}): void {
        LeadCMRequestManager.dispatchEvent(EventType.OPENED_API);
        LeadCMStateManager.setWindowState(WindowState.Opened, params);
    }

    public static finish = (): void => LeadCMWidgetRoot.finishWidget();

    public static close(): void {
        LeadCMRequestManager.dispatchEvent(EventType.CLOSED_API);
        LeadCMStateManager.setWindowState(WindowState.Minimized);
    }

    public static showTooltip(): void {
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
            LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipAlwaysOn = true;
            LeadCMWidgetButtonToolTypeTimer.getInstance().showTooltip();
        } else {
            LeadCMWidgetButton.getInstance().toolTipAlwaysOn = true;
            LeadCMWidgetButton.getInstance().showTooltip();
        }
    }

    public static disableTooltip(): void {
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
            LeadCMWidgetButtonToolTypeTimer.getInstance().toolTipDisabled = true;
            LeadCMWidgetButtonToolTypeTimer.getInstance().hideTooltip();
        } else {
            LeadCMWidgetButton.getInstance().toolTipDisabled = true;
            LeadCMWidgetButton.getInstance().hideTooltip();
        }
    }

    public static disableCall(): void {
        LeadCMModalWindow.getInstance().callDisabled = true;
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
            LeadCMWidgetButtonToolTypeTimer.getInstance().callDisabled = true;
        }
    }

    public static disableEndTimeout(): void {
        LeadCMModalWindow.getInstance().endTimeoutDisabled = true;
    }

    public static enableCall(): void {
        LeadCMModalWindow.getInstance().callDisabled = false;
        const settings = LeadCMSettings.getInstance().getSettings();
        if (settings.tooltipStyles.tooltipType === TooltipType.TIMER) {
            LeadCMWidgetButtonToolTypeTimer.getInstance().callDisabled = true;
        }
    }

    public static dispatchCustomEvent = (
        event: string,
        params: any,
        callback: () => void = emptyFunction,
    ): void => LeadCMRequestManager.dispatchCustomEvent(event, params, callback);

    public static updateSettings(path: string[], newValue: any): void {
        // noinspection SuspiciousTypeOfGuard
        if (!Array.isArray(path) || path.some((s) => typeof s !== 'string'))
            throwNewErr('path should be array of strings');
        const settings: any = LeadCMSettings.getInstance().getSettings();

        if (![1, 2].includes(path.length)) throwNewErr('wrong path');
        if (
            path.length === 1 &&
            (settings[path[0]] === undefined || typeof settings[path[0]] === 'object')
        )
            throwNewErr('wrong path');
        if (
            path.length === 2 &&
            (settings[path[0]] === undefined || settings[path[0]][path[1]] == undefined)
        )
            throwNewErr('wrong path');

        if (path.length === 1) settings[path[0]] = newValue;
        if (path.length === 2) settings[path[0]][path[1]] = newValue;
    }

    public static getSettings = (path: string[]): any => {
        // noinspection SuspiciousTypeOfGuard
        if (!Array.isArray(path) || path.some((s) => typeof s !== 'string'))
            throwNewErr('path should be array of strings');
        const settings: any = LeadCMSettings.getInstance().getSettings();

        if (![1, 2].includes(path.length)) throwNewErr('wrong path');
        if (
            path.length === 1 &&
            (settings[path[0]] === undefined ||
                (typeof settings[path[0]] === 'object' && !Array.isArray(settings[path[0]])))
        )
            throwNewErr('wrong path');
        if (
            path.length === 2 &&
            (settings[path[0]] === undefined || settings[path[0]][path[1]] == undefined)
        )
            throwNewErr('wrong path');

        if (path.length === 1) return settings[path[0]];
        if (path.length === 2) return settings[path[0]][path[1]];
    };
}
