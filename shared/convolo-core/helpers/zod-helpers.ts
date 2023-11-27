import { Primitive, z, ZodObject, ZodSchema, ZodType } from 'zod';
import { extendShape, objectUtil, ZodEnum, ZodRawShape, ZodTypeAny } from 'zod/lib/types';
import { throwNewErr } from '@shared/convolo-core/helpers/helpers/throw-new-err';
import { patternMatch } from '@shared/convolo-core/helpers/helpers/pattern-match';

declare type EnumLike = {
    [k: string]: string | number;
    [nu: number]: string;
};

export const zodIntBrand = (x: any) => z.number().int().safeParse(x).success;
export const zodStringBrand = (x: any) => z.string().safeParse(x).success;
export const zArrObj = <T extends ZodRawShape>(shape: T) => z.array(z.object(shape));
export const zObj = <T extends ZodRawShape>(shape: T) => z.object(shape);
export const zLiteral = <T extends Primitive>(value: T) => z.literal(value);
export const zArr = <T extends ZodTypeAny>(zod: T) => z.array(zod);
export const zUnion = <T extends [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(types: T) =>
    z.union(types);
// TODO: allow destructuring
export const zEnum = <U extends string, T extends [U, ...U[]]>(values: T): ZodEnum<T> =>
    z.enum(values);
export const zNativeEnum = <T extends EnumLike>(values: T) => z.nativeEnum(values);
export const zNum = z.number();
export const zStr = z.string();
export const zBool = z.boolean();
export const zNumOrStr = z.union([z.number(), z.string()]);

export type ZodInfer<T extends ZodType<any, any, any>> = z.infer<T>;
export type ZodInput<T extends ZodType<any, any, any>> = z.input<T>;

type ObjectToQuery<T extends object> = {
    [K in keyof T]: string;
};

export type ZodDtoStatic<T, R extends ZodType<any>> = {
    new (): T;
    zodSchema: R;
    create(input: z.input<R>): T;
};

export type ZodDtoQueryStatic<T extends object, R extends ZodType<any>> = {
    new (): T;
    zodSchema: R;
    createObjectFromQuery(input: ObjectToQuery<z.input<R>>): T;
    createQueryFromObject(input: z.input<R>): ObjectToQuery<T>;
};

type ZodToObject<T extends ZodRawShape> = ZodObject<
    T,
    'strip',
    ZodTypeAny,
    {
        [k_1 in keyof objectUtil.addQuestionMarks<{
            [k in keyof T]: T[k]['_output'];
        }>]: objectUtil.addQuestionMarks<{ [k in keyof T]: T[k]['_output'] }>[k_1];
    },
    {
        [k_3 in keyof objectUtil.addQuestionMarks<{
            [k_2 in keyof T]: T[k_2]['_input'];
        }>]: objectUtil.addQuestionMarks<{ [k_2 in keyof T]: T[k_2]['_input'] }>[k_3];
    }
>;

export function zodCheck<T extends ZodSchema<R>, R>(zod: T, input: unknown): input is z.input<T> {
    return zod.safeParse(input).success;
}

export function zodStrictParse<T extends ZodSchema<R>, R>(zod: T, input: z.input<T>): z.infer<T> {
    return zod.parse(input);
}

export function zodCreateDto<T extends ZodRawShape, R extends ZodObject<any>>(
    zodSchema: T,
    mergeWith: R,
): ZodDtoStatic<z.infer<ZodToObject<T>> & z.infer<R>, ZodObject<extendShape<T, R['_shape']>>>;

export function zodCreateDto<T extends ZodRawShape>(
    zodSchema: T,
): ZodDtoStatic<z.infer<ZodToObject<T>>, ZodToObject<T>>;

export function zodCreateDto<T extends ZodType<any>>(zodSchema: T): ZodDtoStatic<z.infer<T>, T>;

export function zodCreateDto<T extends any>(zodSchema: any, mergeWith?: ZodObject<any>): any {
    class SchemaHolderClass {
        public static zodSchema = mergeWith
            ? mergeWith.merge(
                  zodSchema instanceof ZodType ? zodSchema : (z.object(zodSchema) as any),
              )
            : zodSchema instanceof ZodType
            ? zodSchema
            : z.object(zodSchema);

        public static create(input: any): any {
            return this.zodSchema.parse(input) as any;
        }
    }

    return SchemaHolderClass;
}

// TODO: query can be array of strings, which is interesting
type ZodQueryTransformer<T extends object> = {
    [K in keyof T]?: (val?: string) => T[K] | undefined;
};

const zodQueryBoolean = (x: string | undefined): boolean | undefined =>
    x === undefined ? undefined : ['1', 'true', 'yes', 'y'].includes(x.toLocaleLowerCase());
const zodQueryNumber = (x: string | undefined): number | undefined =>
    x === undefined ? undefined : +x;

export function zodQueryTransform<T extends ZodObject<any>, K>(
    value: any,
    zodSchema: T,
    zodTransformer: ZodQueryTransformer<z.input<T>> | undefined,
) {
    return Object.fromEntries(
        Object.entries(value).map(([k, v]) => {
            const zod = zodSchema.shape[k];
            const zodTypeName = zod?._def.innerType?._def.typeName ?? zod?._def.typeName;
            const zodMetaType =
                zod?._def.innerType?._def.metaOpenApi?.type ?? zod?._def.metaOpenApi?.type;

            // TODO: add certain types
            const trans: any =
                (zodTransformer as any)[k] ??
                patternMatch(zodTypeName, {
                    ZodNumber: zodQueryNumber,
                    ZodBoolean: zodQueryBoolean,
                    ZodNativeEnum: (x: string | undefined) =>
                        x === undefined
                            ? undefined
                            : Object.values(zod._def.values).includes(+x)
                            ? +x
                            : x,
                }) ??
                patternMatch(zodMetaType, [[['number', 'integer'], zodQueryNumber]]) ??
                ((x: any) => x);

            return [k, trans(v)];
        }),
    );
}

// TODO: let's skip making things complicated, check obligatory fields later if needed
//
//     {
//     [K in ExtractedKeys<T, string | number | boolean | undefined>]?: (
//         val?: string,
//     ) => T[K] | undefined;
// } & {
//     [K in FilteredKeys<T, string | number | boolean | undefined>]: (
//         val?: string,
//     ) => T[K] | undefined;
// };

export function zodCreateQueryDto<T extends ZodRawShape>(
    zodSchema: T,
    zodTransformer?: ZodQueryTransformer<z.input<ZodToObject<T>>>,
): ZodDtoQueryStatic<z.infer<ZodToObject<T>>, ZodToObject<T>>;

export function zodCreateQueryDto<T extends ZodType<any>>(
    zodSchema: T,
    zodTransformer?: ZodQueryTransformer<z.input<T>>,
): ZodDtoQueryStatic<z.infer<T>, T>;

export function zodCreateQueryDto(zodSchema: any, zodTransformer: any = {}): any {
    class SchemaHolderClass {
        public static zodSchema = zodSchema instanceof ZodType ? zodSchema : z.object(zodSchema);
        public static zodTransformer = zodTransformer;
        public static zodType = 'Query';

        public static createObjectFromQuery(value: any): any {
            // TODO: make better and support ES5
            let parsedInput = value;
            if (typeof value === 'object' && value !== null)
                try {
                    parsedInput = zodQueryTransform(value, this.zodSchema as any, zodTransformer);
                } catch (e) {
                    throwNewErr(`Query transformation failed ${e}`);
                }
            return this.zodSchema.parse(parsedInput) as any;
        }

        public static createQueryFromObject(value: any): any {
            try {
                const parsed = this.zodSchema.parse(value);
                return Object.fromEntries(
                    Object.entries(parsed)
                        .map(([k, v]) => [k, (v as any)?.toString?.() ?? undefined])
                        .filter(([, v]) => v !== undefined),
                ) as any;
            } catch (e) {
                throwNewErr(`To query transformation failed ${e}`);
            }
        }
    }

    return SchemaHolderClass;
}

/**
 * use the following ValidationPipe in a local nestjs helper
 * import {
 *     ArgumentMetadata,
 *     Injectable,
 *     PipeTransform,
 *     UnprocessableEntityException,
 * } from '@nestjs/common';
 *
 * import { ZodDtoStatic, zodQueryTransform } from '@shared/convolo-core/helpers/zod-helpers';
 * import { throwNewErr } from '@shared/convolo-core/helpers/helpers';
 * import { ZodIssue } from 'zod';
 *
 * @Injectable()
 * export class ZodValidationPipe implements PipeTransform {
 *    public transform(value: unknown, metadata: ArgumentMetadata): unknown {
 *        const zodSchema = (metadata?.metatype as ZodDtoStatic<unknown, any>)?.zodSchema;
 *        const zodTransformer = (metadata?.metatype as any)?.zodTransformer;
 *        const zodType = (metadata?.metatype as any)?.zodType;
 *
 *        if (zodSchema) {
 *            let parsedInput = value;
 *            if (typeof value === 'object' && value !== null)
 *                if (zodType === 'Query')
 *                    try {
 *                        parsedInput = zodQueryTransform(value, zodSchema, zodTransformer);
 *                    } catch (e) {
 *                        throwNewErr(`Query transformation failed ${e}`);
 *                    }
 *
 *            const parseResult = zodSchema.safeParse(parsedInput);
 *
 *            if (!parseResult.success) {
 *                const { error } = parseResult;
 *                const message = error.errors
 *                    .map((err: ZodIssue) => {
 *                        const path = err.path.join('.');
 *                        if (err.message === 'Invalid input' && err.path.length === 1) {
 *                            const { type, description } =
 *                                (zodSchema as any).shape?.[path]?._def.metaOpenApi ?? {};
 *                            if (type && description)
 *                                return `${path}: ${err.message}, should be ${type} (${description}).`;
 *                        }
 *
 *                        return `${path}: ${err.message}`;
 *                    })
 *                    .join(', ');
 *
 *                throw new UnprocessableEntityException(
 *                    `Input${zodType ? ` ${zodType}` : ''} validation failed: ${message}`,
 *                );
 *            }
 *
 *            return parseResult.data;
 *        }
 *
 *        return value;
 *    }
 * }
 *
 */
