import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { UrlDTO } from '../src/service/dto/url.dto';
import { UrlService } from '../src/service/url.service';

describe('Url Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(UrlService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all urls ', async () => {
        const getEntities: UrlDTO[] = (await request(app.getHttpServer()).get('/api/urls').expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET urls by id', async () => {
        const getEntity: UrlDTO = (
            await request(app.getHttpServer())
                .get('/api/urls/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create urls', async () => {
        const createdEntity: UrlDTO = (
            await request(app.getHttpServer()).post('/api/urls').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update urls', async () => {
        const updatedEntity: UrlDTO = (await request(app.getHttpServer()).put('/api/urls').send(entityMock).expect(201))
            .body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update urls from id', async () => {
        const updatedEntity: UrlDTO = (
            await request(app.getHttpServer())
                .put('/api/urls/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE urls', async () => {
        const deletedEntity: UrlDTO = (
            await request(app.getHttpServer())
                .delete('/api/urls/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
