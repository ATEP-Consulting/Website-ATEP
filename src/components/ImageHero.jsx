import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { Image } from "./Image";
import { tDisplay, tSerif, tEyebrow } from "../lib/typography";

const ImageHero = ({
  eyebrow,
  title,
  description,
  backgroundImage,
  alt,
  cta,
}) => {
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className="px-6 sm:px-10 lg:px-16 pt-12 pb-14 tm:pt-24 tm:pb-20"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className={
          hasImage
            ? "grid grid-cols-1 tm:grid-cols-5 gap-10 tm:gap-16 items-center"
            : ""
        }
      >
        <div className={hasImage ? "tm:col-span-3" : "max-w-4xl"}>
          {eyebrow && (
            <Reveal y={16}>
              <div style={tEyebrow("var(--muted)")}>— {eyebrow}</div>
            </Reveal>
          )}
          <Reveal delay={eyebrow ? 120 : 0} y={32} dur={1100}>
            <h1
              className="mt-10 tm:mt-16 mb-0"
              style={{
                ...tDisplay("clamp(40px, 7vw, 88px)", 500),
                color: "var(--ink)",
              }}
            >
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={320} y={20}>
              <p
                className="mt-6 tm:mt-8 italic mb-0"
                style={{
                  ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                  color: "var(--muted)",
                  maxWidth: 720,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </p>
            </Reveal>
          )}
          {cta && cta.label && cta.to && (
            <Reveal delay={480} y={16}>
              <div className="mt-7 tm:mt-10">
                <Link
                  to={cta.to}
                  className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
                  style={{ background: "var(--navy)", color: "var(--bg)" }}
                >
                  {cta.label} →
                </Link>
              </div>
            </Reveal>
          )}
        </div>

        {hasImage && (
          <Reveal delay={280} y={36} dur={1100} className="tm:col-span-2">
            <div
              className="relative w-full mx-auto"
              style={{
                aspectRatio: "4/5",
                maxHeight: "min(640px, 72vh)",
                maxWidth: "min(540px, 100%)",
              }}
            >
              <Image
                src={backgroundImage}
                alt={alt || title}
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 820px) 100vw, 40vw"
                priority
                width={540}
                height={675}
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default ImageHero;
