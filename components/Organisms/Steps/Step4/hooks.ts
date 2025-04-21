import React from "react";
import { UploadedImage } from "./types";

const useStep4 = () => {
  const [images, setImages] = React.useState<UploadedImage[]>([]);
  const [postalCode, setPostalCode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState({
    direcction: "",
    postalCode: "",
  });
  const [showRequiredMessage, setShowRequiredMessage] =
    React.useState<boolean>(true);

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    fileArray.forEach(async (file) => {
      setImages((prev) => [...prev, { file, loading: true }]);

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const response = await fetch("/api/uploadImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al subir la imagen.");
        }

        setImages((prev) =>
          prev.map((img) =>
            img.file === file ? { ...img, url: data.url, loading: false } : img
          )
        );
      } catch (error) {
        setImages((prev) =>
          prev.map((img) =>
            img.file === file
              ? {
                  ...img,
                  error: (error as Error).message || "Error desconocido",
                  loading: false,
                }
              : img
          )
        );
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      processFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });

    if (!value) {
      setShowRequiredMessage(true);
    } else {
      setShowRequiredMessage(false);
    }
  };
  return {
    images,
    setImages,
    handleFileChange,
    postalCode,
    setPostalCode,
    inputValue,
    setInputValue,
    showRequiredMessage,
    setShowRequiredMessage,
    handleDrop,
    handleDragOver,
    handleChange,
  };
};

export default useStep4;
