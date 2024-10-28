import React from "react";
import { ClipLoader } from "react-spinners";

function ClipLoading(props) {
  const { size, color } = props;
  return (
    <div>
      <ClipLoader size={size} color={color} />
    </div>
  );
}

export default ClipLoading;
