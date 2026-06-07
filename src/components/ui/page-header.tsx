import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b bg-hero-gradient section-padding",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
      <div className="container-wide relative">
        <MotionWrapper className="mx-auto max-w-3xl text-center">
          {badge && (
            <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {badge}
            </span>
          )}
          <h1 className="heading-lg text-balance">{title}</h1>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground text-balance sm:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </MotionWrapper>
      </div>
    </section>
  );
}
