type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function Logo({ className = "h-11 md:h-[52px]" }: LogoProps) {
  return (
    <span className="inline-flex shrink-0 items-center">
      <img
        src="/vamshi-logo.jpg"
        alt="Vamshi Rubber Limited"
        draggable={false}
        className={`w-auto object-contain [clip-path:inset(1.5px)] ${className}`}
      />
    </span>
  );
}