import { z } from 'zod';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { zArr, zArrObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zICallbackLeadId } from '@shared/convolo-icallback-js/brands/ICallbackLeadId';
import { zCallListItem } from '@shared/convolo-icallback-js/dto/api/v1/calls/call-list-response.dto';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetLeadsResponseDto extends zodCreateDto(
    {
        leads: zArrObj({
            id: zICallbackLeadId,
            timeCreated: zDateISOString,
            name: zStr,
            username: z.string(),
            widget_name: z.string(),
            widget_id: zICallbackWidgetId,
            phoneNumber: z.string(),
            email: z.string().optional(),
            url: z.string(),
            data_source: z.string().optional(),
            referer: z.string().optional(),
            source: z.string().optional(),
            campaign: z.string().optional(),
            ip: z.string().optional(),
            ip_country: z.string().optional(),
            calls: zArr(zCallListItem),
            custom_params: zArrObj({ name: zICallbackCustomParamKey, value: z.string() }),
            hidden_custom_fields: z.array(zICallbackCustomParamKey),
        }),
        page: z.number().int().positive(),
        pagesCount: z.number().int().positive(),
        totalItems: z.number().int().nonnegative(),
    },
    zIsSuccessResponseDto,
) {}
