export interface Tab {
  label: string;
  key: string;
  fixedColor?: string;
}

export interface TabNavigatorProps {
  tabs: Tab[];
  onTabChange?: (key: string) => void;
  bottomBorder?: boolean;
  defaultColor?: string;
  selectedColor?: string;
  textSize?: number;
  fixedTextSize?: number;
  fixedFontWeight?: string;
}
