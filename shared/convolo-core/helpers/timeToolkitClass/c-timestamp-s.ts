import { TimestampS, zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { tt } from '@shared/convolo-core/helpers/time-toolkit';
import { CSeconds } from './c-seconds';
import { $CTimestampMs, CTimestampMs } from './c-timestamp-ms';
import { DateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { zTimestampMs } from '@shared/convolo-core/common/time-brands/timestamp-ms';
import { zodCheck } from '@shared/convolo-core/helpers/zod-helpers';
import { CHours } from '@shared/convolo-core/helpers/timeToolkitClass/c-hours';
import { CMinutes } from '@shared/convolo-core/helpers/timeToolkitClass/c-minutes';

export class CTimestampS {
    static get now(): CTimestampS {
        return new CTimestampS(new Date());
    }

    constructor(
        value: TimestampS | CTimestampS | Date | CTimestampMs | DateISOString | number | 'now',
    ) {
        if (value === undefined) throw new Error('creating TimestampS from undefined!');
        else if (value === 'now') this.value = tt.tsNow();
        else if (value instanceof CTimestampMs) this.value = tt.tsMsToS(value.value);
        else if (value instanceof CTimestampS) this.value = value.value;
        else if (value instanceof Date) this.value = tt.tsFromJsDate(value);
        else if (typeof value === 'string') this.value = tt.tsFromIsoDate(value);
        else if (zodCheck(zTimestampS, value)) this.value = value;
        else if (zodCheck(zTimestampMs, value)) this.value = tt.tsMsToS(value);
        else {
            // TODO: wrong value maybe log somehow
            this.value = value as TimestampS;
        }
    }

    private _value: TimestampS;

    get value() {
        return Math.round(this._value) as TimestampS;
    }

    private set value(val: TimestampS) {
        this._value = val;
    }

    get ms() {
        return $CTimestampMs(tt.tsSToMs(this.value));
    }

    get jsDate() {
        return tt.jsDateFromTs(this.value);
    }

    get isoString(): DateISOString {
        return tt.jsDateToIsoString(tt.jsDateFromTs(this.value));
    }

    valueOf = () => Math.round(this._value) as TimestampS;

    toString = () => `TimestampS: ${this._value}`;

    plus = (value: CSeconds | CMinutes | CHours | Seconds): CTimestampS =>
        new CTimestampS(
            this.value +
                (value instanceof CSeconds
                    ? value.value
                    : value instanceof CMinutes
                    ? value.value * 60
                    : value instanceof CHours
                    ? value.value * 60 * 60
                    : value),
        );

    minus = <T extends CTimestampS | Date | CSeconds | CMinutes | CHours | Seconds>(
        obj: T,
    ): T extends CTimestampS | Date ? CSeconds : CTimestampS =>
        obj instanceof CTimestampS
            ? (new CSeconds(this.value - obj.value) as any)
            : obj instanceof Date
            ? (new CSeconds(this.value - tt.tsFromJsDate(obj)) as any)
            : obj instanceof CHours
            ? (new CSeconds(this.value - obj.value * 60 * 60) as any)
            : obj instanceof CMinutes
            ? (new CSeconds(this.value - obj.value * 60) as any)
            : obj instanceof CSeconds
            ? (new CSeconds(this.value - obj.value) as any)
            : (new CTimestampS(this.value - (obj as any)) as any);

    gt = (value: TimestampS | CTimestampS) => this.value > this.getValueFrom(value);
    gte = (value: TimestampS | CTimestampS) => this.value >= this.getValueFrom(value);
    lt = (value: TimestampS | CTimestampS) => this.value < this.getValueFrom(value);
    lte = (value: TimestampS | CTimestampS) => this.value <= this.getValueFrom(value);

    private getValueFrom = (value: TimestampS | CTimestampS | number): TimestampS =>
        value instanceof CTimestampS ? value.value : (value as TimestampS);
}

export const $CTimestampS = (...args: ConstructorParameters<typeof CTimestampS>): CTimestampS =>
    new CTimestampS(...args);
