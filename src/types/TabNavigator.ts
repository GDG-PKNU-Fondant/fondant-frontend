export interface Tab {
  label: string;
  key: string;
  customStyles?: string;
}

export interface TabNavigatorProps {
  tabs: Tab[];
  onTabChange?: (key: string) => void;
  defaultColor?: string;
  selectedColor?: string;
}
