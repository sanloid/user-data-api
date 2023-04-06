import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { Dropbox } from 'dropbox';

@Module({
  providers: [FilesService, Dropbox],
  exports: [FilesService],
})
export class FilesModule {}
