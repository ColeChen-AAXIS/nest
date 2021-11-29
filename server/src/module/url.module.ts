import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from '../web/rest/url.controller';
import { UrlRepository } from '../repository/url.repository';
import { UrlService } from '../service/url.service';

@Module({
    imports: [TypeOrmModule.forFeature([UrlRepository])],
    controllers: [UrlController],
    providers: [UrlService],
    exports: [UrlService],
})
export class UrlModule {}
