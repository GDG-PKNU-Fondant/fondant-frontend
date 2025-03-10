export interface Tab {
  label: string;
  key: string;
  fixedColor?: string;
}

export interface TabNavigatorProps {
  tabs: Tab[];
  onTabChange?: (key: string) => void;
  defaultColor?: string;
  selectedColor?: string;
  textSize?: number;
  fixedTextSize?: number;
  fixedFontWeight?: string;
}
