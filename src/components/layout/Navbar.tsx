import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  FileTextIcon,
  MailIcon,
  MenuIcon,
  ShieldCheckIcon,
  XIcon
} from "lucide-react";
import type { NavLink, NavSubItem } from "../../types/content";
import { Logo } from "../ui/Logo";
import { brochures, contactDetails, navLinks, socialLinks } from "../../data/company";
import { scrollToId, setScrollLocked } from "../../utils/smoothScroll";

const EASE = [0.23, 1, 0.32, 1] as const;

type NavbarProps = {
  onSelectProduct?: (productId: string) => void;
};

export function Navbar({ onSelectProduct }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const desktopLinks = navLinks.filter((l) => l.id !== "enquiry-form");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > last && y > 280);
      if (y > last && y > 280) setOpenDropdown(null);
      last = y;
      const probe = window.innerHeight * 0.4;
      let current = "home";
      navLinks.forEach((link) => {
        if (link.href) return;
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= probe) current = link.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const clearTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = (id: string) => {
    clearTimer();
    setOpenDropdown(id);
  };

  const handleLeave = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 140);
  };

  const go = (id: string, offsetVh?: number) => {
    const wasOpen = open;
    setOpen(false);
    setOpenDropdown(null);
    window.setTimeout(() => scrollToId(id, offsetVh), wasOpen ? 60 : 0);
  };

  const handleLinkAction = (link: NavLink) => {
    if (link.href && !link.children) {
      window.open(link.href, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    if (link.href && link.children) {
      const target = document.getElementById(link.id);
      if (target) {
        go(link.id, link.offsetVh);
      } else {
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
      return;
    }
    go(link.id, link.offsetVh);
  };

  const handleSubAction = (item: NavSubItem) => {
    const wasOpen = open;
    setOpen(false);
    setOpenDropdown(null);
    if (item.productId && onSelectProduct) {
      window.setTimeout(() => onSelectProduct(item.productId!), wasOpen ? 60 : 0);
      return;
    }
    if (item.sectionId) {
      window.setTimeout(() => scrollToId(item.sectionId!, item.offsetVh), wasOpen ? 60 : 0);
      return;
    }
    if (item.href) {
      if (item.href.startsWith("mailto:") || item.href.startsWith("tel:")) {
        window.location.href = item.href;
      } else {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: EASE }}>
        
        {/* Ultra-Slim Editorial Micro-Bar (collapses smoothly on scroll) */}
        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="hidden overflow-hidden border-b border-white/[0.08] bg-ink/80 backdrop-blur-md xl:block">
              
              <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between gap-4 whitespace-nowrap px-6 text-[11.5px] 2xl:px-10">
                {/* Left: Certification + Sales Email */}
                <div className="flex items-center gap-4 text-silver/80 2xl:gap-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                    <span>
                      <strong className="font-medium text-bone">ISO 9001:2015</strong> Certified
                    </span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-silver/75">REACH Compliant</span>
                  </div>

                  <span aria-hidden="true" className="h-3 w-px bg-white/15" />

                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="group flex items-center gap-2 transition-colors duration-150 hover:text-bone">
                    
                    <MailIcon className="h-3.5 w-3.5 text-signal/90" aria-hidden="true" />
                    <span className="text-silver/65">Sales Enquiries:</span>
                    <span className="font-medium text-bone transition-colors duration-150 group-hover:text-signal">
                      {contactDetails.email}
                    </span>
                  </a>
                </div>

                {/* Right: Inline Brochure Links + Clean Social Icons */}
                <div className="flex items-center gap-5">
                  <ul className="flex items-center gap-4">
                    {brochures.map((b, idx) => (
                      <li key={b.label} className="flex items-center gap-4">
                        {idx > 0 && <span aria-hidden="true" className="h-2.5 w-px bg-white/15" />}
                        <a
                          href={b.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-1.5 text-silver/80 transition-colors duration-150 hover:text-bone">
                          
                          <FileTextIcon className="h-3 w-3 text-silver/50 transition-colors duration-150 group-hover:text-signal" aria-hidden="true" />
                          <span>{b.label}</span>
                          {b.isNew && (
                            <span className="rounded-full bg-signal/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.08em] text-signal ring-1 ring-inset ring-signal/40">
                              New
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <span aria-hidden="true" className="h-3 w-px bg-white/15" />

                  <ul className="flex items-center gap-3" aria-label="Social media">
                    {socialLinks.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="block text-silver/60 transition-colors duration-150 hover:text-signal">
                          
                          <SocialIcon kind={s.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleek Architectural Main Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "border-b border-white/10 bg-ink/92 shadow-[0_10px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-b border-white/[0.08] bg-gradient-to-b from-ink/80 to-ink/50 backdrop-blur-md"
          }`}>
          
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 md:h-[74px] xl:px-6 2xl:gap-6 2xl:px-10">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => go("home")}
              aria-label="Vamshi Rubber Limited — back to top"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal">
              
              <Logo className="h-9 sm:h-10 xl:h-11 2xl:h-[52px]" />
            </button>

            {/* Center Navigation Links */}
            <nav aria-label="Primary" className="hidden h-full xl:flex xl:items-center">
              <ul className="flex h-full items-center gap-0.5 2xl:gap-2">
                {desktopLinks.map((link) => {
                  const isActive = active === link.id;
                  const hasChildren = Boolean(link.children?.length);
                  const isOpen = openDropdown === link.id;
                  const isProductsMenu = link.id === "products";

                  return (
                    <li
                      key={link.label}
                      className="relative flex h-full items-center"
                      onMouseEnter={() => hasChildren && handleEnter(link.id)}
                      onMouseLeave={() => hasChildren && handleLeave()}>
                      
                      <button
                        type="button"
                        onClick={() => handleLinkAction(link)}
                        aria-expanded={hasChildren ? isOpen : undefined}
                        aria-current={isActive ? "location" : undefined}
                        className={`group relative flex h-full items-center gap-1 whitespace-nowrap px-2.5 text-[12.5px] font-medium tracking-[0.01em] transition-colors duration-150 focus-visible:outline-none 2xl:px-3.5 2xl:text-[13.5px] ${
                          isActive || isOpen ? "text-bone" : "text-silver/80 hover:text-bone"
                        }`}>
                        
                        <span>{link.label}</span>
                        {hasChildren && (
                          <ChevronDownIcon
                            className={`h-3.5 w-3.5 text-silver/55 transition-transform duration-200 group-hover:text-bone ${
                              isOpen ? "rotate-180 !text-signal" : ""
                            }`}
                            aria-hidden="true"
                          />
                        )}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-3 bottom-0 h-[2px] bg-signal"
                            transition={{ duration: 0.24, ease: EASE }}
                          />
                        )}
                      </button>

                      {/* Architectural Glass Dropdown / Mega-Menu */}
                      <AnimatePresence>
                        {hasChildren && isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.18, ease: EASE }}
                            className={`absolute top-full z-50 border border-white/10 border-t-2 border-t-signal bg-ink/96 shadow-[0_24px_64px_rgba(0,0,0,0.7)] backdrop-blur-2xl ${
                              isProductsMenu
                                ? "left-1/2 w-[500px] -translate-x-1/2 p-3"
                                : link.id === "contact"
                                  ? "right-0 min-w-[240px] py-2"
                                  : "left-0 min-w-[230px] py-2"
                            }`}>
                            
                            {isProductsMenu && (
                              <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] px-3 pb-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-silver/65">
                                  8 Retreading Material Families
                                </span>
                                <button
                                  type="button"
                                  onClick={() => go("products")}
                                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal hover:underline">
                                  
                                  View All
                                  <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
                                </button>
                              </div>
                            )}

                            <ul className={isProductsMenu ? "grid grid-cols-2 gap-1" : "flex flex-col"}>
                              {link.children!.map((sub) => (
                                <li key={sub.label}>
                                  <button
                                    type="button"
                                    onClick={() => handleSubAction(sub)}
                                    className={`group flex w-full items-center justify-between gap-3 text-left transition-colors duration-150 hover:bg-white/[0.06] ${
                                      isProductsMenu ? "px-3 py-2.5" : "px-4 py-2.5"
                                    }`}>
                                    
                                    <span className="text-[13px] font-medium text-silver/90 transition-colors duration-150 group-hover:text-bone">
                                      {sub.label}
                                    </span>
                                    {sub.code ? (
                                      <span className="shrink-0 border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.12em] text-silver/65 transition-colors duration-150 group-hover:border-signal/50 group-hover:text-signal">
                                        {sub.code}
                                      </span>
                                    ) : (
                                      <ArrowUpRightIcon
                                        className="h-3.5 w-3.5 shrink-0 text-silver/35 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Signature Enquiry CTA + Mobile Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go("enquiry-form", -0.15)}
                className="group hidden items-center gap-2 bg-signal px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-150 hover:bg-bone sm:inline-flex">
                
                <span>Enquiry</span>
                <ArrowUpRightIcon
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-bone transition-colors hover:border-signal xl:hidden">
                
                {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-ink px-5 pb-10 pt-24 md:px-10 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}>
            
            <nav aria-label="Mobile">
              <ul className="border-t border-white/10">
                {navLinks.map((link, i) => {
                  const hasChildren = Boolean(link.children?.length);
                  const expanded = mobileExpanded === link.id;
                  return (
                    <motion.li
                      key={link.label}
                      className="border-b border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.025 * i, ease: EASE }}>
                      
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleLinkAction(link)}
                          className={`flex flex-1 items-center justify-between py-3.5 text-left font-display text-[1.5rem] font-semibold tracking-[-0.02em] sm:text-[1.85rem] ${
                            active === link.id ? "text-bone" : "text-silver/70"
                          }`}>
                          
                          <span>{link.label}</span>
                          {!hasChildren && <ArrowUpRightIcon className="h-5 w-5 text-signal" aria-hidden="true" />}
                        </button>
                        {hasChildren && (
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-label={`Toggle ${link.label} submenu`}
                            onClick={() => setMobileExpanded(expanded ? null : link.id)}
                            className="ml-2 flex h-10 w-10 items-center justify-center border border-white/15 text-silver">
                            
                            <ChevronDownIcon
                              className={`h-4 w-4 transition-transform duration-150 ${
                                expanded ? "rotate-180 text-signal" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasChildren && expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="overflow-hidden border-t border-white/10 bg-white/[0.03] px-4 py-2">
                            
                            {link.children!.map((sub) => (
                              <li key={sub.label}>
                                <button
                                  type="button"
                                  onClick={() => handleSubAction(sub)}
                                  className="flex w-full items-center justify-between py-2.5 text-left text-[13.5px] text-silver hover:text-bone">
                                  
                                  <span>{sub.label}</span>
                                  {sub.code && <span className="font-mono text-[11px] text-signal">{sub.code}</span>}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-[12.5px] text-silver">
                <ShieldCheckIcon className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                <span>
                  <strong className="text-bone">ISO 9001:2015 Certified</strong> · REACH Compliant
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {brochures.map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] text-bone">
                    
                    <FileTextIcon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                    <span>{b.label}</span>
                    {b.isNew && (
                      <span className="rounded-full bg-signal/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase text-signal">
                        New
                      </span>
                    )}
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-silver">
                <div>
                  <a href={`mailto:${contactDetails.email}`} className="block font-medium text-bone hover:text-signal">
                    {contactDetails.email}
                  </a>
                  <a href={contactDetails.phoneHref} className="mt-0.5 block text-silver/80 hover:text-bone">
                    {contactDetails.phoneDisplay}
                  </a>
                </div>
                <ul className="flex items-center gap-4" aria-label="Social media">
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="block text-silver/70 hover:text-signal">
                        
                        <SocialIcon kind={s.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SocialIcon({ kind }: { kind: "facebook" | "twitter" | "linkedin" | "youtube" }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2z" />
      </svg>
    );
  }
  if (kind === "twitter") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M18.2 3h2.9l-6.4 7.3L22.2 21h-5.9l-4.6-6-5.3 6H3.5l6.8-7.8L3.1 3h6l4.2 5.5L18.2 3zm-1 16.2h1.6L8.3 4.7H6.6l10.6 14.5z" />
      </svg>
    );
  }
  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M6.9 8.5H3.8V20h3.1V8.5zM5.3 3.6a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM20.2 13.4c0-3.1-1.7-4.6-3.9-4.6-1.8 0-2.6 1-3.1 1.7V8.5h-3.1V20h3.1v-6.1c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.2V20h3v-6.6z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
      <path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 00-1.9 1.9C2 8.9 2 12 2 12s0 3.1.4 4.8a2.7 2.7 0 001.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 001.9-1.9c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM10 15.2V8.8l5.5 3.2-5.5 3.2z" />
    </svg>
  );
}