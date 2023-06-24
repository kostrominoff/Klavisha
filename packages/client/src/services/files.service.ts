import { FileType } from "@klavisha/types";
import { AxiosInstance } from "axios";

export const FilesService = (axios: AxiosInstance) => ({
  async upload(files: FileList | File[]) {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    return await axios.post<FileType[]>("/files", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async findOneByFilename(filename: string) {
    const { data } = await axios.get<FileType>(
      `/files/oneByFilename/${filename}`
    );
    return data;
  },
  async findAllByFilenames(filenames: string[]) {
    const { data } = await axios.get<FileType[]>("/files/manyByFilenames", {
      params: {
        filenames: filenames.join(","),
      },
    });
    return data;
  },
});
