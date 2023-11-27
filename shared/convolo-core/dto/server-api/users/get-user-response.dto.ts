import { CoreBaseResponseDto } from '../../core-base-response.dto';
import { UserDto } from './user.dto';

export class GetUserResponseDto extends CoreBaseResponseDto {
    user: UserDto;
}
