export const capitalize = (text: string): string => {
  if (!text?.length) {
    return '';
  }
  const textArray = text.split(' ');
  const formattedArray = textArray.map(
    item => item.charAt(0).toUpperCase() + item.slice(1)
  );
  return formattedArray.join(' ');
};
