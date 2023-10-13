import React from "react";
import { Link } from "react-router-dom";

export function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link to="#">←</Link>;
  }
  if (type === "next") {
    return <Link to="#">→</Link>;
  }

  return originalElement;
}

export function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}
