import { Seconds } from '@shared/convolo-core/common/time-brands/seconds';

export const asyncWaitSeconds = async (seconds: Seconds) =>
    new Promise((resolve) => setTimeout(resolve, Math.floor(seconds * 1000)));
