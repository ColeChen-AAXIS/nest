import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { UrlDTO } from '../service/dto/url.dto';
import { UrlMapper } from '../service/mapper/url.mapper';
import { UrlRepository } from '../repository/url.repository';

const relationshipNames = [];
relationshipNames.push('pet');

@Injectable()
export class UrlService {
    logger = new Logger('UrlService');

    constructor(@InjectRepository(UrlRepository) private urlRepository: UrlRepository) {}

    async findById(id: number): Promise<UrlDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.urlRepository.findOne(id, options);
        return UrlMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<UrlDTO>): Promise<UrlDTO | undefined> {
        const result = await this.urlRepository.findOne(options);
        return UrlMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<UrlDTO>): Promise<[UrlDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.urlRepository.findAndCount(options);
        const urlDTO: UrlDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((url) => urlDTO.push(UrlMapper.fromEntityToDTO(url)));
            resultList[0] = urlDTO;
        }
        return resultList;
    }

    async save(urlDTO: UrlDTO, creator?: string): Promise<UrlDTO | undefined> {
        const entity = UrlMapper.fromDTOtoEntity(urlDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.urlRepository.save(entity);
        return UrlMapper.fromEntityToDTO(result);
    }

    async update(urlDTO: UrlDTO, updater?: string): Promise<UrlDTO | undefined> {
        const entity = UrlMapper.fromDTOtoEntity(urlDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.urlRepository.save(entity);
        return UrlMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.urlRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
