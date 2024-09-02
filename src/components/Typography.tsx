import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  fontStyle?: React.CSSProperties["fontStyle"];
  lineHeight?: string;
  textAlign?: React.CSSProperties["textAlign"];
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  fontSize = "16px",
  fontWeight = "normal",
  fontStyle = "normal",
  lineHeight = "1.5",
  textAlign = "left",
  color = "black",
}) => {
  return (
    <div
      style={{
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight,
        textAlign,
        color,
      }}
    >
      {children}
    </div>
  );
};

export default Typography;
