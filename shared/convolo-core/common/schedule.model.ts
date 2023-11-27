// TODO: custom schedule, choose exact days
// TODO: time zone

// TODO: custom schedule, choose exact days
// TODO: time zone
import { z } from 'zod';
import { compareFunc } from '@shared/convolo-core/helpers/helpers/compare-func';

export const WEEKDAY_NUMBERS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
export const WEEKDAYS = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun' };

export const zWeekday = z.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
export type Weekday = z.infer<typeof zWeekday>;

export const zScheduleTimeInterval = z
    .object({
        day: zWeekday,
        startHour: z.number().int().min(0).max(23),
        startMin: z.number().int().min(0).max(59),
        endHour: z.number().int().min(0).max(24),
        endMin: z.number().int().min(0).max(59),
    })
    .refine((val) => !(val.endHour === 24 && val.endMin !== 0), 'end hour 24 minutes must be 00');

export type ScheduleTimeInterval = z.infer<typeof zScheduleTimeInterval>;

export const zScheduleType = z.object({
    _intervals: z.array(zScheduleTimeInterval),
});

export type ScheduleType = z.infer<typeof zScheduleType>;

export class Schedule {
    optimizedIntervals: Array<{
        day: string;
        startHour: number;
        startMin: number;
        endHour: number;
        endMin: number;
    }>;

    constructor(intervals: ScheduleTimeInterval[]) {
        this._intervals = intervals;
        this.updateOptimizedIntervals();
    }

    // scheduleName?: string;
    public _intervals: ScheduleTimeInterval[];

    get intervals(): ScheduleTimeInterval[] {
        return this._intervals;
    }

    set intervals(value: ScheduleTimeInterval[]) {
        this._intervals = value;
        this.updateOptimizedIntervals();
    }

    updateOptimizedIntervals() {
        const filterMap = new Map<string, string>();
        for (const interval of this._intervals) {
            const oldInterval = filterMap.get(interval.day) || '';
            const intervalValue = `${interval.startHour}:${interval.startMin}-${interval.endHour}:${interval.endMin}`;
            filterMap.set(interval.day, `${oldInterval} ${intervalValue}, `);
        }

        const reverseMap = new Map<string, string[]>();
        filterMap.forEach((intervalGroup, day) => {
            if (!Array.isArray(reverseMap.get(intervalGroup))) reverseMap.set(intervalGroup, []);
            reverseMap.get(intervalGroup)?.push(day);
        });

        const optimizedIntervals: Array<{
            day: string;
            startHour: number;
            startMin: number;
            endHour: number;
            endMin: number;
        }> = [];

        reverseMap.forEach((daysArray) => {
            let dayList = '';

            for (let i = 0; i < daysArray.length; i++)
                dayList += daysArray[i] + (i !== daysArray.length - 1 ? ', ' : '');
            for (const interval of this._intervals.filter((i) => i.day === daysArray[0]))
                optimizedIntervals.push({
                    day: dayList,
                    startHour: interval.startHour,
                    startMin: interval.startMin,
                    endHour: interval.endHour,
                    endMin: interval.endMin,
                });
        });

        this.optimizedIntervals = optimizedIntervals;
    }

    addTimeInterval(timeInterval: ScheduleTimeInterval): void {
        if (
            // timeInterval.end <= timeInterval.start
            !(
                timeInterval.endHour > timeInterval.startHour ||
                (timeInterval.endHour === timeInterval.startHour &&
                    timeInterval.endMin > timeInterval.startMin)
            )
        ) {
            throw new Error('The ending time must be more than the starting one.');
        }

        let idx = 1;
        for (const interval of this._intervals) {
            // timeInterval.start >= interval.start
            // timeInterval.start < interval.end)

            if (
                interval.day === timeInterval.day &&
                !(
                    timeInterval.startHour < interval.startHour ||
                    (timeInterval.startHour === interval.startHour &&
                        timeInterval.startMin < interval.startMin)
                ) &&
                !(
                    timeInterval.startHour > interval.endHour ||
                    (timeInterval.startHour === interval.endHour &&
                        timeInterval.startMin >= interval.endMin)
                )
            ) {
                throw new Error(
                    `The starting time intersects with the interval ${idx}: '${interval.toString()}'.`,
                );
            }

            //  && timeInterval.end >= interval.start
            //  && timeInterval.end < interval.end
            if (
                interval.day === timeInterval.day &&
                !(
                    timeInterval.endHour < interval.startHour ||
                    (timeInterval.endHour === interval.startHour &&
                        timeInterval.endMin < interval.startMin)
                ) &&
                !(
                    timeInterval.endHour > interval.endHour ||
                    (timeInterval.endHour === interval.endHour &&
                        timeInterval.endMin >= interval.endMin)
                )
            ) {
                throw new Error(
                    `The ending time intersects with the interval ${idx}: '${interval.toString()}'.`,
                );
            }

            //  && interval.start >= timeInterval.start
            //  && interval.start < timeInterval.end
            if (
                interval.day === timeInterval.day &&
                !(
                    interval.startHour < timeInterval.startHour ||
                    (interval.startHour === timeInterval.startHour &&
                        interval.startMin < timeInterval.startMin)
                ) &&
                !(
                    interval.startHour > timeInterval.endHour ||
                    (interval.startHour === timeInterval.endHour &&
                        interval.startMin >= timeInterval.endMin)
                )
            ) {
                throw new Error(
                    `The interval ${idx}: '${interval.toString()}' intersects with the new one.`,
                );
            }

            idx++;
        }

        this._intervals.push(timeInterval);
        this.sortTimeIntervals();
        this.updateOptimizedIntervals();
    }

    sortTimeIntervals = () =>
        this._intervals.sort(
            compareFunc((x) => WEEKDAY_NUMBERS[x.day] * 10000 + x.startHour * 100 + x.startMin),
        );
}
