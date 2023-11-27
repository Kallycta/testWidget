import {
    zArrObj,
    zBool,
    zNum,
    zObj,
    zodCreateDto,
    zStr,
} from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';
import { zICallbackWidgetId } from '@shared/convolo-icallback-js/brands/ICallbackWidgetId';
import { zICallbackWidgetSettings } from '@shared/convolo-icallback-js/types/i-callback-widget-settings';
import { zCallgroupDto } from '@shared/convolo-icallback-js/dto/callgroups/z-callgroup.dto';
import { zICallbackCallgroupId } from '@shared/convolo-icallback-js/brands/ICallbackCallgroupId';

export const zICallbackWidgetDto = zObj({
    id: zICallbackWidgetId,
    site_name: zStr,
    widget_key: zStr,
    settings: zICallbackWidgetSettings,
    active: zBool,
    activeRotationNumber: zStr.optional(),
    activeRotationGroupIndex: zNum.optional(),
    callGroup: zCallgroupDto.nullable(),
    ownCallGroup: zCallgroupDto,
});

export class ICallbackGetWidgetsResponseDto extends zodCreateDto(
    {
        widgets: zArrObj({
            id: zICallbackWidgetId,
            site_name: zStr,
            url: zStr,
            widget_key: zStr,
            active: zBool,
        }),
    },
    zIsSuccessResponseDto,
) {}

export class ICallbackGetWidgetResponseDto extends zodCreateDto(
    { widget: zICallbackWidgetDto },
    zIsSuccessResponseDto,
) {}

export class ICallbackPostWidgetBodyDto extends zodCreateDto({
    site_name: zStr,
    active: zBool,
    settings: zICallbackWidgetSettings,
}) {}

export class ICallbackPostWidgetResponseDto extends zodCreateDto(
    {
        id: zICallbackWidgetId,
    },
    zIsSuccessResponseDto,
) {}

export class ICallbackPatchWidgetByIdBodyDto extends zodCreateDto({
    site_name: zStr,
    active: zBool,
    settings: zICallbackWidgetSettings,
    callGroupId: zICallbackCallgroupId.nullable(),
    ownCallGroup: zCallgroupDto,
}) {}

export class ICallbackPostWidgetSetIntegrationUrlBodyDto extends zodCreateDto({
    new_url: zStr,
}) {}
