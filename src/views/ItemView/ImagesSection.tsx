import { useState } from "react";

export default function ImagesSection({ imgs = [] }) {
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <section className="sm:flex rounded-sm overflow-hidden">
      {imgs.length > 1 && (
        <article className="scroll-smooth scrollbar scrollbar-h-2 scrollbar-w-2 scrollbar-thumb-blue-500/50 hover:scrollbar-thumb-blue-500/80 scrollbar-thumb-rounded-full pe-0.5 w-full max-w-[90vw] max-sm:place-self-center grid grid-flow-col auto-cols-[100px] overflow-auto gap-2 sm:auto-cols-auto sm:w-[80px] sm:h-[300px] sm:grid-flow-row sm:auto-rows-[80px]">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`img-${i}`}
              loading="lazy"
              className="cursor-pointer hover:border-2 border-blue-500 h-full object-cover"
              onClick={() => setSelectedImg(i)}
            />
          ))}
        </article>
      )}

      <div className="sm:h-[300px] w-full flex items-center justify-center">
        <img
          src={imgs[selectedImg]}
          alt="imagen principal"
          loading="lazy"
          className="object-contain h-full drop-shadow-md"
        />
      </div>
    </section>
  );
}
