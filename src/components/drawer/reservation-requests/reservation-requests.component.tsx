import { BaseDrawer } from '../base-drawer/base-drawer.component';
import { useCallback, useEffect, useState } from 'react';
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
import { Query } from 'nestjs-prisma-querybuilder-interface';
import { useReservation } from '../../../contexts/reservation.context';
import { Reservation } from '../../../data/models/reservation.model';
import { RequestCardUser } from '../../ui/request-card-user/request-card-user.component';
import { EmptyData } from '../../ui/empty-data/empty-data.component';
import {
  NestError,
  NestSuccess
} from '../../../utils/formatters/format-nest.util';

interface ReservationRequestDrawerProps {
  open: boolean;
  setOpen: () => void;
  onSubmit?: () => void;
  eventId: string;
}

export const ReservationRequestDrawer: React.FC<
  ReservationRequestDrawerProps
> = ({ open, setOpen, onSubmit, eventId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const { getReservationsRequests, updateStatus } = useReservation();
  const { push } = useRouter();

  const handleUpdateReservation = async (
    reservationId: string,
    status: 'APPROVED' | 'REJECTED'
  ) => {
    try {
      setLoading(true);
      await updateStatus(reservationId, status);
      NestSuccess('Solicitação enviada com sucesso');
      setOpen();
      onSubmit && onSubmit();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      NestError(err);
    }
  };

  const handleClose = () => {
    setOpen();
    setReservations([]);
    setLoading(false);
  };

  const getData = useCallback(async () => {
    try {
      const data = await getReservationsRequests(eventId);
      setReservations(data);
    } catch (err) {
      NestError(err);
    }
  }, [eventId, getReservationsRequests]);

  useEffect(() => {
    if (open) {
      getData();
    }
  }, [open, getData]);

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
          <Typography>Gerencie as solicitações de reserva</Typography>

          {reservations.map(reservation => (
            <RequestCardUser
              key={reservation?.id}
              user={reservation?.user}
              onClick={status =>
                handleUpdateReservation(reservation?.id, status)
              }
            />
          ))}

          {!reservations?.length && (
            <EmptyData message="Nenhuma solicitação pendente" />
          )}
        </Box>
      }
    />
  );
};
