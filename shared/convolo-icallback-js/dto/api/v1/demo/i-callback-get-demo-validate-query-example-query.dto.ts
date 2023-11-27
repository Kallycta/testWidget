import { z } from 'zod';
import { zUserId } from '@shared/convolo-core/brands/user-id';
import { zYYYYMMDDDateString } from '@shared/convolo-core/common/time-brands/yyyy-mm-dd-date-string';
import { zodCreateQueryDto } from '@shared/convolo-core/helpers/zod-helpers';
import { zOApi } from '@shared/convolo-core/helpers/zod-extend-to-openapi';
import { zSeconds } from '@shared/convolo-core/common/time-brands/seconds';

export class ICallbackGetDemoValidateQueryExampleQueryDto extends zodCreateQueryDto(
    z.object({
        foo: z.number().max(100).min(10),
        foo2: z.number().optional(),
        bar: z.string().optional(),
        baz: z.boolean(),
        qux: z.string().email(),
        qux2: z.enum(['foo', 'bar']),
        uid: zUserId,
        duration: zSeconds,
        date: zYYYYMMDDDateString,
        some_array: zOApi(z.array(z.string()).optional(), 'comma separated array of strings'),
    }),
    {
        some_array: (x) => x?.split(','),
    },
) {}

// export class ICallbackGetDemoValidateQueryExampleQueryDtoOld {
//     @Transform(({ value }) => +value)
//     @IsNumber()
//     @Max(100)
//     @Min(10)
//     foo: number;
//
//     @Transform(({ value }) => +value)
//     @IsNumber()
//     @IsOptional()
//     foo2?: number;
//
//     @IsString()
//     @IsOptional()
//     bar?: string;
//
//     @Transform(({ value }) => [true, '1', 'true', 'yes'].includes(value))
//     @IsBoolean()
//     baz: boolean;
//
//     @IsString()
//     @IsEmail()
//     qux: string;
//
//     @IsEnum(['foo', 'bar'])
//     qux2: 'foo' | 'bar';
//
//     @ApiProperty({ type: Number, description: 'user id' })
//     @IsInt()
//     @IsPositive()
//     uid: UserId;
//
//     @ApiProperty({ type: Number, description: 'seconds' })
//     @IsInt()
//     @IsPositive()
//     duration: ICallbackVisitStringId;
//
//     @ApiProperty({ type: String, description: 'date in format YYYY-MM-DD' })
//     @IsString()
//     @Matches(/^(\d{4}-\d{2}-\d{2}|)$/)
//     date: YYYYMMDDDateString;
//
//     @ApiProperty({ type: Array, description: 'comma separated array of strings'})
//     @Transform(({ value }) => value?.split(','))
//     @IsArray()
//     @IsString({ each: true })
//     some_array?: string[];
// }
