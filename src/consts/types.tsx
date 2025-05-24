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
  info?: { [key: string]: any | undefined };
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
  text: string;
  apply: boolean;
  orderBy: string;
  categorie: string;
  marca: string;
  medidas: string;
  price: {
    min: string | number;
    max: string | number;
  };
};

export type TypeOrder = "asc" | "desc" | undefined;

export interface TypeInputFilter {
  id: string;
  label: string;
  format: string;
  items?: { id: string; label: string }[];
}

export type TypeColumnTable = {
  id: keyof ItemData | string;
  label: string;
  numeric: boolean;
};
