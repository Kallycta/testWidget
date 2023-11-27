import { zodIntBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type UserId = Brand<number, 'UserId'>;
export type UserStringId = Brand<string, 'UserStringId'>;

export const zUserId = zOApi(z.custom<UserId>(zodIntBrand), {
    description: 'Convolo User Id',
    type: 'integer',
    example: 12345,
});
