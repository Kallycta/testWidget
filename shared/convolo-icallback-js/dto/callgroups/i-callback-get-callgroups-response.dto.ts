import { zArr, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zCallgroupDto } from '@shared/convolo-icallback-js/dto/callgroups/z-callgroup.dto';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetCallgroupsResponseDto extends zodCreateDto(
    {
        callgroups: zArr(zCallgroupDto),
    },
    zIsSuccessResponseDto,
) {}
