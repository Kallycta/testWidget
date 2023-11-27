import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type AgentGroupId = Brand<number, 'AgentGroupId'>;

export const zAgentGroupId = zOApi(z.custom<AgentGroupId>(zodIntBrand), {
    description: 'Group of Convolo Agents Id',
    type: 'integer',
    example: 12345,
});
