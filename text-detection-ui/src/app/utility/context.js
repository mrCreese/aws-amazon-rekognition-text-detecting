"use client";
import { createContext, useState, useContext } from "react";
import ApiService from "./service/api";
import { maxSize } from "./varibales";
import { loader, simpleAlert } from "./loader";

const AppContext = createContext();
const apiService = new ApiService();
const AppProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [textList, setTextList] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [toModify, setToModify] = useState(null);
  const [modifiedText, setModifiedText] = useState("");

  const hadleChangeFile = (e) => {
    setTextList(null);
    const file = e.target.files[0];
    if (file && file.size > maxSize * 1024 * 1024) {
      setError(
        `Il file supera la dimensione massima consentita di ${maxSize}Mb`
      );
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageTemp = document.createElement("img");
        imageTemp.onload = () => {
          setImage(reader.result);
          setFile(file);
          setError("");
        };
        imageTemp.src = reader.result;
      };
      reader.readAsDataURL(file);
      setIsDisabled(false);
    }
  };
  const handleClickItem = (id, text) => {
    setToModify(id);
    setModifiedText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alertInstance = simpleAlert(loader);
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiService.postFormData(
      apiService.urls.text_detector,
      formData
    );
    if (response.success) {
      setTextList(response.data.filter((item) => item.Type === "WORD"));
      setIsDisabled(true);
    }
    alertInstance.close();
  };

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        image,
        setImage,
        error,
        setError,
        textList,
        setTextList,
        isDisabled,
        setIsDisabled,
        selectedId,
        setSelectedId,
        hadleChangeFile,
        handleSubmit,
        toModify,
        setToModify,
        modifiedText,
        setModifiedText,
        handleClickItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
