import { useState, CSSProperties } from "react";

export function useCardTilt() {
  const [tiltStyle, setTitleStyle] = useState<CSSProperties>({})

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const tiltX = (width / 2 - x) / 10;
    const tiltY = (height / 2 - y) / 10 * -1;
    setTitleStyle({
      transform: `rotateY(${tiltX}deg) rotateX(${tiltY}deg)`,
      transformStyle: "preserve-3d",
      transition: "transform 100ms ease"
    });
  };

  function handleMouseLeave() {
    setTitleStyle({
      transformStyle: "preserve-3d",
      transition: "transform 100ms ease"
    });
  };

  const containerStyle: CSSProperties = {
    perspective: "1000px"
  };

  return {
    tiltStyle,
    containerStyle,
    handleMouseMove,
    handleMouseLeave
  };
};