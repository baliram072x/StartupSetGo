interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ badge, title, subtitle, center = true }: SectionHeadingProps) => (
  <div className={`mb-12 ${center ? "text-center" : ""}`}>
    {badge && (
      <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
