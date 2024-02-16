export const generateBoundary = () => {
  return `----${Math.random().toString(16).substr(2, 12)}`;
};
