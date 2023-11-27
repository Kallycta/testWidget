import { CSeconds } from './c-seconds';
import { CMinutes } from '@shared/convolo-core/helpers/timeToolkitClass/c-minutes';
import { Hours } from '@shared/convolo-core/common/time-brands/hours';
import { CMilliseconds } from '@shared/convolo-core/helpers/timeToolkitClass/c-milliseconds';

export class CHours {
    constructor(value: Hours | CHours | number) {
        this.value = value instanceof CHours ? value.value : (value as Hours);
    }

    private _value: Hours;

    get value() {
        return Math.round(this._value) as Hours;
    }

    private set value(val: Hours) {
        this._value = val;
    }

    get minutes() {
        return new CMinutes(this.value * 60);
    }

    get seconds() {
        return new CSeconds(this.value * 60 * 60);
    }

    get milliseconds() {
        return new CMilliseconds(this.value * 60 * 60 * 1000);
    }

    valueOf = () => Math.round(this._value) as Hours;

    toString = () => `Hours: ${this._value}`;

    gt = (value: Hours | CHours) => this.value > this.getValueFrom(value);
    gte = (value: Hours | CHours) => this.value >= this.getValueFrom(value);
    lt = (value: Hours | CHours) => this.value < this.getValueFrom(value);
    lte = (value: Hours | CHours) => this.value <= this.getValueFrom(value);

    private getValueFrom = (value: Hours | CHours | number): Hours =>
        value instanceof CHours ? value.value : (value as Hours);
}

export const $CHours = (...args: ConstructorParameters<typeof CHours>): CHours =>
    new CHours(...args);
