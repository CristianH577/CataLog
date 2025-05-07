import { ChangeEvent, MouseEvent } from "react";
import { IconType } from "react-icons";

export type RouteType = {
  id: string;
  label: string;
  href: string;
  icon: IconType | null;
};

//cartView
export interface ItemData {
  id: number;
  label: string;
  categoria: string;
  description: string;
  price: number;
  medidas: string;
  marca: string;
  subtotal: number;
  qtt: number;
  img: string;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  id: keyof ItemData;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof ItemData) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  cols: [];
}
