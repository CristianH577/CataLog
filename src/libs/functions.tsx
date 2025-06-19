import undefinedImg from "../assets/imgs/items/undefined.webp";
import { ItemData, TypeFilterValues } from "../consts/types";

export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const toPriceFormat = (price = 0) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const findItemImgs = (id = 0) => {
  const images_all = import.meta.glob(
    "../assets/imgs/items/**/*.{png,jpg,jpeg,svg,webp}",
    {
      eager: true,
    }
  );

  let imgs = Object.entries(images_all).filter(([path, _]) =>
    path.includes("/" + id + "/")
  );

  if (!imgs.length) {
    const img = Object.entries(images_all).find(([path, _]) =>
      path.includes("items/" + id + ".")
    );

    if (img) imgs = [img];
  }

  const srcs = imgs.map(
    ([_, module]) => (module as { default: string }).default
  );

  if (srcs.length) return srcs;

  return [undefinedImg];
};

export function cartItemsComparator(col: string, order: string) {
  return function (a: ItemData, b: ItemData): number {
    let type = "text";
    if (["price", "id", "qtt", "subtotal"].includes(col)) type = "number";

    let val_a = a[col as keyof ItemData] ?? "";
    let val_b = b[col as keyof ItemData] ?? "";

    if (type === "text" && val_a === "") {
      val_a = a.info ? a.info[col as keyof ItemData] ?? "" : "";
      val_b = b.info ? b.info[col as keyof ItemData] ?? "" : "";
    }

    let bool = 0;
    if (type === "number") {
      bool = Number(val_a) - Number(val_b);
    } else {
      bool = String(val_a).localeCompare(String(val_b));
    }

    if (order === "desc") return -bool;
    return bool;
  };
}

export const getHrefSearch = (filtersValues: TypeFilterValues) => {
  let href = "";
  const add = [];
  for (const key in filtersValues) {
    if (!["apply", "page"].includes(key)) {
      const val = filtersValues[key as keyof TypeFilterValues];
      if (val) add.push([key, val]);
    }
  }

  if (add.length > 0) {
    add.forEach((e, i) => {
      href += i === 0 ? "?" : "&";
      href += e[0] + "=" + e[1];
    });
  }

  return href;
};
