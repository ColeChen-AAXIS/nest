import { Url } from '../../domain/url.entity';
import { UrlDTO } from '../dto/url.dto';

/**
 * A Url mapper object.
 */
export class UrlMapper {
    static fromDTOtoEntity(entityDTO: UrlDTO): Url {
        if (!entityDTO) {
            return;
        }
        let entity = new Url();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Url): UrlDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new UrlDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
