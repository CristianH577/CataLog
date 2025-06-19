import { useState } from "react";
import { motion } from "framer-motion";

interface InterfaceProps {
  imgs?: string[];
}

export default function ImagesSection({ imgs = [] }: InterfaceProps) {
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <section className="flex flex-col gap-2 sm:flex-row overflow-hidden">
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
        className="scroll-smooth scrollbar scrollbar-h-2 scrollbar-w-2 scrollbar-thumb-blue-500/50 hover:scrollbar-thumb-blue-500/80 scrollbar-thumb-rounded-full pe-0.5 w-full max-w-[90vw] h-[90px] max-sm:place-self-center grid grid-flow-col auto-cols-[100px] overflow-x-auto overflow-y-hidden sm:overflow-y-auto gap-2 sm:auto-cols-auto sm:w-[80px] sm:h-[300px] sm:grid-flow-row sm:auto-rows-[80px]"
      >
        {imgs.map((src, i) => (
          <motion.img
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { opacity: 1, scale: 1 },
            }}
            src={src}
            alt={`img-${i}`}
            loading="lazy"
            className="cursor-pointer hover:border-2 border-blue-500 h-full object-cover"
            onClick={() => setSelectedImg(i)}
          />
        ))}
      </motion.article>

      <div className="min-h-52 xs:min-h-64 sm:h-[300px] w-full flex items-center justify-center">
        <motion.img
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          src={imgs[selectedImg]}
          alt="imagen principal"
          loading="lazy"
          className="object-contain h-full drop-shadow-md"
        />
      </div>
    </section>
  );
}
