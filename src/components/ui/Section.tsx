import { cn } from '../../lib/utils';
export default function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn('py-12 bg-white', className)} id={id}>
      <div
        className={cn(
          'container mx-auto px-3 sm:px-4 md:px-6 lg:px-16 xl:px-20',
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
