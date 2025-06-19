import { IconType } from "react-icons";

export type TypeObjectGeneral = { [key: string]: any };

export type TypeRoute = {
  id: string;
  label: string;
  href: string;
  icon: IconType | null;
};

export type ItemData = {
  id: number;
  label: string;
  categoria?: string;
  description?: string;
  price?: number;
  prices?: { [key: number]: number };
  info?: { [key: string]: string | number | undefined };
  info_plus?: String[];
  subtotal?: number;
  qtt?: number;
  img?: string;
  imgs?: string[];
};

export type TypeContext = {
  cart: {
    value: { [key: number]: ItemData };
    set: (cart: { [key: number]: ItemData }) => {};
    add: (item: ItemData) => {};
  };
};

export type TypeFilterValues = {
  apply?: boolean;
  page: number;
  text: string;
  orderBy: string;
  categorie: string;
  marca: string;
  medidas: string;
  priceMin?: number;
  priceMax?: number;
};

export type TypeFiltersInput = {
  id: string;
  label: string;
  format: string;
  items?: {
    id: string;
    label: string;
  }[];
};

export type TypeColumnTable = {
  id: keyof ItemData | string;
  label: string;
  numeric: boolean;
};
