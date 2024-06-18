import { Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { COLORS } from "../constants";

const UploadSimCsv = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/sims/upload-csv/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        alert("File upload successful.");
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Input
        width="220px"
        alignItems="center"
        justifyContent="center"
        size="sm"
        border={0}
        type="file"
        onChange={onFileChange}
      ></Input>

      {loading ? (
        <Button
          size="sm"
          isLoading
          backgroundColor={COLORS.ACCENT}
          onClick={handleUpload}
        >
          Upload
        </Button>
      ) : (
        <Button
          size="sm"
          backgroundColor={COLORS.ACCENT}
          onClick={handleUpload}
        >
          Upload
        </Button>
      )}
    </>
  );
};

export default UploadSimCsv;
