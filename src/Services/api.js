import axios from "axios";

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post("http://localhost:4000/users/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get("http://localhost:4000/users/");
  }
}

export default new FileUploadService();