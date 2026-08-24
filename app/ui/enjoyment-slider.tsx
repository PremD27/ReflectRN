"use client";

import { useState } from "react";

type EnjoyementLevel = "1" | "2" | "3" | "4" | "5";

export default function EnjoymentSlider( {defaultValue}: {defaultValue? : string | number} ){
    const initialLevel = (defaultValue ? String(defaultValue) : "3") as EnjoyementLevel;
    const [enjoymentLevel, setEnjoymentLevel] = useState<EnjoyementLevel>(initialLevel);

    const enjoymentTable = {
        "1": "very unenjoyable",
        "2": "unenjoyable",
        "3": "neutral",
        "4": "enjoyable",
        "5": "very enjoyable",
    };
    
    const percent = ((Number(enjoymentLevel) - 1) / 4) * 100;

    return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-ink/70">Enjoyment</p>
        <p className="text-sm font-medium text-sage-700">{enjoymentTable[enjoymentLevel]}</p>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        name="procedure-enjoyment"
        value={enjoymentLevel}
        onChange={(e) => setEnjoymentLevel(e.target.value as EnjoyementLevel)}
        style={{
          background: `linear-gradient(to right, var(--color-sage-600) ${percent}%, #e5e0d8 ${percent}%)`,
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-full
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-sage-600
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-sage-600
          [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
  );
}
