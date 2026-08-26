import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Target number to count up to. */
  value: number;
  /** Text appended after the number (e.g. "+", "%"). */
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  /** Delay before starting in ms (used to stagger multiple counters). */
  delay?: number;
  /** Start counting when this becomes true (e.g. when the section is in view). */
  start?: boolean;
  className?: string;
}

// Decelerating ease — fast start, gentle settle onto the final value.
const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix = '',
  duration = 1800,
  delay = 0,
  start = true,
  className,
}) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    // Respect users who prefer reduced motion — show the final value at once.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let startTime: number | null = null;
    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(easeOutExpo(progress) * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    const timeoutId = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafRef.current);
    };
  }, [start, value, duration, delay]);

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
};
