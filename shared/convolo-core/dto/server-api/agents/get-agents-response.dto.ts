import { CoreBaseResponseDto } from '../../core-base-response.dto';
import { AgentDto } from './agent.dto';

export class GetAgentsResponseDto extends CoreBaseResponseDto {
    agents: AgentDto[];
}
