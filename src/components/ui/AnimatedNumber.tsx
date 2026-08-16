import { useEffect, useMemo, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  startFromPercent?: number;
  className?: string;
}

/**
 * Animates a numeric value from a starting percentage to its target when it scrolls into view.
 * Supports comma-separated integers (e.g. "139,420") and decimals (e.g. "200.00").
 * Non-numeric values (e.g. "1st Class") are rendered statically.
 */
export function AnimatedNumber({
  value,
  duration = 2000,
  startFromPercent = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const parsed = useMemo(() => {
    const match = value.match(/^[\d,]+(?:\.\d+)?$/);
    if (!match) return null;

    const raw = value.replace(/,/g, '');
    const target = parseFloat(raw);
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;

    return { target, decimals };
  }, [value]);

  const startValue = parsed ? parsed.target * (startFromPercent / 100) : 0;
  const [current, setCurrent] = useState(startValue);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  useEffect(() => {
    if (!started || !parsed) return;

    const { target } = parsed;
    const start = target * (startFromPercent / 100);
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(start + (target - start) * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, parsed, duration, startFromPercent]);

  if (!parsed) {
    return <div className={className}>{value}</div>;
  }

  const formatted = current.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return (
    <div ref={ref} className={className}>
      {formatted}
    </div>
  );
}
