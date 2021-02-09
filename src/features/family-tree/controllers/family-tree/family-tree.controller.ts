import { ContextUser } from '@features/auth/decorators/user.decorator';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { AddChildInputDto } from '@features/family-tree/dto/add-child.input.dto';
import { CreateNodeInputDto } from '@features/family-tree/dto/create-node.input.dto';
import { CreateTreeInputDto } from '@features/family-tree/dto/create-tree.input.dto';
import { NodeOutputDto } from '@features/family-tree/dto/node.output.dto';
import { NodesOutputDto } from '@features/family-tree/dto/nodes.output.dto';
import { TreeOutputDto } from '@features/family-tree/dto/tree.output.dto';
import { TreesOutputDto } from '@features/family-tree/dto/trees.output.dto';
import { NodeService } from '@features/family-tree/services/node/node.service';
import { TreeService } from '@features/family-tree/services/tree/tree.service';
import { User } from '@features/users/models/user.model';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('family-tree')
@ApiTags('family tree')
export class FamilyTreeController {
  private readonly logger = new Logger(FamilyTreeController.name);

  constructor(
    private readonly treeService: TreeService,
    private readonly nodeService: NodeService
  ) {}

  @Get('/trees')
  @ApiOperation({
    summary: 'Returns trees created by user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TreesOutputDto,
    description: 'Returns array of trees',
  })
  @ApiBearerAuth()
  async getTrees(@ContextUser() user: User): Promise<TreesOutputDto> {
    const trees = await this.treeService.getTreesByCreatorId({
      creatorId: user.id,
    });
    return {
      trees,
    };
  }

  @Post('/trees')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new tree with user as creator',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TreeOutputDto,
    description: 'Returns a new tree',
  })
  @ApiBearerAuth()
  async createTree(
    @ContextUser() user: User,
    @Body() data: CreateTreeInputDto
  ): Promise<TreeOutputDto> {
    return this.treeService.createTree({
      ...data,
      creatorId: user.id,
    });
  }

  @Post('/trees/:id/node')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new node in the tree with id :id',
  })
  @ApiParam({
    name: 'id',
    example: 'ckkyctqwn000090ly0baq5gie',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TreeOutputDto,
    description: 'Returns a new node',
  })
  @ApiBearerAuth()
  async createNode(
    @Param('id') treeId,
    @Body() data: CreateNodeInputDto
  ): Promise<NodeOutputDto> {
    return this.nodeService.createNode({
      ...data,
      treeId,
    });
  }

  @Get('/trees/:id/nodes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get nodes for the tree with :id',
  })
  @ApiParam({
    name: 'id',
    example: 'ckkyctqwn000090ly0baq5gie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NodesOutputDto,
    description: 'Returns a nodes',
  })
  @ApiBearerAuth()
  async getNodes(@Param('id') treeId): Promise<NodesOutputDto> {
    const nodes = await this.nodeService.getNodesByTreeId({
      treeId,
    });
    return {
      nodes,
    };
  }

  @Post('/nodes/:id/children')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Add child to node with :id',
  })
  @ApiParam({
    name: 'id',
    example: 'ckkyctqwn000090ly0baq5gie',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NodeOutputDto,
    description: 'Returns a parent node with new child',
  })
  @ApiBearerAuth()
  async addChild(
    @Param('id') nodeId,
    @Body() data: AddChildInputDto
  ): Promise<NodeOutputDto> {
    return this.nodeService.addChild({
      parentId: nodeId,
      childId: data.childId,
    });
  }
}
