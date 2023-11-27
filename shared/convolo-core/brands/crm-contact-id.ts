// umbrella type that represents a contact id (that can vary for different CRMs, but usually presents)

import { z } from 'zod';
import { zodStringBrand } from '@shared/convolo-core/helpers/zod-helpers';
import { Brand } from '@shared/convolo-core/brands/brand-type';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';

export type CrmContactId = Brand<string, 'CrmContactId'>;

export const zCrmContactId = zOApi(z.custom<CrmContactId>(zodStringBrand), {
    description: 'Convolo Universal Crm Contact Id',
    type: 'string',
    example: 'my-crm-contact-12345',
});
