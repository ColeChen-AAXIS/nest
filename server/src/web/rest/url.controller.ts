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
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UrlDTO } from '../../service/dto/url.dto';
import { UrlService } from '../../service/url.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/urls')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('urls')
export class UrlController {
    logger = new Logger('UrlController');

    constructor(private readonly urlService: UrlService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: UrlDTO,
    })
    async getAll(@Req() req: Request): Promise<UrlDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.urlService.findAndCount({
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
        type: UrlDTO,
    })
    async getOne(@Param('id') id: number): Promise<UrlDTO> {
        return await this.urlService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create url' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: UrlDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() urlDTO: UrlDTO): Promise<UrlDTO> {
        const created = await this.urlService.save(urlDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Url', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update url' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UrlDTO,
    })
    async put(@Req() req: Request, @Body() urlDTO: UrlDTO): Promise<UrlDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Url', urlDTO.id);
        return await this.urlService.update(urlDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update url with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: UrlDTO,
    })
    async putId(@Req() req: Request, @Body() urlDTO: UrlDTO): Promise<UrlDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Url', urlDTO.id);
        return await this.urlService.update(urlDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete url' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Url', id);
        return await this.urlService.deleteById(id);
    }
}
