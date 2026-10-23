export type NavItem = {
  href: string;
  label: string;
};

/** Primary header links (KWENTALOAN.md §5). */
export const mainNav: NavItem[] = [
  { href: "/home-loan-calculator", label: "Home Loan Calculator" },
  { href: "/about", label: "About" },
];

/** Footer links (KWENTALOAN.md §5). */
export const footerNav: NavItem[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Disclaimer" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
