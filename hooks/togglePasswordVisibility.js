import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightWord, setRightWord] = useState("показать");

  const handlePasswordVisibility = () => {
    if (rightWord === "показать") {
      setRightWord("скрыть");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightWord === "скрыть") {
      setRightWord("показать");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightWord,
    handlePasswordVisibility,
  };
};
