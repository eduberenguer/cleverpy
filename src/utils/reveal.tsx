import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
  opacity?: number;
  y?: number;
  x?: number;
  blur?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
};

export default function Reveal({
  children,
  opacity = 0,
  y = 0,
  x = 0,
  blur = 0,
  duration = 0.5,
  delay = 0.5,
  rotate = 0,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
      variants={{
        hidden: { filter: `blur(${blur}px)`, opacity, y, x, rotate },
        visible: { filter: 'blur(0)', opacity: 1, y: 0, x: 0, rotate: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
