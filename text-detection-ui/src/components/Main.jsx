import styles from "../../style/index.css";
import Image from "next/image";
import Detection from "@/components/Detection";
import Form from "@/components/Form";
import BoundingBox from "@/components/BoundingBox";
import { useGlobalContext } from "../app/utility/context";
import { size } from "../app/utility/varibales";

export default function Main() {
  const {
    image,
    textList,
    isDisabled,
    selectedId,
    setSelectedId,
    handleClickItem,
    hadleChangeFile,
    handleSubmit,
  } = useGlobalContext();
  return (
    <div className="container-flex f-col card m-3 ">
      <h1 className="is-size-2 has-text-centered is-capitalized has-text-weight-semibold">
        Text Detector
      </h1>
      <Form
        handleSubmit={handleSubmit}
        hadleChangeFile={hadleChangeFile}
        isDisabled={isDisabled}
      />
      <div className="container-center f-col gap-5">
        <div className="p-5">
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
        </div>
        <Detection data={textList} selectedId={selectedId} />
      </div>
    </div>
  );
}
