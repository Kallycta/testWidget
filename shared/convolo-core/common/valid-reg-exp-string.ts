import { Brand } from '@shared/convolo-core/brands/brand-type';
import { z } from 'zod';

export type ValidRegExpString = Brand<string, 'ValidRegExpString'>;

export const zValidRegExpString = z.custom<ValidRegExpString>(
    (x) => z.string().safeParse(x).success && isGoodRegExp(x as string),
);

export function isGoodRegExp(val: string): boolean {
    try {
        return !!new RegExp(val);
    } catch (e) {
        return false;
    }
}
