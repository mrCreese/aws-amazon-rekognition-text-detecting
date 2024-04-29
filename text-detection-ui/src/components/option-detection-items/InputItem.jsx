import React from "react";

export default function InputItem({
  handleChange,
  handleSave,
  handleCancel,
  modifiedText,
  inputRef,
  id,
}) {
  return (
    <div className="column ">
      <input
        type="text"
        className="input spak "
        value={modifiedText}
        ref={inputRef}
        onChange={(e) => handleChange(e)}
      />

      <div className="container-end gap-5 pt-2">
        <button className="btn" onClick={() => handleSave(id)}>
          Salva
        </button>
        <button className="btn secondary" onClick={handleCancel}>
          Annulla
        </button>
      </div>
    </div>
  );
}
