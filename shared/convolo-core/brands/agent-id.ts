import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type AgentId = Brand<number, 'AgentId'>;
export type AgentStringId = Brand<string, 'AgentStringId'>;

export const zAgentId = zOApi(z.custom<AgentId>(zodIntBrand), {
    description: 'Convolo Agent Id',
    type: 'integer',
    example: 12345,
});
