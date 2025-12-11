"use client";

import { useState } from "react";
import { useConnection } from "wagmi";
import { useSampleHook } from "../hooks";
import { greetUser } from "../actions";
import { SampleCard } from "../components/SampleCard";

export const SampleView = () => {
  const { count, increment, decrement, reset, inputValue, setInputValue } =
    useSampleHook();
  const [greetMessage, setGreetMessage] = useState("");
  const { address } = useConnection();

  const handleGreet = async () => {
    const result = await greetUser(address || undefined, { name: inputValue });
    if (result?.data) {
      setGreetMessage(result.data.message);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Sample View</h1>

      <SampleCard title="Counter">
        <div className="space-y-4">
          <p className="text-2xl font-semibold">Count: {count}</p>
          <div className="flex gap-2">
            <button
              onClick={increment}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              +1
            </button>
            <button
              onClick={decrement}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              -1
            </button>
            <button
              onClick={reset}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </SampleCard>

      <SampleCard title="Greeting Action">
        <div className="space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded border border-gray-300 px-4 py-2"
          />
          <button
            onClick={handleGreet}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Greet
          </button>
          {greetMessage && (
            <p className="text-lg font-medium text-green-700">{greetMessage}</p>
          )}
        </div>
      </SampleCard>
    </div>
  );
};
