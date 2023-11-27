import { UserId } from '@shared/convolo-core/brands/user-id';

export class GetAgentsQueryDto {
    // @ApiProperty({
    //     type: 'number',
    // })
    // @Transform(({ value }) => +value)
    userId: UserId;
}
