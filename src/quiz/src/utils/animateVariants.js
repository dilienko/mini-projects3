export const navLinksVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

export const toggleVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 90 },
};

export const testVariants = {
    animate: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.3 },
    }),
    initial: { opacity: 0, y: -10 },
};
