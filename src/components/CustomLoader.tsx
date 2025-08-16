import React from "react";

const CustomLoader = ({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) => {
  const loaderStyle = color
    ? ({ "--loader-color": color } as React.CSSProperties)
    : {};

  return (
    <div className={`custom-loader ${className}`} style={loaderStyle}></div>
  );
};

export default CustomLoader;
