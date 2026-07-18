/** A single navigation entry. */
export type NavItem = {
  label: string;
  href: string;
  /** Optional child links rendered as a dropdown / grouped list. */
  children?: NavItem[];
  /** Mark as external to render with rel/target and an external icon. */
  external?: boolean;
};

/** Supported social platforms mapped to their icon key in the UI layer. */
export type SocialIconKey =
  | "twitter"
  | "linkedin"
  | "github"
  | "instagram"
  | "facebook"
  | "youtube";

/** A social profile link. */
export type SiteSocial = {
  label: string;
  href: string;
  icon: SocialIconKey;
};

/** Footer column grouping a set of navigation links. */
export type FooterColumn = {
  title: string;
  items: NavItem[];
};
