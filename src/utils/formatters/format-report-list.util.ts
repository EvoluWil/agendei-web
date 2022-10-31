import { ReportListData } from '../../components/ui/report-list/report-list.component';
import { Reservation } from '../../data/models/reservation.model';

export const formatReport = (array: Reservation[]) => {
  const list: ReportListData[] = [];
  array.forEach(reservation => {
    const alreadyReport = list.find(report => {
      return report.user.id === reservation.userId;
    });
    if (alreadyReport) {
      return alreadyReport.reservations.push(reservation);
    }
    return list.push({
      user: reservation.user,
      reservations: [reservation]
    });
  });
  return list.sort((a, b) => {
    if (a?.user?.name < b?.user?.name) {
      return -1;
    }
    if (a?.user?.name > b?.user?.name) {
      return 1;
    }
    return 0;
  });
};
