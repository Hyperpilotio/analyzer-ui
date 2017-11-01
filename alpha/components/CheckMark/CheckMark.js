import React from "react";
import _s from "./style.scss";

const CheckMark = () => (
  <div>
    <svg
      className={`${_s.checkmark}`}
      viewBox="0 0 52 52"
    >
      <circle
        className={`${_s.checkmarkCircle}`}
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className={`${_s.checkmarkCheck}`}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  </div>
);

export default CheckMark;
