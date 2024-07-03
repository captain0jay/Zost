"use client"
import React, { useState } from 'react';

export default function Pagespreview() {
  const boxes = [1, 2, 3];
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  return (
    <div className='w-full h-full p-2'>
      <div className="w-full text-sm flex justify-center">Pages</div>
      <div className="flex flex-col gap-2 mt-2">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`w-full h-[90px] rounded-xl bg-gray-300 border transition-colors ${
              selectedBox === box 
                ? 'border-blue-500' 
                : 'border-gray-300'
            } ${
              selectedBox !== null && selectedBox !== box
                ? 'opacity-40' 
                : ''
            }`}
            onClick={() => setSelectedBox(box)}
          />
        ))}
      </div>
    </div>
  );
}
