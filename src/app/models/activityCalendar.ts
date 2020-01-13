export interface ActivityCalendar {
  id?: string;
  start: Date;
  VolunteerUIDs: string[];
  MemberUIDs: string[];
  title?: string;
  end: Date;
}
