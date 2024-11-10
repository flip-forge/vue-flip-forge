export interface FlipForgeTheme {
  "--background"?: string;
  "--toolbarColor"?: string;
}

export interface FlipForgeOptions {
  keyboardNavigation?: boolean;
  clickNavigation?: boolean;
  wheelNavigation?: boolean;
  toolbar?: boolean;
  singlePageMode?: boolean | number;
  theme?: FlipForgeTheme;
  attribution?: boolean;
}

export interface FlipPage {
  url: string;
  number: number;
}
