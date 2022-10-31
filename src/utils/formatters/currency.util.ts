export const formatCurrency = (value: string | number): string => {
  if (typeof value === 'string') {
    value = value.replace(/\D+/g, '');
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value));
};
