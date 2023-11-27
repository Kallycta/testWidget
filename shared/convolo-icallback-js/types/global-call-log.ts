import { zArrObj, zNum, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zTimestampMs } from '@shared/convolo-core/common/time-brands/timestamp-ms';
import { zLcCallAgent } from '@shared/convolo-icallback-js/dto/voximplantTypes';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';

export const zGlobalCallLog = zArrObj({
    log: zArrObj({ event: zStr, time: zTimestampMs }),
    callId: zNum,
    operator: zLcCallAgent,
    billedSeconds: zSeconds.optional(),
});
