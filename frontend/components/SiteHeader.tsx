import Link from "next/link";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Logo size={34} />
        <nav aria-label="Main" className="nav">
          <Link href="/how-it-works" className="nav-opt">
            How it works
          </Link>
          <Link href="/about" className="nav-opt">
            About Us
          </Link>
          <Link href="/sign-in" className="nav-signin">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn btn-primary">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}