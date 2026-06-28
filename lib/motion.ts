export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const revealTransition = {
  duration: 0.8,
  ease: cinematicEase,
} as const;

export const scrollChapterEnd = (chapterCount: number) => `+=${Math.max(360, chapterCount * 86)}%`;
