import type { ProfileType } from "@/types";

const colors = {
  primary: "#55f",
  primaryLight: "#99f",
  secondary: "#381",
  secondaryLight: "#aea",
  tertiary: "#967bb6",
  tertiaryLight: "#e6e6fa",
  quatenary: "#f55",
  quatenaryLight: "#f99",
  default: "#222020",
  defaultLight: "#bbb",
};

export function getThemeColor(profile: ProfileType): [string, string] {
  switch (profile) {
    case "teacher":
      return [colors.primary, colors.primaryLight];
    case "designer":
      return [colors.quatenary, colors.quatenaryLight];
    case "theologian":
      return [colors.tertiary, colors.tertiaryLight];
    case "developer":
      return [colors.secondary, colors.secondaryLight];
    default:
      return [colors.default, colors.defaultLight];
  }
}