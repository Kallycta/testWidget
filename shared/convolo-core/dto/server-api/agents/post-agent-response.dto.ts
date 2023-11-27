import { CoreBaseResponseDto } from '../../core-base-response.dto';
import { AgentId } from '../../../brands/agent-id';

export class PostAgentResponseDto extends CoreBaseResponseDto {
    id: AgentId;
}
