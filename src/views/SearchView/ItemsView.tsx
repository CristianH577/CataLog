import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { ItemData, TypeContext } from "../../consts/types";

import { toPriceFormat } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import { Button, Divider } from "@mui/material";

import ButtonCart from "../../components/ButtonCart";
import ImageCustom from "../../components/ImageCustom";

type TypeItemsViewProps = {
  items: ItemData[];
  totalItems?: number;
  showMoreItems?: () => void;
};

export default function ItemsView({
  items = [],
  totalItems = 0,
  showMoreItems = () => {},
}: TypeItemsViewProps) {
  const context: TypeContext = useOutletContext();

  const handleButtonCart = (itemData: ItemData) => {
    const inCart = itemData.id in context.cart.value;

    if (inCart) {
      itemData.qtt = 0;
    } else {
      itemData.qtt = 1;
    }

    context.cart.add(itemData);
  };

  return (
    <motion.section
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className="max-w-[1400px] w-full grid xs:grid-cols-[repeat(auto-fit,_minmax(200px,_240px))] gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center"
    >
      {items.map((item: ItemData, i) => (
        <motion.article
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          className="relative rounded-lg hover:shadow-custom shadow-blue-400 flex flex-col items-center justify-between group/card"
        >
          <a
            href={"#itemview?id=" + item.id}
            title="Ver articulo"
            className="flex flex-col items-center justify-between cursor-pointer xs:max-w-64 w-full p-4"
          >
            <ImageCustom
              src={item.img}
              className="drop-shadow-md rounded-lg object-contain w-full h-full"
              classes={{
                wrapper: "xs:h-[150px] sm:h-[150px] w-full flex items-center",
              }}
              width={150}
              height={150}
            />

            <div className="flex flex-col items-center py-4 px-2">
              <h3 className="text-sm capitalize text-neutral-400">
                {item.categoria}
              </h3>

              <h3
                className={`text-center text-xl ${titleColor({
                  color: "blue",
                  size: "",
                })}`}
              >
                {item.label}
              </h3>

              <span
                className={`text-xl ${titleColor({
                  color: "yellow",
                  size: "",
                })}`}
              >
                {toPriceFormat(item.price)}
              </span>
            </div>
          </a>

          <div className="w-full flex flex-col items-center">
            <Divider className="w-4/5 opacity-0 group-hover/card:opacity-100" />

            <ButtonCart
              className="m-2"
              inCart={item.id in context.cart.value}
              action={() => handleButtonCart(item)}
            />
          </div>
        </motion.article>
      ))}

      <article className="col-span-full">
        <Button
          variant="contained"
          title="Mostrar mas artículos"
          className="h-12 place-self-center"
          style={{ display: items.length < totalItems ? "block" : "none" }}
          onClick={showMoreItems}
        >
          Mostrar mas
        </Button>
      </article>
    </motion.section>
  );
}
