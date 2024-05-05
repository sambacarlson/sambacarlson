import React, { useState } from "react";
import tailwindConfig from "../../../tailwind.config";

export default function Logo({
  box_size,
  font_size,
  theme,
  active,
}: {
  box_size: number;
  font_size: number;
  theme: "primary" | "secondary" | "tertiary";
  active?: boolean;
}) {
  const setTheme: string = tailwindConfig.theme?.extend?.colors?.[`${theme}`];
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`rounded-full border-2 border-y-secondaryLight absolute bg-white ${
          active && "motion-safe:animate-spin-slow"
        }`}
        style={{
          width: box_size * 1.5,
          height: box_size * 1.5,
          borderWidth: box_size * 0.1,
          borderLeftColor: setTheme,
          borderRightColor: setTheme,
        }}
      />
      <p
        className={`text-center font-mono font-black text-[${font_size}] text-black z-10`}
      >
        K<span style={{ color: setTheme }}>S</span>C
      </p>
    </div>
  );
}
