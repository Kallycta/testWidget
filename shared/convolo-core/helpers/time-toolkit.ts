import { TimestampS } from '@shared/convolo-core/common/time-brands/timestamp-s';
import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';
import { Minutes } from '@shared/convolo-core/common/time-brands/minutes';
import { Hours } from '@shared/convolo-core/common/time-brands/hours';
import { DateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { TimestampMs } from '@shared/convolo-core/common/time-brands/timestamp-ms';
import { Milliseconds } from '@shared/convolo-core/common/time-brands/milliseconds';
import { NonEmptyArray } from '@shared/convolo-core/helpers/type-helpers/non-empty-array';

export const timeToolkit = {
    plusTsSec: (timestamp: TimestampS, diff: Seconds) => (timestamp + diff) as TimestampS,
    minusTsSec: (timestamp: TimestampS, diff: Seconds) => (timestamp - diff) as TimestampS,
    minusTsTs: (val1: TimestampS, val2: TimestampS) => (val1 - val2) as Seconds,
    plus: <T extends Seconds | Minutes | Hours>(val1: T, val2: T) => (val1 + val2) as T,
    gt: <T extends Seconds | Minutes | Hours | TimestampS>(val1: T, val2: T) => val1 > val2,
    gte: <T extends Seconds | Minutes | Hours | TimestampS>(val1: T, val2: T) => val1 >= val2,
    lt: <T extends Seconds | Minutes | Hours | TimestampS>(val1: T, val2: T) => val1 < val2,
    lte: <T extends Seconds | Minutes | Hours | TimestampS>(val1: T, val2: T) => val1 <= val2,
    betweenEx: <T extends Seconds | Minutes | Hours | TimestampS>(val: T, valStart: T, valEnd: T) =>
        val > valStart && val < valEnd,
    minus: <T extends Seconds | Minutes | Hours>(val1: T, val2: T) => (val1 - val2) as T,
    hrToMin: (val: Hours) => (val * 60) as Minutes,
    minToSec: (val: Minutes) => (val * 60) as Seconds,
    hrMinToMin: (h: Hours, m: Minutes) => (h * 60 + m) as Minutes,
    jsDateFromTs: (timestamp: TimestampS) => new Date(timestamp * 1000),
    tsFromJsDate: (jsDate: Date): TimestampS => Math.floor(jsDate.getTime() / 1000) as TimestampS,
    msFromJsDate: (jsDate: Date): TimestampMs => jsDate.getTime() as TimestampMs,
    tsNow: (): TimestampS => Math.floor(new Date().getTime() / 1000) as TimestampS,
    tsMsNow: (): TimestampMs => new Date().getTime() as TimestampMs,
    tsFromIsoDate: (isoDate: DateISOString): TimestampS =>
        Math.floor(new Date(isoDate).getTime() / 1000) as TimestampS,
    jsDateToIsoString: (jsDate: Date): DateISOString => jsDate.toISOString() as DateISOString,
    jsDateFromIsoString: (isoString: DateISOString): Date => new Date(isoString),
    tsMsToS: (timestampMs: TimestampMs): TimestampS => Math.floor(timestampMs / 1000) as TimestampS,
    tsSToMs: (timestampS: TimestampS): TimestampMs => (timestampS * 1000) as TimestampMs,
    sToMs: (s: Seconds): Milliseconds => (s * 1000) as Milliseconds,

    max: <T extends Seconds | Minutes | Hours | TimestampS | TimestampMs>(
        ...values: NonEmptyArray<T>
    ) => Math.max(...values) as T,
    min: <T extends Seconds | Minutes | Hours | TimestampS | TimestampMs>(
        ...values: NonEmptyArray<T>
    ) => Math.min(...values) as T,
};

export const tt = timeToolkit;
