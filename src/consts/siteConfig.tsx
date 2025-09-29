import {
  FaSearch,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaShoppingCart,
} from "react-icons/fa";

export const NAV_ITEMS = [
  // { id: "", href: "", label: "Inicio", icon: IoHomeOutline },
  { id: "searchView", href: "search", label: "Buscar", icon: FaSearch },
  { id: "cartView", href: "cart", label: "Carrito", icon: FaShoppingCart },
  // { id: "faqs", href: "faqs", label: "FAQs", icon: FaRegQuestionCircle },
];

export const LINKS_CONTACT = [
  {
    id: "wp",
    icon: FaWhatsapp,
    label: "Whatsapp",
    href: "https://api.whatsapp.com/send?phone=543813545903&text=Hola. Me interesa tener un catalogo online.",
  },
  { id: "fb", icon: FaFacebook, label: "Facebook", href: "" },
  {
    id: "ig",
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/verde_ave/",
  },
];

export const FILTERS_INPUTS = [
  {
    id: "orderBy",
    label: "Ordenar por",
    format: "select",
    items: [
      { id: "id-asc", label: "Mas antiguo" },
      { id: "id-desc", label: "Mas reciente" },
      { id: "label-desc", label: "Nombre 🡣" },
      { id: "label-asc", label: "Nombre 🡡" },
      { id: "price-asc", label: "Precio 🡣" },
      { id: "price-desc", label: "Precio 🡡" },
    ],
  },
  {
    id: "categorie",
    label: "Categoría",
    format: "select",
    items: [
      { id: "almacen", label: "Almacén" },
      { id: "bebidas", label: "Bebidas" },
      { id: "frutas", label: "Frutas" },
      { id: "higiene", label: "Higiene" },
      { id: "limpieza", label: "Limpieza" },
      { id: "mascotas", label: "Mascotas" },
      { id: "otros", label: "Otros" },
    ],
  },
  {
    id: "marca",
    label: "Marca",
    format: "text",
  },
  {
    id: "medidas",
    label: "Medidas",
    format: "text",
  },
  {
    id: "price",
    label: "Precio",
    format: "number",
  },
];

export const ITEM_DATA_DEFAULT = {
  id: 0,
  label: "Titulo",
  price: 0,
  info: {
    medida: "medida",
    color: "color",
    materiales: "materiales",
    marca: "Genérica",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  imgs: [],
};

export const FILTERS_VALUES_DEFAULT = {
  apply: false,
  page: 1,
  orderBy: "",
  text: "",
  categorie: "",
  marca: "",
  medidas: "",
  priceMin: undefined,
  priceMax: undefined,
};
