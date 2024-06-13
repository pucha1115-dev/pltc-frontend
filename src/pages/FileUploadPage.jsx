// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Box } from "@chakra-ui/react";

const FileUploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/sims/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <Box>
      <Input type="file" onChange={handleFileChange} mb={4} />
      <Button onClick={handleFileUpload} colorScheme="blue">
        Upload File
      </Button>
    </Box>
  );
};

export default FileUploadPage;
