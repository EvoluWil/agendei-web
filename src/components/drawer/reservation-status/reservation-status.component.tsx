import { Query } from 'nestjs-prisma-querybuilder-interface';
import { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { BaseDrawer } from '../base-drawer/base-drawer.component';
import { Reservation } from '../../../data/models/reservation.model';
import { useReservation } from '../../../contexts/reservation.context';
import { ReservationStatusCard } from '../../ui/reservation-status-card/reservation-status-card';

interface ReservationStatusDrawerProps {
  open: boolean;
  setOpen: () => void;
  onSubmit?: () => void;
  reservationId: string;
}

export const ReservationStatusDrawer: React.FC<
  ReservationStatusDrawerProps
> = ({ open, setOpen, reservationId }) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  const { getReservation, cancelReservation } = useReservation();
  const { push } = useRouter();

  const handleClose = () => {
    setOpen();
    setReservation(null);
    setLoading(false);
  };

  const getData = useCallback(async () => {
    try {
      const query: Query = {
        select: 'createdAt updatedAt status',
        populate: [{ path: 'event', select: 'name' }]
      };
      const data = await getReservation(reservationId, query);
      setReservation(data);
    } catch (err) {
      console.log(err);
    }
  }, [reservationId, getReservation]);

  const handleCancel = async () => {
    try {
      await cancelReservation(reservationId);
      handleClose();
      push('/events');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (open) {
      getData();
    }
  }, [open, getData]);

  return (
    <BaseDrawer
      open={open}
      setOpen={handleClose}
      width={25}
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
          <Typography mb={4}>Gerencie sua reserva</Typography>
          {!!reservation && (
            <ReservationStatusCard
              onClick={handleCancel}
              reservation={reservation}
            />
          )}
        </Box>
      }
    />
  );
};
