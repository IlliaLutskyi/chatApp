import * as fs from 'fs';
import { UploadApiOptions, v2 } from 'cloudinary';
class CloudinaryService {
  constructor() {
    v2.config(process.env.CLOUDINARY_URL as string);
  }
  async upload(file: Express.Multer.File, options: UploadApiOptions) {
    const data = await v2.uploader.upload(file.path, options);
    fs.unlinkSync(file.path);
    return data;
  }
}
export default CloudinaryService;
