import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { tEyebrow, FONT } from "../lib/typography";
import { clients } from "../data/clientsData";

export const ClientsMarquee = () => {
  const { t } = useLanguage();
  // Duplicamos para loop sin huecos. La animación mueve -50% del track,
  // que coincide exactamente con el final de la primera copia.
  const loop = [...clients, ...clients];

  if (clients.length === 0) return null;

  return (
    <section
      className="px-6 sm:px-10 lg:px-16 py-10 tm:py-14"
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        background: "var(--bg)",
      }}
    >
      <div className="max-w-[1600px] mx-auto">
        <Reveal y={16}>
          <div className="mb-6 tm:mb-8" style={tEyebrow("var(--muted)")}>
            — {t("logo.title")}
          </div>
        </Reveal>

        <div
          className="group relative overflow-hidden"
          style={{
            // Fade lateral para que los nombres no aparezcan/desaparezcan en seco
            maskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
          >
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= clients.length}
                className="whitespace-nowrap italic px-8 tm:px-12"
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(20px, 1.8vw, 26px)",
                  fontWeight: 400,
                  color: "var(--muted)",
                  letterSpacing: "-0.005em",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
