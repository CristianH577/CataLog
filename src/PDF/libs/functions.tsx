import undefinedImg from "../imgs/undefined.webp";

export const toPriceFormat = (price = 0) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export const findItemImgs = (id = 0) => {
  const images_all = import.meta.glob(
    "../imgs/items/**/*.{png,jpg,jpeg,svg,webp}",
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
