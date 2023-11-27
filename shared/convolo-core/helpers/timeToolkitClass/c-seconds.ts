import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { CMinutes } from './c-minutes';
import { CMilliseconds } from './c-milliseconds';

export class CSeconds {
    constructor(value: Seconds | CSeconds | CMilliseconds | number) {
        this.value =
            value instanceof CSeconds
                ? value.value
                : value instanceof CMilliseconds
                ? (Math.floor(value.value / 1000) as Seconds)
                : (value as Seconds);
    }

    private _value: Seconds;

    get value() {
        return Math.round(this._value) as Seconds;
    }

    private set value(val: Seconds) {
        this._value = val;
    }

    get fullMinutes() {
        return new CMinutes(Math.floor(this.value / 60));
    }

    get restSeconds() {
        return new CSeconds(Math.floor(this.value % 60));
    }

    get milliseconds() {
        return new CMilliseconds(this.value * 1000);
    }

    valueOf = () => Math.round(this._value) as Seconds;

    toString = () => `Seconds: ${this._value}`;

    plus = (value: Seconds | CSeconds): CSeconds =>
        new CSeconds(this.value + this.getValueFrom(value));

    minus = (value: Seconds | CSeconds): CSeconds =>
        new CSeconds(this.value - this.getValueFrom(value));

    gt = (value: Seconds | CSeconds) => this.value > this.getValueFrom(value);
    gte = (value: Seconds | CSeconds) => this.value >= this.getValueFrom(value);
    lt = (value: Seconds | CSeconds) => this.value < this.getValueFrom(value);
    lte = (value: Seconds | CSeconds) => this.value <= this.getValueFrom(value);

    private getValueFrom = (value: Seconds | CSeconds | number): Seconds =>
        value instanceof CSeconds ? value.value : (value as Seconds);
}

export const $CSeconds = (...args: ConstructorParameters<typeof CSeconds>): CSeconds =>
    new CSeconds(...args);
