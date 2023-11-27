import { SchemaObject } from 'openapi3-ts';
import { ZodTypeAny } from 'zod';
import { ZodInfer } from '@shared/convolo-core/helpers/zod-helpers';
import { cloneClassObject } from '@shared/convolo-core/helpers/helpers/clone-class-object';

export interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: SchemaObject | SchemaObject[];
}

export function zodExtendedWithOpenApi<T extends OpenApiZodAny>(
    schema: T,
    schemaObjectOrDescription: SchemaObject,
): T;
export function zodExtendedWithOpenApi<T extends OpenApiZodAny>(
    schema: T,
    description: string | undefined,
    example?: string | (() => ZodInfer<T>),
    type?: SchemaObject['type'],
): T;

export function zodExtendedWithOpenApi<T extends OpenApiZodAny>(
    sourceZod: T,
    schemaObjectOrDescription: SchemaObject | string | undefined = {},
    example?: string | (() => ZodInfer<T>) | undefined,
    type?: SchemaObject['type'],
): T {
    const zod = cloneClassObject(sourceZod);

    const schemaObject =
        typeof schemaObjectOrDescription === 'string'
            ? { description: schemaObjectOrDescription }
            : example || type
            ? {}
            : schemaObjectOrDescription;
    if (example) schemaObject.example = typeof example === 'string' ? example : example();
    if (type) schemaObject.type = type;

    if (zod._def.metaOpenApi && !Array.isArray(zod._def.metaOpenApi))
        zod._def.metaOpenApi = { ...zod._def.metaOpenApi, ...schemaObject };
    else zod._def.metaOpenApi = schemaObject;

    return zod;
}

export const zOApi = zodExtendedWithOpenApi;
