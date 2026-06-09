import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  User,
  UserPlus,
  LogIn,
  UserCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.png";

const servicesLinks = [
  { to: "/services", label: "All Services", desc: "Overview of every program we offer" },
  { to: "/services/athletic-recruitment", label: "Athletic Recruitment", desc: "D1, D2, D3 placement for student-athletes" },
  { to: "/services/bs-md-programs", label: "BS/MD Programs", desc: "Direct medical school admissions" },
  { to: "/services/graduate-admissions", label: "Graduate Admissions", desc: "MBA, law, PhD applications" },
  { to: "/services/transfer-admissions", label: "Transfer Admissions", desc: "University transfer support" },
] as const;

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/providers", label: "Find a Tutor" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = useAuth();
  const isProvider = auth.accountType === "provider";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "bg-background/0",
      )}
    >
      <div className="mx-auto flex h-24 lg:h-28 max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="4Schoolers logo" className="h-16 lg:h-20 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/75 hover:text-primary data-[state=open]:text-primary px-0 h-auto">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-3">
                    {servicesLinks.map((s) => (
                      <li key={s.to}>
                        <Link
                          to={s.to}
                          className="block rounded-md px-3 py-2.5 transition-colors hover:bg-secondary"
                        >
                          <div className="text-sm font-semibold text-primary">{s.label}</div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Account
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {auth.isAuthenticated ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="text-xs text-muted-foreground">Signed in as</div>
                    <div className="truncate text-sm font-medium text-primary">
                      {auth.user?.email}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isProvider ? (
                    <DropdownMenuItem asChild>
                      <Link to="/provider" className="cursor-pointer">
                        <Briefcase className="h-4 w-4" />
                        Provider Portal
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/profile" className="cursor-pointer">
                          <UserCircle className="h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => auth.signOut()}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer">
                      <LogIn className="h-4 w-4" />
                      Sign in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/signup"
                      className="cursor-pointer font-medium text-[var(--gold)] focus:text-[var(--gold)]"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-md text-primary lg:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4" aria-label="Mobile">
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
              aria-expanded={servicesOpen}
            >
              <span>Services</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-border pl-3">
                {servicesLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary hover:text-primary"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                activeProps={{ className: "text-primary bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              className="mt-2 flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
              aria-expanded={accountOpen}
            >
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", accountOpen && "rotate-180")} />
            </button>
            {accountOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-border pl-3">
                {auth.isAuthenticated ? (
                  <>
                    {auth.user?.email && (
                      <div className="px-3 pt-1 pb-2">
                        <div className="text-xs text-muted-foreground">Signed in as</div>
                        <div className="truncate text-sm font-medium text-primary">
                          {auth.user.email}
                        </div>
                      </div>
                    )}
                    {isProvider ? (
                      <Link
                        to="/provider"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                      >
                        <Briefcase className="h-4 w-4" /> Provider Portal
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                        >
                          <UserCircle className="h-4 w-4" /> Profile
                        </Link>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        auth.signOut();
                        setOpen(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-secondary"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                    >
                      <LogIn className="h-4 w-4" /> Sign in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[var(--gold)] hover:bg-secondary"
                    >
                      <UserPlus className="h-4 w-4" /> Sign up
                    </Link>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
