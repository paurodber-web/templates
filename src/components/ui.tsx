import type { ComponentChildren as ReactNode, ComponentType, ComponentType as ElementType } from "preact";
import { ArrowUpRight } from "lucide-preact";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`site-container ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`h-px w-10 ${light ? "bg-clay-soft/70" : "bg-clay/60"}`} />
      <span className={`text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] leading-[1.5] ${light ? "text-clay-soft" : "text-clay"}`}>
        {children}
      </span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  desc,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className={`mt-6 text-[2rem] min-[641px]:text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.16] tracking-[-0.035em] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {desc && (
        <p
          className={`text-[16px] min-[641px]:text-[17px] leading-[1.75] lg:col-span-5 lg:pb-2 ${
            light ? "text-white/65" : "text-muted"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function Accent({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`accent-text ${light ? "text-clay-soft" : "text-clay"}`}>{children}</span>;
}

type BtnProps = {
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "outline-light";
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  as?: ElementType;
};

export function Btn({
  children,
  variant = "dark",
  href,
  onClick,
  arrow = false,
  className = "",
  type = "button",
}: BtnProps) {
  const styles = {
    dark: "bg-ink text-white hover:bg-ink-soft border border-ink",
    light: "bg-white text-ink hover:bg-sand border border-white",
    outline: "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-white",
    "outline-light": "bg-transparent text-white border border-white/40 hover:bg-white hover:text-ink",
  }[variant];
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-sm px-6 py-3.5 text-[14px] leading-[1.2] transition-colors duration-300 ${styles} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  if (href)
    return (
      <a href={href} onClick={onClick} className={cls}>
        {content}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

/** Tarjeta de concepto: caja con icono + número, título y descripción (manifest / com funciona) */
export function ConceptCard({
  n,
  icon: Icon,
  title,
  text,
  caption,
  process = false,
}: {
  n: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  text: string;
  caption?: string;
  process?: boolean;
}) {
  return (
    <div className="group flex h-full flex-col rounded-md border border-line bg-white p-7 transition-colors duration-300 hover:border-ink/25">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-line text-clay">
          <Icon size={20} strokeWidth={1.4} />
        </div>
        <span className="text-[12px] tracking-[0.2em] text-muted/70">{n}</span>
      </div>
      <h3 className={`mt-8 leading-[1.16] text-ink ${process ? "text-[19px] tracking-[-0.035em]" : "text-[17px] tracking-[-0.02em]"}`}>{title}</h3>
      <p className={`mt-3 text-muted ${process ? "text-[14.5px] min-[641px]:text-[13.5px] leading-[1.8]" : "text-[14.5px] leading-[1.75]"}`}>{text}</p>
      {caption && (
        <div className="mt-auto pt-7">
          <div className="border-t border-line pt-4 text-[11px] min-[641px]:text-[9.5px] uppercase tracking-[0.14em] text-clay">
            {caption}
          </div>
        </div>
      )}
    </div>
  );
}
