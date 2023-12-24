import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

interface Tab {
  name: string;
  icon: string;
}

interface DecalType {
  stateProperty: string;
  filterTab: string;
}

export const EditorTabs: Tab[] = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs: Tab[] = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes: Record<string, DecalType> = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
