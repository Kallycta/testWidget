import { zDialerAppLeadItem } from './common';
import { zArr, zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zIsSuccessResponseDto } from '@shared/convolo-core/dto/is-success-response.dto';

export class DialerAppGetLeadResponseDto extends zodCreateDto(
    {
        lead: zDialerAppLeadItem,
    },
    zIsSuccessResponseDto,
) {}
