import { zArr, zObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';

export class DialerAppSetLeadBodyDto extends zodCreateDto({
    name: zStr.nullable().optional(),
    email: zStr.nullable().optional(),
    phoneNumber: zStr.nullable().optional(),
    rating: zStr.nullable().optional(),
    comment: zStr.nullable().optional(),
    info: zArr(
        zObj({
            key: zStr,
            value: zStr.nullable().optional(),
        }),
    )
        .nullable()
        .optional(),
}) {}
