import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function PageShell({
  children,
  showMobileQuote = true,
  showFooterCta = true,
}: {
  children: React.ReactNode;
  showMobileQuote?: boolean;
  showFooterCta?: boolean;
}) {
  return (
    <div className="site-frame">
      <SiteHeader />
      {children}
      <SiteFooter showCta={showFooterCta} />
      {showMobileQuote && (
        <Link className="mobile-quote-button" href="/#quote">
          Request a quote <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
