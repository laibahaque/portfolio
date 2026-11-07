import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "on-dark";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  "on-dark": "btn btn-on-dark",
};

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(variantClass[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ...props
}: SharedProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  }) {
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer noopener" as const }
    : {};

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cn(variantClass[variant], className)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(variantClass[variant], className)} {...externalProps} {...props}>
      {children}
    </a>
  );
}
