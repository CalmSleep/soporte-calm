import React from "react";

const useStep4 = () => {
  const [loadingImg, setLoadingImg] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [postalCode, setPostalCode] = React.useState<string>("");
  const [inputValue, setInputValue] = React.useState({
    direcction: "",
    postalCode: "",
  });
  const [showRequiredMessage, setShowRequiredMessage] =
    React.useState<boolean>(true);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    setLoadingImg(true);
    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
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

          return data.url;
        })
      );
      setImagePreviews((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    } finally {
      setLoadingImg(false);
    }
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
    loadingImg,
    imagePreviews,
    setImagePreviews,
    setLoadingImg,
    handleFileChange,
    postalCode,
    setPostalCode,
    inputValue,
    setInputValue,
    showRequiredMessage,
    setShowRequiredMessage,
    handleChange,
  };
};

export default useStep4;
