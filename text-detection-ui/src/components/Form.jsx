import { useGlobalContext } from "@/app/utility/context";
import React from "react";

export default function Form() {
  const { handleSubmit, hadleChangeFile, isDisabled } = useGlobalContext();
  return (
    <form
      className="container-center between  gap-5 p-5"
      onSubmit={handleSubmit}
    >
      <div className="container-center w-50">
        <input
          id="file"
          className="inputfile"
          capture="environment"
          name="file"
          type="file"
          accept="image/*"
          onChange={hadleChangeFile}
        />
        <label htmlFor="file" className="btn">
          <div className="">
            Imagine
            <i className="ml-3 fa-solid fa-file-arrow-up"></i>
          </div>
        </label>
      </div>
      <button className="w-50 btn" type="submit" disabled={isDisabled}>
        Ricerca
      </button>
    </form>
  );
}
