import undefinedImg from "../assets/imgs/items/undefined.webp";

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

//order elementos
//@ts-ignore
export function cartItemsComparator(col: string, order: "asc" | "desc") {
  return function (a: Object, b: Object): number {
    let type = "text";
    if (["price", "id", "qtt", "subtotal"].includes(col)) type = "number";

    //@ts-ignore
    let val_a = a?.[col] || "";
    //@ts-ignore
    let val_b = b?.[col] || "";

    if (type === "text" && val_a === "") {
      //@ts-ignore
      val_a = a?.info?.[col] || "";
      //@ts-ignore
      val_b = b?.info?.[col] || "";
    }

    let bool = 0;
    if (type === "number") {
      bool = val_a - val_b;
    } else {
      bool = val_a.localeCompare(val_b);
    }

    if (order === "desc") return -bool;
    return bool;
  };
}
