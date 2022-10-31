import {
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ListItemText,
  Typography,
  ListItemAvatar,
  Collapse,
  Box,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody
} from '@mui/material';
import { add, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import {
  Reservation,
  ReservationStatusLabel
} from '../../../data/models/reservation.model';
import { User } from '../../../data/models/user.model';

export interface ReportListData {
  user: User;
  reservations: Reservation[];
}

export interface ReportListProps {
  users: User[];
}

export const ReportList: React.FC<ReportListProps> = ({ users }) => {
  const [open, setOpen] = useState<string[]>([]);

  const handleOpenItem = (userId: string) => {
    setOpen(prev =>
      prev.includes(userId)
        ? [...prev.filter(item => item !== userId)]
        : [...prev, userId]
    );
  };

  return (
    <List>
      {users?.map(user => (
        <Box key={user.id}>
          <ListItem
            disablePadding
            divider
            sx={
              open.includes(user.id)
                ? {
                    textAlign: 'center',
                    borderRadius: '20px',
                    background: '#fafafa',
                    border: '1px solid #ddd',
                    my: 0.5
                  }
                : {}
            }
          >
            <ListItemButton
              sx={{ borderRadius: '20px' }}
              onClick={() => handleOpenItem(user.id)}
            >
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.picture} sx={{ mx: 'auto' }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} sx={{ textAlign: 'start' }} />
              <ListItemText sx={{ textAlign: 'end' }}>
                <Typography color="primary.main">
                  <strong>Total de eventos: </strong>
                  {user?.ownerEvents?.length}
                </Typography>
                <Typography color="primary.main">
                  <strong>Total de reservas: </strong>
                  {user?.reservations?.length}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Collapse in={open.includes(user.id)} timeout="auto" unmountOnExit>
            <Box
              pb={2}
              px={4}
              mt={-3}
              pt={5}
              sx={{
                border: '1px solid #ddd',
                borderTop: 0,
                borderBottomRightRadius: '20px',
                borderBottomLeftRadius: '20px'
              }}
            >
              {!!user.reservations?.length && (
                <Box
                  borderRadius="12px"
                  p={2}
                  border="1px solid #ddd"
                  sx={{ background: '#fafafa' }}
                >
                  <Typography>Reservas</Typography>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Evento</TableCell>
                        <TableCell align="left">Inicio</TableCell>
                        <TableCell align="left">Fim</TableCell>
                        <TableCell align="left">Valor</TableCell>
                        <TableCell align="left">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user.reservations?.map(reservation => (
                        <TableRow
                          key={reservation.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell align="left">
                            {reservation.event.name}
                          </TableCell>
                          <TableCell align="left">
                            <Box>
                              {format(
                                new Date(reservation.event.startDate),
                                'Pp',
                                {
                                  locale: ptBR
                                }
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {format(new Date(reservation.event.endDate), 'Pp', {
                              locale: ptBR
                            })}
                          </TableCell>
                          <TableCell align="left">
                            {reservation.event.value}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              color:
                                ReservationStatusLabel[reservation.status].color
                            }}
                          >
                            {ReservationStatusLabel[reservation.status].label}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
              {!!user.ownerEvents?.length && (
                <Box
                  borderRadius="12px"
                  p={2}
                  my={2}
                  border="1px solid #ddd"
                  sx={{ background: '#fafafa' }}
                >
                  <Typography>Eventos</Typography>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Inicio</TableCell>
                        <TableCell align="left">Fim</TableCell>
                        <TableCell align="left">Valor</TableCell>
                        <TableCell align="left">Limite</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user.ownerEvents?.map(event => (
                        <TableRow
                          key={event.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell align="left">{event.name}</TableCell>
                          <TableCell align="left">
                            <Box>
                              {format(new Date(event.startDate), 'Pp', {
                                locale: ptBR
                              })}
                            </Box>
                          </TableCell>
                          <TableCell align="left">
                            {format(new Date(event.endDate), 'Pp', {
                              locale: ptBR
                            })}
                          </TableCell>
                          <TableCell align="left">{event.value}</TableCell>
                          <TableCell align="left">
                            {event?.limit
                              ? `${
                                  event?.reservations.filter(
                                    reservation =>
                                      reservation.status === 'APPROVED'
                                  ).length
                                }/${event?.limit} - Pessoas`
                              : 'Sem limite de pessoas'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      ))}
    </List>
  );
};
