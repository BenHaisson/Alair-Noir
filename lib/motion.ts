export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const revealTransition = {
  duration: 0.8,
  ease: cinematicEase,
} as const;

/** Section-level reveal — Apple-style blur-to-sharp resolve. */
export const sectionRevealVariants = {
  initial: { opacity: 0, y: 48, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
} as const;

export const sectionRevealTransition = {
  duration: 1.05,
  ease: cinematicEase,
} as const;

/** Large heading line reveal — slight blur to sharp, upward. */
export const textRevealVariants = {
  initial: { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
} as const;

export const textRevealStagger = 0.1;

/** Apple-style image reveal — clip-path inset + slow scale/opacity resolve. */
export const imageRevealVariants = {
  initial: { clipPath: 'inset(0 0 100% 0)', scale: 1.06, opacity: 0.72 },
  show: { clipPath: 'inset(0 0 0% 0)', scale: 1, opacity: 1 },
} as const;

export const imageRevealTransition = {
  duration: 1.4,
  ease: cinematicEase,
} as const;

/** Thin hairline that draws across on reveal. */
export const lineDrawVariants = {
  initial: { scaleX: 0 },
  show: { scaleX: 1 },
} as const;

export const scrollChapterEnd = (chapterCount: number) => `+=${Math.max(360, chapterCount * 86)}%`;
