import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { Dropbox } from 'dropbox';

@Injectable()
export class FilesService {
  constructor(private readonly dropbox: Dropbox) {
    this.dropbox = new Dropbox({
      accessToken: process.env.ACCESS_TOKEN_DROPBOX,
    });
  }

  async getFileLinkDropbox(path: string): Promise<string> {
    try {
      const response = await this.dropbox.filesGetTemporaryLink({ path });
      return response.result.link;
    } catch (error) {
      throw new HttpException(
        'img url not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadFileDropbox(file: any, fileName: string): Promise<void> {
    try {
      await this.dropbox.filesUpload({
        path: fileName,
        contents: file.buffer,
        mode: { '.tag': 'overwrite' },
      });
    } catch (error) {
      console.error(error.error);
      throw new HttpException(
        'Ошибка загрузки файла в Dropbox',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async doesFileExistDropbox(fileName: string): Promise<boolean> {
    try {
      const response = await this.dropbox.filesGetMetadata({
        path: fileName,
      });
      return true; // Если такой файл есть в Dropbox, вернуть true
    } catch (error) {
      if (error.status === 409) {
        return false; // Если статус ошибки 409 (файл не найден), вернуть false
      } else {
        console.error(error.error);
        throw new HttpException(
          'Ошибка загрузки файла в Dropbox',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async uploadFileAndGetLinkDropbox(
    file: any,
    fileName: string,
  ): Promise<string> {
    await this.uploadFileDropbox(file, fileName);
    return await this.getFileLinkDropbox(fileName);
  }

  async createFile(file: any, name: string): Promise<string> {
    try {
      const fileName = name;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Something went wrong while uploading profile photo',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
