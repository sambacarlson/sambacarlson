import { ProfileType } from "@/types";

const colors = {
  primary: "#33f", //blue
  primaryLight: "#99f", // blue
  secondary: "#381", // green
  secondaryLight: "#aea", // green
  tertiary: "#967bb6", // lavender
  tertiaryLight: "#e6e6fa", // lavender
  quatenary: "#f55", // red
  quatenaryLight: "#f99", // red
  default: "#222020", // dark
  defaultLight: "#bbb", //
};

export function getThemeColor(profile: ProfileType): [string, string] {
  switch (profile) {
    case "teacher":
      return [colors.primary, colors.primaryLight]
    case "designer":
      return [colors.quatenary, colors.quatenaryLight]
    case "theologian":
      return [colors.tertiary, colors.tertiaryLight]
    case "developer":
      return [colors.secondary, colors.secondaryLight]
    default:
      return [colors.default, colors.defaultLight]
  }
}
