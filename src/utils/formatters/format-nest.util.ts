import { toast } from 'react-toastify';

export const NestError = (err: any) => {
  if (typeof err?.response?.data?.message === 'string') {
    return toast.error(err?.response?.data?.message);
  }
  return (
    toast.error(err?.response?.data?.message[0]) ||
    toast.error('Ops! Algo deu errado, tente novamente mais tarde.')
  );
};

export const NestSuccess = (message?: string) => {
  return toast.success(message ? message : 'Operação realizada com sucesso');
};
