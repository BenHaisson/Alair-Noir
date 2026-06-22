export const luxuryEase = [0.18, 1, 0.22, 1] as const;
export const sharpEase = [0.10, 0.92, 0.12, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase, delay: i * 0.12 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: luxuryEase, delay: i * 0.1 },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: luxuryEase, delay: i * 0.12 },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: luxuryEase, delay: i * 0.08 },
  }),
};
