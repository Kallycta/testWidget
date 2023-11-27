import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';

export type ValidJsonString = Brand<string, 'ValidJsonString'>;

export const zValidJsonString = z.custom<ValidJsonString>(
    (x) => z.string().safeParse(x).success && isGoodJSON(x as string),
);

function isGoodJSON(val: string): boolean {
    try {
        JSON.parse(val);
        return true;
    } catch (e) {
        return false;
    }
}
