import { Color } from "@prisma/client";
import { useEffect, useState } from "react";

export const useColor = (color: Color) => {
  const [projectColor, setProjectColor] = useState<Color | string>(color);
  useEffect(() => {
    switch (color) {
      case "OrangeYellow":
        setProjectColor("orange-yellow");
        break;
      case "YellowGreen":
        setProjectColor("yellow-green");
        break;
      case "Forest":
        setProjectColor("forest");
        break;
      case "BlueGreen":
        setProjectColor("blue-green");
        break;
      case "Aqua":
        setProjectColor("aqua");
        break;
      case "Blue":
        setProjectColor("blue");
        break;
      case "Purple":
        setProjectColor("purple");
        break;
      case "PinkPurple":
        setProjectColor("pink-purple");
        break;
      case "Pink":
        setProjectColor("pink");
        break;
      case "Oat":
        setProjectColor("oat");
        break;
    }
  }, [color]);

  return projectColor;
};
