import type { Product } from "../types/content";

export const products: Product[] = [
{
  id: "pctr",
  code: "PCTR",
  name: "Precured Tread Rubber",
  stage: "Tread application",
  process: "Precure retreading",
  form: "Strip with moulded tread",
  summary:
  "A pre-vulcanised tread strip with its pattern already moulded in, bonded to a prepared casing in the precure retreading process.",
  image: "/854a6f22-604c-47ff-b2c9-55cabadc6704.jpg"
},
{
  id: "vulcanising-solution",
  code: "VS",
  name: "Vulcanising Solution",
  stage: "Casing preparation",
  process: "Adhesion",
  form: "Solution",
  summary:
  "A rubber-based solution applied to the buffed casing to build tack and support adhesion before the bonding layer goes on.",
  image: "/771a5551-b947-46be-8e87-57c3318c7141.jpg"
},
{
  id: "cushion-gum",
  code: "CG",
  name: "Cushion Gum",
  stage: "Bonding layer",
  process: "Precure retreading",
  form: "Rolled sheet with liner",
  summary:
  "The uncured layer between buffed casing and precured tread, vulcanising during the curing cycle to join the two.",
  image: "/5c80ad7d-1725-4f52-b298-f6196fa6ec38.jpg"
},
{
  id: "bonding-gum",
  code: "BG",
  name: "Bonding Gum",
  stage: "Repair & bonding",
  process: "Adhesion",
  form: "Strip roll with liner",
  summary: "Uncured gum used to build adhesion in repair and bonding work across the retreading process.",
  image: "/78ec6a48-c2f6-4f11-b14b-31df4302a8f2.jpg"
},
{
  id: "extruded-rope-rubber",
  code: "ERR",
  name: "Extruded Rope Rubber",
  stage: "Casing repair",
  process: "Filling",
  form: "Coiled rope",
  summary:
  "Uncured rubber in rope form, fed through an extruder gun to fill skives and minor injuries before tread application.",
  image: "/60b88836-f6e8-45bf-91d2-fd577d87a26f.jpg"
},
{
  id: "rubber-compound-sheet",
  code: "RCS",
  name: "Rubber Compound Sheet",
  stage: "Casing preparation",
  process: "Filling & building",
  form: "Sheet",
  summary: "Uncured compound supplied in sheet form for filling, building and repair work during casing preparation.",
  image: "/06700d79-e19e-456d-8444-46f3a3bc5d0f.jpg"
},
{
  id: "curing-envelopes",
  code: "CE",
  name: "Curing Envelopes",
  stage: "Curing",
  process: "Chamber curing",
  form: "Flexible envelope",
  summary:
  "Flexible rubber envelopes that enclose the built tyre in the curing chamber, holding the tread under pressure during vulcanisation.",
  image: "/f5ff7a0d-ee7c-4b9d-80c7-b9d56d789cb9.jpg"
},
{
  id: "cbtr",
  code: "CBTR",
  name: "CBTR",
  stage: "Tread application",
  process: "Mould-cure retreading",
  form: "Uncured tread strip",
  summary:
  "Tread rubber for conventional mould-cure retreading, where the tread pattern is formed in the mould during curing.",
  image: "/9d5e6ecc-a5aa-450e-86c2-074f8a45ca1f.jpg"
}];