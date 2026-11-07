import type { ProcessStage } from "../types/content";
import { imagery } from "./imagery";

export const processStages: ProcessStage[] = [
{
  id: "compound",
  title: "Compound processing",
  caption: "Mixing & milling",
  description: "Rubber compound is mixed and milled into uniform batches — the foundation every later stage depends on.",
  readout: "Raw material → Batch",
  image: imagery.processing,
  alt: "Black rubber compound being worked between the steel rollers of a mixing mill"
},
{
  id: "forming",
  title: "Forming & extrusion",
  caption: "Production line",
  description: "Batches are formed into tread strips and profiles on dedicated production machinery.",
  readout: "Batch → Profile",
  image: imagery.extrusion,
  alt: "Tread rubber strip moving along a roller conveyor on a production line"
},
{
  id: "testing",
  title: "Material testing",
  caption: "In-factory laboratory",
  description: "Specimens from production are tested in the laboratory located within the factory itself.",
  readout: "Specimen → Result",
  image: imagery.lab,
  alt: "Rubber test specimen clamped in a tensile testing machine"
},
{
  id: "assurance",
  title: "Quality assurance",
  caption: "Inspection",
  description: "Finished material is inspected and measured before it is released for dispatch.",
  readout: "Strip → Released",
  image: imagery.qa,
  alt: "Inspector measuring tread depth on a precured tread strip with a digital gauge"
},
{
  id: "application",
  title: "On the casing",
  caption: "Retread application",
  description: "At the retreader, precured tread meets a buffed casing — where consistent material shows its value.",
  readout: "Tread → Casing",
  image: imagery.workshop,
  alt: "Precured tread strip being applied to a buffed truck tyre casing in a retreading workshop"
}];