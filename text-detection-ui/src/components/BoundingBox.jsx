import React from "react";

export default function BoundingBox({ item, setSelectedId, handleClick }) {
  return (
    <div
      onMouseEnter={() => setSelectedId(item.Id)}
      onMouseLeave={() => setSelectedId(null)}
      onClick={() => handleClick(item.Id, item.DetectedText)}
      className="bounding-box"
      style={{
        left: `${item.Geometry.BoundingBox.Left * 100}%`,
        top: `${item.Geometry.BoundingBox.Top * 100}%`,
        width: `${item.Geometry.BoundingBox.Width * 100}%`,
        height: `${item.Geometry.BoundingBox.Height * 100}%`,
      }}
    ></div>
  );
}
