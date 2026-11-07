export type Product = {
  id: string;
  code: string;
  name: string;
  stage: string;
  process: string;
  form: string;
  summary: string;
  image: string;
};

export type ProcessStage = {
  id: string;
  title: string;
  caption: string;
  description: string;
  readout: string;
  image: string;
  alt: string;
};

export type NavSubItem = {
  label: string;
  code?: string;
  sectionId?: string;
  offsetVh?: number;
  productId?: string;
  href?: string;
};

export type NavLink = {
  label: string;
  id: string;
  offsetVh?: number;
  href?: string;
  children?: NavSubItem[];
};

export type LabeledValue = {
  label: string;
  value: string;
};

export type Annotation = {
  label: string;
  left: string;
  top: string;
};