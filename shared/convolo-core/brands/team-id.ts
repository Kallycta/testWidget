import { z } from 'zod';
import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type TeamId = Brand<number, 'TeamId'>;

export const zTeamId = zOApi(z.custom<TeamId>(zodIntBrand), {
    description: 'Convolo TeamId Id',
    type: 'integer',
    example: 12345,
});
