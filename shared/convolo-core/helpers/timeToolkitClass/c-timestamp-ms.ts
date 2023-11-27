import { TimestampMs, zTimestampMs } from '@shared/convolo-core/common/time-brands/timestamp-ms';
import { TimestampS, zTimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { CTimestampS } from './c-timestamp-s';
import { tt } from '@shared/convolo-core/helpers/time-toolkit';
import { CSeconds } from './c-seconds';
import { $CMilliseconds, CMilliseconds } from './c-milliseconds';
import { DateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zodCheck } from '@shared/convolo-core/helpers/zod-helpers';

export class CTimestampMs {
    static get now(): CTimestampMs {
        return new CTimestampMs(new Date());
    }

    constructor(value: TimestampS | CTimestampS | Date | CTimestampMs | DateISOString | number) {
        if (value === undefined) throw new Error('creating CTimestampMs from undefined!');
        else if (value === 'now') this.value = tt.tsSToMs(tt.tsNow());
        else if (value instanceof CTimestampMs) this.value = value.value;
        else if (value instanceof CTimestampS) this.value = tt.tsSToMs(value.value);
        else if (value instanceof Date) this.value = tt.tsSToMs(tt.tsFromJsDate(value));
        else if (typeof value === 'string') this.value = tt.tsSToMs(tt.tsFromIsoDate(value));
        else if (zodCheck(zTimestampMs, value)) this.value = value;
        else if (zodCheck(zTimestampS, value)) this.value = tt.tsSToMs(value);
        else {
            // TODO: wrong value maybe log somehow
            this.value = value as TimestampMs;
        }
    }

    private _value: TimestampMs;

    get value() {
        return Math.round(this._value) as TimestampMs;
    }

    private set value(val: TimestampMs) {
        this._value = val;
    }

    get jsDate() {
        return new Date(this.value);
    }

    get isoString(): DateISOString {
        return tt.jsDateToIsoString(new Date(this.value));
    }

    valueOf = () => Math.round(this._value) as TimestampMs;

    toString = () => `TimestampMs: ${this._value}`;

    plus = ({ value }: CSeconds): CTimestampMs => new CTimestampMs(this.value + value);

    minus = <T extends CTimestampMs | CMilliseconds>(
        obj: T,
    ): T extends CTimestampMs ? CMilliseconds : CTimestampMs =>
        (obj instanceof CTimestampMs
            ? $CMilliseconds(this.value - obj.value)
            : $CTimestampMs(this.value - obj.value)) as any;

    gt = ({ value }: CTimestampMs) => this.value > value;
    gte = ({ value }: CTimestampMs) => this.value >= value;
    lt = ({ value }: CTimestampMs) => this.value < value;
    lte = ({ value }: CTimestampMs) => this.value <= value;
}

export const $CTimestampMs = (...args: ConstructorParameters<typeof CTimestampMs>): CTimestampMs =>
    new CTimestampMs(...args);
