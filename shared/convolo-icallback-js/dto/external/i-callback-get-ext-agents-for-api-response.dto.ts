import { zArrObj, zodCreateDto, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class ICallbackGetExtAgentsForApiResponseDto extends zodCreateDto(
    {
        agents: zArrObj({
            name: zStr,
            phone: zStr,
            email: zStr.nullable(),
        }),
    },
    zIsSuccessResponseDto,
) {}
