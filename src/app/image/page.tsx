"use client";
import { UploadImage } from "./UploadImage";
import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async () => {
    console.log("Uploading image...");
    try {
      const url = await UploadImage(file);
      setUploadedUrl(url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedUrl && <p>Uploaded image URL: {uploadedUrl}</p>}
      {/* https://vettovaznwdhefdeeglu.supabase.co/storage/v1/object/public/UserImage/uploadedUrl というURLが発行される */}
    </div>
  );
};

export default UploadForm;
