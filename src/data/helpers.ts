type TGeneratedId = () => string;

export const generatedId: TGeneratedId = () => {
    return Math.random().toString(16).slice(2) + new Date().getTime().toString(36);
};