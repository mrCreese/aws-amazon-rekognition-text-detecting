import React from "react";

export default function InfoItem({ item, handleClick }) {
  return (
    <div
      className="column text-container w-100"
      onClick={() => handleClick(item.Id, item.DetectedText)}
    >
      <div>
        <p>
          Testo: <strong>{item.DetectedText}</strong>
        </p>
        <p>
          Precisione: <strong>{`${Math.round(item.Confidence)}%`}</strong>
        </p>
      </div>
      {/*     <div className="container-end ">
        <button
          className="btn"
          onClick={() => handleClick(item.Id, item.DetectedText)}
        >
          Modifica
        </button>
      </div> */}
    </div>
  );
}
