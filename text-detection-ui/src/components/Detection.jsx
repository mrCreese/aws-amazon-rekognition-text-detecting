import React, { useEffect, useRef, useState } from "react";
import InputItem from "./option-detection-items/InputItem";
import InfoItem from "./option-detection-items/InfoItem";
import { useGlobalContext } from "@/app/utility/context";

export default function Detection() {
  const {
    textList,
    selectedId,
    toModify,
    setToModify,
    modifiedText,
    setModifiedText,
    handleClickItem,
  } = useGlobalContext();
  const [info, setInfo] = useState([]);
  /*   const [toModify, setToModify] = useState(null);
  const [modifiedText, setModifiedText] = useState(""); */
  const inputRef = useRef(null);
  useEffect(() => {
    if (textList) setInfo([...textList]);
    else setInfo([]);
  }, [textList]);
  useEffect(() => {
    // Assicurati che inputRef.current sia definito prima di accedervi
    if (inputRef.current) {
      // Esegui operazioni con inputRef.current solo se è definito
      inputRef.current.focus();
    }
  }, [toModify]);

  const handleChange = (e) => {
    setModifiedText(e.target.value);
  };
  const handleCancel = () => {
    setToModify(null);
    setModifiedText("");
  };
  const handleSave = (id) => {
    const temp = [...info];
    const modifyText = temp.map((item) =>
      item.Id === id ? (item = { ...item, DetectedText: modifiedText }) : item
    );
    setInfo(modifyText);
    handleCancel();
  };

  return (
    <div className="container-items gap-8 w-100 p-5">
      {info &&
        info.length > 0 &&
        info.map((item) => (
          <div
            key={item.Id}
            className={`card card-item ${
              selectedId === item.Id ? "selected" : ""
            }`}
          >
            {toModify === item.Id ? (
              <InputItem
                id={item.Id}
                handleChange={handleChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                modifiedText={modifiedText}
                inputRef={inputRef}
              />
            ) : (
              <InfoItem
                item={item}
                handleClick={handleClickItem}
                inputRef={inputRef}
              />
            )}
          </div>
        ))}
    </div>
  );
}

/* export default function Detection({ data, selectedId }) {
  const [info, setInfo] = useState([]);
  const [toModify, setToModify] = useState(null);
  useEffect(() => {
    if (data) {
      setInfo([...data]);
    }
  }, [data]);

  const handleClick = (id) => {
    setToModify(id);
  };
  return (
    <div className="container-items gap-8 w-100 p-5">
      {info &&
        info.length > 0 &&
        info.map((item) => (
          <div
            key={item.Id}
            className={`card card-item ${
              selectedId === item.Id ? "selected" : ""
            }`}
          >
            {
              <div className="column ">
                <p>
                  Testo: <strong>{item.DetectedText}</strong>
                </p>
                <p>
                  Precisione:{" "}
                  <strong>{`${Math.round(item.Confidence)}%`}</strong>
                </p>
                <div className="container-end">
                  <button className="btn" onClick={() => handleClick(item.Id)}>
                    Modifica
                  </button>
                </div>
              </div>
            }
          </div>
        ))}
    </div>
  );
} */
/* {Object.keys(item).map((key) =>
              typeof item[key] === "string" || typeof item[key] === "number" ? (
                <div key={key} className="column is-half">
                  <p>
                    {key}: <strong>{item[key]}</strong>
                  </p>
                </div>
              ) : null
            )} */
