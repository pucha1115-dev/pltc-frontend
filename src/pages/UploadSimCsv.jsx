import { Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const UploadSimCsv = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/sims/upload-csv/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        alert("File upload successful.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Input type="file" onChange={onFileChange}></Input>
      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
};

export default UploadSimCsv;
