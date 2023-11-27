import { LeadCMSettings } from '../managers/LeadCMSettings';
import { divQuerySelector, pad } from '../utils/helpers';
import { LeadCMRequestManager } from '../managers/LeadCMRequestManager';
import { emptyFunction } from '@shared/convolo-core/helpers/helpers/empty-function';

export class LeadCMTimeSelector {
    private static _instance?: LeadCMTimeSelector;

    public static deleteInstance = () => delete LeadCMTimeSelector._instance;
    public static getInstance = (): LeadCMTimeSelector =>
        (LeadCMTimeSelector._instance ||= new LeadCMTimeSelector());

    private available: number[];

    private constructor() {
        if (!LeadCMSettings.getInstance().getInitSettings().only_local) {
            LeadCMRequestManager.xhrGet(
                LeadCMSettings.getInstance().getInitSettings().time_available_url ?? '',
                (result) => {
                    this.available = JSON.parse(result);

                    if (!this.available.length) {
                        // TODO: сделать нормально
                        divQuerySelector('#lc_future_calls').innerHTML = 'Not available, sorry...';
                    } else {
                        this.initTimeSelector();
                    }
                },
                emptyFunction,
            );
        } else {
            this.available = this.TEST_AVAILABLE;
            this.initTimeSelector();
        }
    }

    private initTimeSelector() {
        const daySelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_day"]',
        );
        const hourSelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_hour"]',
        );

        if (!daySelect || !hourSelect) return;

        const dtf = new Intl.DateTimeFormat(navigator.language, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });

        const days = new Set<string>();
        for (const timestampMs of this.available) {
            const date = new Date(timestampMs);
            days.add(dtf.format(date));
        }

        days.forEach((day) => daySelect.options.add(new Option(day, day)));

        this.updateHourSelect();

        daySelect.addEventListener('change', this.updateHourSelect.bind(this));
        hourSelect.addEventListener('change', this.updateMinuteSelect.bind(this));
    }

    private updateHourSelect() {
        const dtf = new Intl.DateTimeFormat(navigator.language, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });

        const daySelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_day"]',
        );
        const hourSelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_hour"]',
        );

        if (!daySelect || !hourSelect) return;

        const hours = new Set<number>();
        for (const timestampMs of this.available) {
            const date = new Date(timestampMs);
            if (dtf.format(date) === daySelect.value) hours.add(date.getHours());
        }

        while (hourSelect.options.length > 0) hourSelect.options.remove(0);

        hours.forEach((hour) =>
            hourSelect.options.add(new Option(pad(hour.toString(), 2), hour.toString())),
        );
        this.updateMinuteSelect();
    }

    private updateMinuteSelect() {
        const dtf = new Intl.DateTimeFormat(navigator.language, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });

        const daySelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_day"]',
        );
        const hourSelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_hour"]',
        );
        const minuteSelect = document.querySelector<HTMLSelectElement>(
            'select[name="lc_fc_select_minute"]',
        );

        if (!daySelect || !hourSelect || !minuteSelect) return;

        while (minuteSelect.options.length > 0) minuteSelect.options.remove(0);

        for (const timestampMs of this.available) {
            const date = new Date(timestampMs);
            if (
                dtf.format(date) === daySelect.value &&
                date.getHours().toString() === hourSelect.value
            )
                minuteSelect.add(
                    new Option(pad(date.getMinutes().toString(), 2), timestampMs.toString()),
                );
        }
    }

    private TEST_AVAILABLE = [
        1554107455595, 1554110455595, 1554217255595, 1554294055595, 1554294655595, 1554295255595,
        1554295855595, 1554296455595, 1554297055595, 1554306055595, 1554306655595,
    ];
}
