import type { ProcessStage } from "../../types/content";
import { MeasureLine } from "../ui/MeasureLine";
import { pad2 } from "../../utils/math";

type ProcessPanelProps = {stage: ProcessStage;index: number;total?: number;};

export function ProcessPanel({ stage, index }: ProcessPanelProps) {
  const raised = index % 2 === 0;
  return (
    <article
      aria-labelledby={`stage-${stage.id}`}
      className="relative flex w-full shrink-0 flex-col md:flex-row md:items-center md:gap-8 lg:h-full lg:w-[76vw] lg:gap-0 lg:pl-[5vw] xl:w-[64vw]">
      
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden md:w-[52%] lg:aspect-auto lg:h-[55vh] lg:w-[60%] xl:h-[60vh] ${
        raised ? "lg:-translate-y-[5vh]" : "lg:translate-y-[5vh]"}`
        }>
        
        <img
          data-par
          src={stage.image}
          alt={stage.alt}
          loading="lazy"
          className="absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover" />
        
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <div
        className={`relative z-10 mt-6 md:mt-0 md:w-[48%] lg:-ml-[12%] lg:w-[46%] lg:bg-ink lg:p-6 xl:p-8 ${
        raised ? "lg:translate-y-[9vh]" : "lg:-translate-y-[9vh]"}`
        }>
        
        <span aria-hidden="true" className="text-outline-bone block font-display text-[clamp(3.25rem,6.5vw,8rem)] font-bold leading-none tracking-[-0.06em]">
          {pad2(index + 1)}
        </span>
        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-signal xl:mt-3">{stage.caption}</p>
        <h3 id={`stage-${stage.id}`} className="mt-2.5 font-display text-[clamp(1.65rem,2.7vw,3rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone xl:mt-3">
          {stage.title}
        </h3>
        <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-silver sm:text-[15px] xl:mt-4">{stage.description}</p>
        <div className="mt-6 max-w-sm text-silver/80 xl:mt-8">
          <MeasureLine label={stage.readout} />
        </div>
      </div>
    </article>);

}