import { Milliseconds } from '@shared/convolo-core/common/time-brands/milliseconds';
import { CMinutes } from './c-minutes';
import { CSeconds } from './c-seconds';
import { tt } from '@shared/convolo-core/helpers/time-toolkit';

export class CMilliseconds {
    constructor(value: Milliseconds | CMilliseconds | CSeconds | CMinutes | number) {
        this.value =
            value instanceof CMilliseconds
                ? value.value
                : value instanceof CSeconds
                ? tt.sToMs(value.value)
                : value instanceof CMinutes
                ? tt.sToMs(tt.minToSec(value.value))
                : (value as Milliseconds);
    }

    private _value: Milliseconds;

    get value() {
        return Math.round(this._value) as Milliseconds;
    }

    private set value(val: Milliseconds) {
        this._value = val;
    }

    get fullMinutes() {
        return new CMinutes(Math.floor(this.value / 60000));
    }

    get restMilliseconds() {
        return new CMilliseconds(Math.floor(this.value % 60000));
    }

    valueOf = () => Math.round(this._value) as Milliseconds;

    toString = () => `Milliseconds: ${this._value}`;

    plus = (value: Milliseconds | CMilliseconds): CMilliseconds =>
        new CMilliseconds(this.value + this.getValueFrom(value));

    minus = (value: Milliseconds | CMilliseconds): CMilliseconds =>
        new CMilliseconds(this.value - this.getValueFrom(value));

    gt = (value: Milliseconds | CMilliseconds) => this.value > this.getValueFrom(value);
    gte = (value: Milliseconds | CMilliseconds) => this.value >= this.getValueFrom(value);
    lt = (value: Milliseconds | CMilliseconds) => this.value < this.getValueFrom(value);
    lte = (value: Milliseconds | CMilliseconds) => this.value <= this.getValueFrom(value);

    private getValueFrom = (value: Milliseconds | CMilliseconds | number): Milliseconds =>
        value instanceof CMilliseconds ? value.value : (value as Milliseconds);
}

export const $CMilliseconds = (
    ...args: ConstructorParameters<typeof CMilliseconds>
): CMilliseconds => new CMilliseconds(...args);
