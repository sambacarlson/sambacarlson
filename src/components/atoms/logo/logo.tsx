import React, { useState } from "react";
import tailwindConfig from "../../../../tailwind.config";
import { ProfileType } from "@/types";
import { getThemeColor } from "@/utils";
import { useRouter } from "next/navigation";

export default function Logo({
  box_size,
  font_size,
  profile,
  active,
  redirect_url,
}: {
  box_size: number;
  font_size: number;
  profile: ProfileType;
  active?: boolean;
  redirect_url?: string;
}) {
  const [[theme, themeLight], setTheme] = React.useState<[string, string]>([
    "default",
    "defaultLight",
  ]);

  React.useEffect(() => {
    setTheme(getThemeColor(profile));
  }, []);

  const router = useRouter();
  return (
    <div
      onClick={() => {
        redirect_url && router.replace(redirect_url);
      }}
      className={`relative flex items-center justify-center ${
        redirect_url && "cursor-pointer"
      }`}
    >
      <div
        className={`rounded-full border-2 absolute bg-white ${
          active && "motion-safe:animate-spin-slow"
        }`}
        style={{
          width: box_size * 1.5,
          height: box_size * 1.5,
          borderWidth: box_size * 0.1,
          borderInlineColor: theme,
          borderBlockColor: themeLight,
        }}
      />
      <p
        className={`text-center font-mono font-black z-10`}
        style={{ fontSize: font_size, color: theme }}
      >
        K<span style={{ color: themeLight }}>S</span>C
      </p>
    </div>
  );
}
