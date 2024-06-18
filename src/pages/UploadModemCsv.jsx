import { Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {COLORS} from '../constants'

const UploadModemCsv = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/modems/upload-csv/",
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
      <Input 
      width='220px' 
      alignItems='center' 
      justifyContent='center' 
      size='sm' 
      border={0} 
      type="file" 
      onChange={onFileChange}>
        
      </Input>
      <Button size='sm' backgroundColor={COLORS.ACCENT}  onClick={handleUpload}>Upload</Button>
    </>
  );
};

export default UploadModemCsv;
