import { Minutes } from '@shared/convolo-core/common/time-brands/minutes';
import { CSeconds } from './c-seconds';
import { CHours } from '@shared/convolo-core/helpers/timeToolkitClass/c-hours';

export class CMinutes {
    constructor(value: Minutes | CMinutes | number) {
        this.value = value instanceof CMinutes ? value.value : (value as Minutes);
    }

    private _value: Minutes;

    get value() {
        return Math.round(this._value) as Minutes;
    }

    private set value(val: Minutes) {
        this._value = val;
    }

    get seconds() {
        return new CSeconds(this.value * 60);
    }

    get milliseconds() {
        return new CSeconds(this.value * 60 * 1000);
    }

    get fullHours() {
        return new CHours(Math.floor(this.value / 60));
    }

    get restMinutes() {
        return new CMinutes(Math.floor(this.value % 60));
    }

    valueOf = () => Math.round(this._value) as Minutes;

    toString = () => `Minutes: ${this._value}`;

    gt = (value: Minutes | CMinutes) => this.value > this.getValueFrom(value);
    gte = (value: Minutes | CMinutes) => this.value >= this.getValueFrom(value);
    lt = (value: Minutes | CMinutes) => this.value < this.getValueFrom(value);
    lte = (value: Minutes | CMinutes) => this.value <= this.getValueFrom(value);

    private getValueFrom = (value: Minutes | CMinutes | number): Minutes =>
        value instanceof CMinutes ? value.value : (value as Minutes);
}

export const $CMinutes = (...args: ConstructorParameters<typeof CMinutes>): CMinutes =>
    new CMinutes(...args);
