"use client";

import { useState } from "react";
import Image from "next/image";

export default function FeedsAndSpeedsCalculator() {
  const [toolDiameter, setToolDiameter] = useState<number | null>(null);
  const [spindleSpeed, setSpindleSpeed] = useState<number>(0);
  const [numberOfFlutes, setNumberOfFlutes] = useState<number | "">("");
  const [results, setResults] = useState<{
    cuttingFeedrate: number;
    plungeFeedrate: number;
  } | null>(null);

  const [tappedHoleSize, setTappedHoleSize] = useState<string>("");
  const [drillResults, setDrillResults] = useState<{ drillSize: string } | null>(null);

  const drillSizeChart: { [key: string]: string } = {
    "M3": "2.5mm",
    "M4": "3.3mm",
    "M5": "4.2mm",
    "M6": "5.0mm",
    "M8": "6.8mm",
    "M10": "8.5mm",
  };

  const calculateFeedrates = () => {
    if (!toolDiameter || !numberOfFlutes) return;

    const feedPerTooth = toolDiameter === 6 ? 0.0166 : 0.0138;
    const cuttingFeedrate = Math.round(spindleSpeed * numberOfFlutes * feedPerTooth);
    const plungeFeedrate = cuttingFeedrate / 3;

    setResults({ cuttingFeedrate, plungeFeedrate });
  };

  const calculateDrillSize = () => {
    const drillSize = tappedHoleSize ? drillSizeChart[tappedHoleSize] || "N/A" : "";
    setDrillResults({ drillSize });
  };

  return (
    <div className="flex flex-wrap justify-center items-start gap-6 p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-700">Yezor Tools</h1>
      <div className="flex flex-wrap justify-center items-start gap-6 p-8 min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">CNC Feeds and Speeds Calculator</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Tool Diameter:</label>
            <select
              className="w-full h-8 border-2 text-gray-700 border-slate-400 rounded-md shadow-sm bg-slate-50 focus:ring-red-700 focus:border-red-700"
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
              className="w-full h-8 rounded-md shadow-sm text-gray-700 bg-slate-50 border-2 border-slate-400 focus:ring-red-700 focus:border-red-700"
              value={numberOfFlutes}
              onChange={(e) => setNumberOfFlutes(parseInt(e.target.value, 10) || "")}
            />
          </div>

          <button
            className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-800"
            onClick={calculateFeedrates}
          >
            Calculate
          </button>

          {results && (
            <div className="mt-6 text-gray-700">
              <h2 className="text-lg font-semibold text-gray-700">Results:</h2>
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
                className="rounded-md mt-4 hover:scale-x-150 hover:rotate-12 transotion-transform duration-500"
              ></Image>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">Tapped Hole Drill Size Calculator</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Tapped Hole Size:</label>
            <select
              className="w-full h-8 border-2 text-gray-700 border-slate-400 rounded-md shadow-sm bg-slate-50 focus:ring-red-700 focus:border-red-700"
              value={tappedHoleSize}
              onChange={(e) => setTappedHoleSize(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="M3">M3</option>
              <option value="M4">M4</option>
              <option value="M5">M5</option>
              <option value="M6">M6</option>
              <option value="M8">M8</option>
              <option value="M10">M10</option>
            </select>
          </div>

          <button
            className="w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-800"
            onClick={calculateDrillSize}
          >
            Calculate
          </button>

          {drillResults && (
            <div className="mt-6 text-gray-700">
              <h2 className="text-lg font-semibold text-gray-700">Results:</h2>
              <p>Recommended Drill Size for Tapped Hole ({tappedHoleSize}): {drillResults.drillSize}</p>
              <Image
                src="/noga.JPG"
                alt="Feeds and Speeds Chart"
                width={500}
                height={500}
                className="rounded-md mt-4 hover:scale-x-150 hover:-rotate-12 transotion-transform duration-500"
              ></Image>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
