"use client";

import { useState } from "react";
import Image from "next/image";

export default function FeedsAndSpeedsCalculator() {
  const [toolDiameter, setToolDiameter] = useState<number | null>(null);
  const [spindleSpeed, setSpindleSpeed] = useState<number>(0);
  const [numberOfFlutes, setNumberOfFlutes] = useState<number | "">("");
  const [results, setResults] = useState<{ cuttingFeedrate: number; plungeFeedrate: number } | null>(null);

  const calculateFeedrates = () => {
    if (!toolDiameter || !numberOfFlutes) return;

    const feedPerTooth = toolDiameter === 6 ? 0.0166 : 0.0138;
    const cuttingFeedrate = Math.round(spindleSpeed * numberOfFlutes * feedPerTooth);
    const plungeFeedrate = cuttingFeedrate / 3;

    setResults({ cuttingFeedrate, plungeFeedrate });
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">CNC Feeds and Speeds Calculator</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Tool Diameter:</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => {
              const choice = parseInt(e.target.value, 10);
              if (choice === 6) {
                setToolDiameter(6);
                setSpindleSpeed(20000);
              } else if (choice === 4) {
                setToolDiameter(4);
                setSpindleSpeed(24000);
              } else if (choice === 3) {
                setToolDiameter(3);
                setSpindleSpeed(24000);
              } else {
                setToolDiameter(6);
                setSpindleSpeed(20000);
              }
            }}
          >
            <option value="">-- Select --</option>
            <option value="10">10mm</option>
            <option value="8">8mm</option>
            <option value="6.35">1/4in</option>
            <option value="6">6mm</option>
            <option value="4">4mm</option>
            <option value="3">3mm</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Flutes:</label>
          <input
            type="number"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={numberOfFlutes}
            onChange={(e) => setNumberOfFlutes(parseInt(e.target.value, 10) || "")}
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700"
          onClick={calculateFeedrates}
        >
          Calculate
        </button>

        {results && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Results:</h2>
            <p>Tool Diameter: {toolDiameter}mm</p>
            <p>Spindle Speed: {spindleSpeed} RPM</p>
            <p>Cutting Feedrate: {results.cuttingFeedrate.toFixed(2)} mm/min</p>
            <p>Plunge Feedrate: {results.plungeFeedrate.toFixed(2)} mm/min</p>
            <p className="text-sm text-gray-600 mt-2">
              Note: Use the cutting feedrate for general operations. For plunging, use the plunge feedrate.
            </p>
            <Image
              src="/avisar-hatich.JPG"
              alt="Feeds and Speeds Chart"
              width={500}
              height={500}
              className="rounded-md mt-4"
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}
