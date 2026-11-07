import React, { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon, LoaderIcon } from "lucide-react";
import { products } from "../../data/products";
import { contactDetails } from "../../data/company";
import { FormField, fieldClass } from "./FormField";
import { MagneticButton } from "../ui/MagneticButton";

type Status = "idle" | "submitting" | "success";
type Fields = {name: string;company: string;email: string;phone: string;message: string;};
type Errors = Partial<Record<keyof Fields, string>>;

type EnquiryFormProps = {
  product: string;
  onProductChange: (value: string) => void;
  className?: string;
};

const EMPTY: Fields = { name: "", company: "", email: "", phone: "", message: "" };
const EASE = [0.23, 1, 0.32, 1] as const;

export const EnquiryForm = forwardRef<HTMLInputElement, EnquiryFormProps>(function EnquiryForm(
{ product, onProductChange, className = "" },
ref)
{
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Please tell us your name.";
    if (!fields.email.trim() && !fields.phone.trim()) next.email = "Add an email or a phone number so we can reply.";
    if (fields.email.trim() && !/^\S+@\S+\.\S+$/.test(fields.email.trim())) next.email = "That email doesn't look right.";
    if (fields.message.trim().length < 10) next.message = "A line or two about your requirement helps us respond faster.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("submitting");
    window.setTimeout(() => {
      setSentName(fields.name.trim().split(" ")[0]);
      setStatus("success");
      setFields(EMPTY);
    }, 1100);
  };

  return (
    <div id="enquiry-form" className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ?
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="border-t border-charcoal pt-10">
          
            <span className="flex h-10 w-10 items-center justify-center bg-signal text-ink">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-bone">Thank you, {sentName}.</p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-silver">
              Your enquiry is with our sales team. Expect a reply from {contactDetails.email}.
            </p>
            <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 border-b border-silver/40 pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-bone transition-colors duration-150 hover:border-signal">
            
              Send another enquiry
            </button>
          </motion.div> :

        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
          aria-label="Enquiry form">
          
            <FormField id="enq-name" label="Name" error={errors.name}>
              <input
              ref={ref}
              id="enq-name"
              autoComplete="name"
              value={fields.name}
              onChange={update("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "enq-name-error" : undefined}
              placeholder="Your full name"
              className={fieldClass(!!errors.name)} />
            
            </FormField>
            <FormField id="enq-company" label="Company" optional>
              <input
              id="enq-company"
              autoComplete="organization"
              value={fields.company}
              onChange={update("company")}
              placeholder="Fleet, retreader or distributor"
              className={fieldClass(false)} />
            
            </FormField>
            <FormField id="enq-email" label="Email" error={errors.email}>
              <input
              id="enq-email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={update("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "enq-email-error" : undefined}
              placeholder="name@company.com"
              className={fieldClass(!!errors.email)} />
            
            </FormField>
            <FormField id="enq-phone" label="Phone" optional>
              <input
              id="enq-phone"
              type="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={update("phone")}
              placeholder="+91"
              className={fieldClass(false)} />
            
            </FormField>
            <div className="sm:col-span-2">
              <FormField id="enq-product" label="Product of interest">
                <select
                id="enq-product"
                value={product}
                onChange={(e) => onProductChange(e.target.value)}
                className={`${fieldClass(false)} cursor-pointer [&>option]:bg-graphite`}>
                
                  <option value="">General enquiry</option>
                  {products.map((p) =>
                <option key={p.id} value={p.name}>
                      {p.name}
                      {p.code !== p.name ? ` (${p.code})` : ""}
                    </option>
                )}
                </select>
              </FormField>
            </div>
            <div className="sm:col-span-2">
              <FormField id="enq-message" label="Requirement" error={errors.message}>
                <textarea
                id="enq-message"
                rows={3}
                value={fields.message}
                onChange={update("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "enq-message-error" : undefined}
                placeholder="Volumes, tyre sizes, delivery location…"
                className={`${fieldClass(!!errors.message)} resize-none`} />
              
              </FormField>
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
              <MagneticButton type="submit" disabled={status === "submitting"}>
                {status === "submitting" ?
              <>
                    Sending
                    <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
                  </> :

              <>
                    Send enquiry
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </>
              }
              </MagneticButton>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-silver/70">Replies within business hours, IST</span>
            </div>
          </motion.form>
        }
      </AnimatePresence>
    </div>);

});