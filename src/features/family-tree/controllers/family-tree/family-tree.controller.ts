import { ContextUser } from '@features/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { TreesOutputDto } from '@features/family-tree/dto/trees.output.dto';
import { NodeService } from '@features/family-tree/services/node/node.service';
import { TreeService } from '@features/family-tree/services/tree/tree.service';
import { User } from '@features/users/models/user.model';
import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('family-tree')
@ApiTags('family tree')
export class FamilyTreeController {
  private readonly logger = new Logger(FamilyTreeController.name);

  constructor(
    private readonly treeService: TreeService,
    private readonly nodeService: NodeService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/trees')
  @ApiOperation({
    summary: 'Returns trees created by user',
  })
  @ApiResponse({
    status: 200,
    type: TreesOutputDto,
    description: 'Returns array of trees',
  })
  @ApiBearerAuth()
  async getTrees(@ContextUser() user: User) {
    return this.treeService.getTreesByCreatorId({
      creatorId: user.id,
    });
  }
}
