import { UserColor } from "@/types/types";
import { useState, useEffect } from "react";

// Transforms the UserColor from backend to a string to use for classes.
const useUserColor = (userColor: UserColor) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    switch (userColor) {
      case "OrangeYellow":
        setColor("orange-yellow");
        break;
      case "YellowGreen":
        setColor("yellow-green");
        break;
      case "Forest":
        setColor("forest");
        break;
      case "BlueGreen":
        setColor("blue-green");
        break;
      case "Aqua":
        setColor("aqua");
        break;
      case "Blue":
        setColor("blue");
        break;
      case "Purple":
        setColor("purple");
        break;
      case "PinkPurple":
        setColor("pink-purple");
        break;
      case "Pink":
        setColor("pink");
        break;
      case "Oat":
        setColor("oat");
        break;
    }
  }, [userColor]);
  return color;
};

export default useUserColor;
