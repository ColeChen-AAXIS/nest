import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import {ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation} from '@nestjs/swagger';
import {PetDTO} from '../../service/dto/pet.dto';
import {PetService} from '../../service/pet.service';
import {PageRequest, Page} from '../../domain/base/pagination.entity';
import {AuthGuard, Roles, RolesGuard, RoleType} from '../../security';
import {HeaderUtil} from '../../client/header-util';
import {Request} from '../../client/request';
import {LoggingInterceptor} from '../../client/interceptors/logging.interceptor';
import {FileInterceptor} from '@nestjs/platform-express';
import multer = require('multer');
import {PetStatus} from "../../domain/enumeration/pet-status";

@Controller('api/pets')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('pets')
export class PetController {
  logger = new Logger('PetController');

  constructor(private readonly petService: PetService) {
  }

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PetDTO,
  })
  async getAll(@Req() req: Request): Promise<PetDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.petService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PetDTO,
  })
  async getOne(@Param('id') id: number): Promise<PetDTO> {
    return await this.petService.findById(id);
  }

  @Get('/status/findByStatus')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found by status',
    type: PetDTO,
  })
  async findByStatus(@Req() req: Request): Promise<PetDTO[]> {
    const status = req.query.status;
    if (!status) {
      return [];
    }
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.petService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
      where: [
        {
          "status": status
        },
      ]
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({title: 'Create pet'})
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PetDTO,
  })
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async post(@Req() req: Request, @Body() petDTO: PetDTO): Promise<PetDTO> {
    this.logger.log(petDTO);
    const created = await this.petService.save(petDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pet', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({title: 'Update pet'})
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PetDTO,
  })
  async put(@Req() req: Request, @Body() petDTO: PetDTO): Promise<PetDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pet', petDTO.id);
    return await this.petService.update(petDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({title: 'Update pet with id'})
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PetDTO,
  })
  async putId(@Req() req: Request, @Body() petDTO: PetDTO): Promise<PetDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pet', petDTO.id);
    return await this.petService.update(petDTO, req.user?.login);
  }

  @PostMethod('/uploadImage/:id')
  @Roles(RoleType.USER)
  @ApiOperation({title: 'upload image'})
  @ApiResponse({
    status: 200,
    description: 'The image successfully uploaded.',
    type: PetDTO,
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'D:/ncl/images');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    })
  }))
  uploadImage(@Param('id') id: number, @UploadedFile() file): String {
    console.log(file);
    console.log(id);
    return "upload done."
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({title: 'Delete pet'})
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Pet', id);
    return await this.petService.deleteById(id);
  }
}
