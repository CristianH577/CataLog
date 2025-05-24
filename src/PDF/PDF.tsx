import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { DB } from "./consts/dbs";
import { TypeObjectGeneral } from "../consts/types";
import undefinedImg from "./imgs/undefined.webp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { titleColor } from "../libs/tvs";
import { findItemImgs, toPriceFormat } from "./libs/functions";

export default function PDF() {
  const [pages, setPages] = useState<TypeObjectGeneral[][]>([]);

  const total_pages = pages.length;

  const MakeItems = () => {
    const pages_: TypeObjectGeneral[][] = [];

    const DB_imgs = structuredClone(DB).map((item: TypeObjectGeneral) => {
      item.img = findItemImgs(item.id)[0];

      return item;
    });

    const items_per_page = 6;
    for (let i = 0; i < DB_imgs.length; i += items_per_page) {
      pages_.push(DB_imgs.slice(i, i + items_per_page));
    }

    setPages(pages_);
  };

  useEffect(MakeItems, []);

  return pages.map((page, i) => (
    <section
      key={i}
      className="border p-8 w-[840px] h-[1188px] flex flex-col font-[monserrat]"
    >
      <article className="flex justify-between pb-1 px-2 text-neutral-500">
        <div className="flex-1 flex items-center gap-1">
          <InstagramIcon className="text-fuchsia-700" /> /Instagram
        </div>
        <div className="uppercase font-bold">LOGO/NOMBRE</div>
        <div className="flex-1 flex items-center gap-1 justify-end">
          <WhatsAppIcon className="text-green-500" /> 381 999 9999
        </div>
      </article>

      <Divider variant="middle" />

      <article className="h-full grid grid-cols-3 grid-rows-2 gap-4 py-2">
        {page?.length > 0 &&
          page.map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <img
                src={item?.img || undefinedImg}
                alt=""
                className="rounded-lg w-[245px] h-[245px] object-contain"
              />

              <div className="flex flex-col items-center px-1">
                <h3 className="text-sm capitalize text-neutral-400">
                  {item?.categoria || "Otros"}
                </h3>

                <h3
                  className={`text-center line-clamp-2 ${titleColor({
                    color: "blue",
                  })}`}
                >
                  {item.label}
                </h3>

                <span
                  className={`line-clamp-1 ${titleColor({
                    color: "yellow",
                  })}`}
                >
                  {toPriceFormat(item?.price || item?.prices?.[1] || 0)}
                </span>
              </div>

              <div className="px-1 flex-1 flex flex-col justify- gap-0.5">
                {item?.prices && Object.keys(item?.prices).length > 1 && (
                  <div>
                    <Divider variant="middle" />
                    <div className="py-1 flex flex-wrap gap-2 overflow-hidden max-h-[calc(2*2rem)]">
                      {Object.entries(item?.prices)
                        .slice(1, 4)
                        .map(([k, v], h) => (
                          <div key={h} className="whitespace-nowrap">
                            <span className="font-semibold">{k}:</span>{" "}
                            {toPriceFormat(v)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {item?.info && Object.keys(item?.info).length > 0 && (
                  <div>
                    <Divider variant="middle" />
                    <ol className="list-none py-1">
                      {Object.entries(item?.info)
                        .slice(0, 3)
                        .map(([k, v], h) => (
                          <li key={h} className="line-clamp-1">
                            <span className="font-semibold capitalize">
                              {k}:
                            </span>{" "}
                            {v}
                          </li>
                        ))}
                    </ol>
                  </div>
                )}

                {item?.caracteristicas?.length > 0 && (
                  <div>
                    <Divider variant="middle" />
                    <div className="text-center line-clamp-2 py-1">
                      {item?.caracteristicas.slice(0, 4).map(
                        //@ts-ignore
                        (e, h) =>
                          e && (
                            <span key={h} className="font-semibold">
                              {h > 0 && " - "}
                              {e}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* {item?.descripcion && (
                  <>
                    <Divider variant="middle" />
                    <p className="line-clamp-3">
                      {item?.descripcion} fffff fffff ffffff ffff fffffff fffff
                      ffffff fffffff fffffff ffffffff ffff dsafasdfasdfasdfsda
                      sfdsafsadfasd
                    </p>
                  </>
                )} */}
              </div>
            </div>
          ))}
      </article>

      <Divider variant="middle" />

      <article className="flex justify-between pt-1 px-2 text-neutral-500">
        <div className="flex-1 flex items-center gap-1">
          {/* <FacebookIcon className="text-blue-500" /> /Facebook */}
          Dirección
        </div>
        <div className="">Los precios pueden variar.</div>
        <div className="flex-1 text-end">
          Pag. {i + 1}/{total_pages}
        </div>
      </article>
    </section>
  ));
}
