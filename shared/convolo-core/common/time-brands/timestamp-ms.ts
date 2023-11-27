import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type TimestampMs = Brand<number, 'TimestampMs'>;

export const zTimestampMs = zOApi(
    z.custom<TimestampMs>(
        (x) =>
            z.number().positive().int().min(643042680000).max(3798806280000).safeParse(x).success,
    ),
    {
        description: 'Timestamp in Milliseconds (JS timestamp)',
        type: 'integer',
        example: 1634921576064,
    },
);
