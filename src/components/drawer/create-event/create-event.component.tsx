import { BaseDrawer } from '../base-drawer/base-drawer.component';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { IEvent } from '../../../data/models/event.model';
import { TextField } from '../../ui/inputs/text-field/text-field.component';
import { Button } from '../../ui/button/button.component';
import { DatePicker } from '../../ui/inputs/date-picker/date-picker.component';
import { useEvent } from '../../../contexts/event.context';
import { useRouter } from 'next/router';

const CreateEventValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  startDate: yup
    .date()
    .typeError('Data invalida')
    .required('Data de inicio é obrigatória')
    .min(new Date(), 'Inicio não pode ser no passado')
    .nullable(),
  endDate: yup
    .date()
    .typeError('Data invalida')
    .required('Data de termino é obrigatória')
    .min(yup.ref('startDate'), 'Termino não pode ser antes do inicio')
    .nullable(),
  address: yup.string().required('Endereço é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
  value: yup.number().typeError('Valor invalido').default(0),
  limit: yup
    .number()
    .typeError('Limite de pessoas deve ser um número')
    .default(0)
});

interface CreateEventDrawerProps {
  open: boolean;
  setOpen: () => void;
  event?: IEvent;
  onSubmit?: () => void;
}

export const CreateEventDrawer: React.FC<CreateEventDrawerProps> = ({
  open,
  setOpen,
  event,
  onSubmit
}) => {
  const [loading, setLoading] = useState(false);

  const { createEvent, updateEvent } = useEvent();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CreateEventValidation)
  });

  const handleCreateEvent = async (data: FieldValues) => {
    try {
      setLoading(true);
      const { slug } = await createEvent(data);
      push(`/events/${slug}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleUpdateEvent = async (data: FieldValues) => {
    try {
      setLoading(true);
      await updateEvent(`${event?.id}`, data);
      onSubmit && onSubmit();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen();
    reset();
    setLoading(false);
  };

  useEffect(() => {
    if (open && event) {
      reset({
        name: event?.name,
        startDate: event?.startDate,
        endDate: event?.endDate,
        address: event?.address,
        limit: event?.limit,
        value: event?.value,
        description: event?.description
      });
    }
  }, [open, reset, event]);

  return (
    <BaseDrawer
      open={open}
      setOpen={handleClose}
      width={30}
      height="auto"
      content={
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          maxWidth={500}
          gap={2}
        >
          <Typography>Crie seu evento gratuitamente</Typography>
          <TextField
            label="Nome do evento"
            name="name"
            control={control}
            helperText={errors?.name?.message}
          />
          <DatePicker
            label="Data de inicio"
            name="startDate"
            minDateTime={new Date()}
            control={control}
            helperText={errors?.startDate?.message}
          />
          <DatePicker
            label="Data de termino"
            name="endDate"
            minDateTime={new Date()}
            control={control}
            helperText={errors?.startDate?.message}
          />
          <TextField
            label="Endereço"
            name="address"
            control={control}
            helperText={errors?.address?.message}
          />
          <TextField
            label="Valor"
            name="value"
            type="number"
            defaultValue={0}
            control={control}
            helperText={errors?.value?.message}
          />
          <TextField
            label="Limite de pessoas"
            name="limit"
            type="number"
            defaultValue={0}
            control={control}
            helperText={errors?.limit?.message}
          />
          <TextField
            label="Descrição"
            name="description"
            multiline
            minRows={3}
            maxRows={5}
            control={control}
            helperText={errors?.description?.message}
          />
          <Box width="100%">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(
                event ? handleUpdateEvent : handleCreateEvent
              )}
              type="submit"
              loading={loading}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      }
    />
  );
};
