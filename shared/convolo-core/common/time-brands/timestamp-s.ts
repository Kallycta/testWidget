import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type TimestampS = Brand<number, 'TimestampS'>;

export const zTimestampS = zOApi(
    z.custom<TimestampS>(
        (x) => z.number().positive().int().min(643042680).max(3798806280).safeParse(x).success,
    ),
    {
        description: 'Timestamp in seconds (UNIX timestamp)',
        type: 'integer',
        example: 1634921576,
    },
);
