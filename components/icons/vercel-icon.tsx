import * as React from "react";
import {IconProps} from "@/types";

const VercelIcon = ({size, ...props}: IconProps) => (
    <svg
        viewBox="0 0 256 222"
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        fill="currentColor"
        {...props}
    >
        <path d="m128 0 128 221.705H0z"/>
    </svg>
);
export default VercelIcon;
