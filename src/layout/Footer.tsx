import { LINKS_CONTACT } from "../consts/siteConfig";

import { titleColor } from "../libs/tvs";

import { Divider, Link } from "@mui/material";

import { FaExternalLinkAlt } from "react-icons/fa";

import { SVGLogo } from "../assets/svgs/SVGLogo";

const links = [
  { label: "Prductos", href: "#" },
  { label: "Carrito", href: "#cart" },
];

const info = [
  { label: "Direccion", value: "Calle, Provincia, Pais" },
  { label: "Celular", value: "+99 999 999 9999" },
  { label: "Telefono", value: "+99 999 999 9999" },
  { label: "Email", value: "catalog@negocio.com" },
];

const class_title =
  "text-xl font-bold border-b-2 border-neutral-400/50 ps-1 pe-6 mb-1 max-sm:w-fit";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-primary-2 to-primary text-white p-4 pb-2 mt-8">
      <div className="max-w-[1200px] place-self-center space-y-4 w-full ">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8 lg:py-8">
          <div className="drop-shadow-md whitespace-nowrap xs:flex items-end gap-1 lg:flex-col lg:items-start">
            <SVGLogo size={1.3} />
            <h1
              className={`py-2 ${titleColor({
                color: "yellow",
                size: "xl",
              })}`}
            >
              Cata-Log
            </h1>
          </div>

          <section className="max-sm:space-y-4 sm:flex sm:flex-row sm:flex-wrap gap-8 sm:mt-4 lg:gap-12">
            <article>
              <h2 className={class_title}>Secciones</h2>
              <ol>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      underline="hover"
                      className="text-white"
                      title={`Ir a ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </article>

            <article>
              <h2 className={class_title}>Redes</h2>
              <ol>
                {LINKS_CONTACT.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-2 items-center text-white"
                      title={`Ir a ${item.label}`}
                    >
                      <item.icon /> {item.label} <FaExternalLinkAlt size={12} />
                    </Link>
                  </li>
                ))}
              </ol>
            </article>

            <article>
              <h2 className={class_title}>Contacto</h2>
              <ol>
                {info.map((item) => (
                  <li key={item.label}>
                    <span className="font-semibold">{item.label}:</span>{" "}
                    {item.value}
                  </li>
                ))}
              </ol>
            </article>
          </section>
        </div>

        <Divider variant="middle" className="bg-neutral-400" />

        <p className="text-neutral-400 text-center">
          2025 - Diseñado por{" "}
          <Link
            href="https://github.com/CristianH577"
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al perfil de Github"
            className="text-inherit hover:underline"
          >
            <span className="font-mono">©</span>
            VerdeAve
          </Link>
        </p>
      </div>
    </footer>
  );
}
