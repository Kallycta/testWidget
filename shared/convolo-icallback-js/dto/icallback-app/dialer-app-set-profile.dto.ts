import { zDialerAppProfile } from './common';
import { zodCreateDto } from '@shared/convolo-core/helpers/zod-helpers';

export class DialerAppSetProfileBodyDto extends zodCreateDto(zDialerAppProfile) {}
