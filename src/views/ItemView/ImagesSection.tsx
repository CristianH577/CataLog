import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ImageCustom from "../../components/ImageCustom";

interface InterfaceProps {
  imgs?: string[];
}

export default function ImagesSection({ imgs = [] }: InterfaceProps) {
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <section className="flex flex-col gap-2 sm:flex-row">
      {imgs.length > 1 && (
        <motion.article
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="scroll-smooth scrollbar scrollbar-h-2 scrollbar-w-2 scrollbar-thumb-blue-500/50 hover:scrollbar-thumb-blue-500/80 scrollbar-thumb-rounded-full pe-0.5 w-full max-w-[90vw] h-[100px] max-sm:place-self-center grid grid-flow-col auto-cols-[100px] overflow-x-auto overflow-y-hidden sm:overflow-y-auto sm:overflow-x-hidden gap-2 sm:auto-cols-auto sm:w-[80px] sm:h-[300px] sm:grid-flow-row sm:auto-rows-[80px] pb-2"
        >
          {imgs.map((src, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="cursor-pointer hover:border-2 border-blue-500 h-full overflow-hidden"
              onClick={() => setSelectedImg(i)}
            >
              <ImageCustom
                src={src}
                alt={`img-${i}`}
                className="object-cover h-full"
                classes={{ wrapper: "h-full" }}
                width={100}
                height={80}
              />
            </motion.div>
          ))}
        </motion.article>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedImg}
          className="min-h-52 xs:min-h-64 sm:h-[300px] w-full flex items-center justify-center"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <ImageCustom
            src={imgs[selectedImg]}
            alt="imagen principal"
            className="object-contain h-full drop-shadow-md"
            classes={{ wrapper: "h-full" }}
            height={300}
            width={550}
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
