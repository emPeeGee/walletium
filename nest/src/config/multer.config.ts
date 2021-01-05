import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

export class MulterConfigService {
  static createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const isValid = MIME_TYPE_MAP[file.mimetype];

          if (isValid) {
            callback(null, './images/categories');
          } else {
            callback(new Error('Invalid MIME TYPE'), './images/categories');
          }
        },
        filename: (req, file, callback) => {
          const name = file.originalname.toLowerCase().split(' ').join('-');
          const ext = MIME_TYPE_MAP[file.mimetype];
          callback(null, `${name}-${Date.now()}.${ext}`);
        },
      }),
    };
  }
}
