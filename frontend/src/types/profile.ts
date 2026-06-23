export type ProfileType = "default" | "teacher" | "designer" | "theologian" | "developer";

export interface ProfileDataType {
  name: string;
  tagline: string;
  bio: string;
  photo: string;
  contact: ContactType;
  socialLinks: SocialLinkType[];
}

export interface ContactType {
  email: string;
  location: string;
}

export interface SocialLinkType {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "youtube" | "facebook" | "website";
}