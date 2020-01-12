export interface Activity {
  Name: string;
  Selected: boolean;
}

export interface userModel {
  id?: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Email: string;
  Activities: Activity[];
  Description?: string;
  FeaturedImage?: string;
  Hobbies: string;
  Mobile: string;
  Role: string[];
  UserUID?: string; 
  WeekdaysAttending?: boolean[];
  GardaVetting?: string;
  ContactFirstName?: string;
  ContactLastName?: string;
  ContactAge?: number;
  ContactEmailInput?: string;
  ContactMobile?: number;
}
