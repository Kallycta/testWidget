import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { z } from 'zod';

export enum ICallbackCallStatus {
    NO_ANSWER = 'CallStatusType.OPERATOR_ANSWERED',
    ANSWERED = 'CallStatusType.CLIENT_ANSWERED',
    MISSED = 'CallStatusType.NO_ANSWER',
    FAILED = 'CallStatusType.FAILED',
    PENDING = 'CallStatusType.PENDING',
    INITIATED = 'CallStatusType.INITIATED',
    ON_DEMAND = 'CallStatusType.ON_DEMAND',
    FUTURE = 'CallStatusType.FUTURE',
    DONE = 'CallStatusType.DONE',
    PROCESSED = 'CallStatusType.PROCESSED',
}

export const zICallbackCallStatus = zOApi(
    z.nativeEnum(ICallbackCallStatus),
    'Convolo leads call status',
);
