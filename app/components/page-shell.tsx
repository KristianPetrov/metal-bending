import { ArrowRight } from "lucide-react";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function PageShell({
  children,
  showMobileQuote = true,
}: {
  children: React.ReactNode;
  showMobileQuote?: boolean;
}) {
  return (
    <div className="site-frame">
      <SiteHeader />
      {children}
      <SiteFooter />
      {showMobileQuote && (
        <a className="mobile-quote-button" href="/#quote">
          Request a quote <ArrowRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
