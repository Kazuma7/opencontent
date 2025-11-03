import { useState } from "react";

export const useSampleHook = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return {
    count,
    increment,
    decrement,
    reset,
    inputValue,
    setInputValue,
  };
};
