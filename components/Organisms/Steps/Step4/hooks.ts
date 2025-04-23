import React from "react";
import { UploadedImage } from "./types";
import axios from "axios";

const useStep4 = () => {
  const [images, setImages] = React.useState<UploadedImage[]>([]);
  const [postalCode, setPostalCode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState({
    direcction: "",
    postalCode: "",
  });
  const [showRequiredMessage, setShowRequiredMessage] =
    React.useState<boolean>(true);

  const MAX_SIZE = 1 * 1024 * 1024;

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setImages((prev) => [
      ...prev,
      ...fileArray.map((file) => ({ file, loading: true })),
    ]);

    const uploadPromises = fileArray.map(async (file) => {
      try {
        if (file.size > MAX_SIZE) {
          throw new Error("La imagen es demasiado grande. Tamaño máximo: 1MB.");
        }
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Error al leer el archivo"));
          reader.readAsDataURL(file);
        });

        const response = await axios.post("/api/uploadImage", { file: base64 });

        setImages((prev) =>
          prev.map((img) =>
            img.file === file
              ? { ...img, url: response.data.url, loading: false }
              : img
          )
        );
      } catch (error: any) {
        console.error("❌ Error al subir imagen:", error);

        setImages((prev) =>
          prev.map((img) =>
            img.file === file
              ? {
                  ...img,
                  error: "Error al subir imagen:" + error.message,
                  loading: false,
                }
              : img
          )
        );
      }
    });

    await Promise.allSettled(uploadPromises);
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }

    // Limpia el input para poder volver a subir la misma imagen si hace falta
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
