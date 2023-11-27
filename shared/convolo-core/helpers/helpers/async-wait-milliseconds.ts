import { Milliseconds } from '@shared/convolo-core/common/time-brands/milliseconds';

export const asyncWaitMilliseconds = async (milliseconds: Milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, Math.floor(milliseconds)));
