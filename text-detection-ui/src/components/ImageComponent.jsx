import Image from "next/image";
import React from "react";
import BoundingBox from "./BoundingBox";
import { size } from "@/app/utility/varibales";
import { useGlobalContext } from "@/app/utility/context";

export default function ImageComponent() {
  const { image, textList, setSelectedId, handleClickItem } =
    useGlobalContext();
  return (
    <div className="container">
      <div className="image-container">
        {image && (
          <Image
            src={image}
            alt="Imagine caricata"
            width={size.width}
            height={size.height}
            className="main-image"
          />
        )}
        {textList &&
          textList.map((item) => (
            <BoundingBox
              key={item.Id}
              item={item}
              setSelectedId={setSelectedId}
              handleClick={handleClickItem}
            />
          ))}
      </div>
    </div>
  );
}
