import React from "react";

export default function Logo({
  box_size,
  font_size,
  active,
}: {
  box_size: number;
  font_size: number;
  active?: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`rounded-full border-2 border-x-secondary border-y-secondaryLight absolute bg-white ${
          active && "motion-safe:animate-spin-slow"
        }`}
        style={{
          width: box_size * 1.5,
          height: box_size * 1.5,
          borderWidth: box_size * 0.1,
        }}
      />
      <p
        className={`text-center font-mono font-black text-[${font_size}] text-black z-10`}
      >
        K<span className="text-secondary">S</span>C
      </p>
    </div>
  );
}
