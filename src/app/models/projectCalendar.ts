export interface ExtendendProps {
  specialNotes?: string;
  leadVolunteer: string;
}

export interface ProjectCalendar {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  extendendProps: ExtendendProps;
  allDay?: boolean;
}
