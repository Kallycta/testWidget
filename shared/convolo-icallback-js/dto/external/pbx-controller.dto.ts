import { zICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { zArr, zBool, zObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ExternalWidgetUpdateSettingsRequestBodyDto extends zodCreateDto({
    apiUrl: z.string().optional(),
}) {}

export const zCustomParamDto = zObj({
    id: zICallbackCustomParamKey,
    name: zStr,
    hiddenInCallList: zBool,
});

export type CustomParamDto = z.infer<typeof zCustomParamDto>;

export class ExternalWidgetCustomParamsResponseDto extends zodCreateDto(
    {
        customParams: zArr(zICallbackCustomParamKey),
        custom_params: zArr(zICallbackCustomParamKey),
    },
    zIsSuccessResponseDto,
) {}

export class ExternalWidgetCustomParamsResponseV2Dto extends zodCreateDto(
    {
        customParams: zArr(zCustomParamDto),
        custom_params: zArr(zCustomParamDto),
    },
    zIsSuccessResponseDto,
) {}
