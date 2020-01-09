export interface Activity {
  Name: string;
  Selected: boolean;
}

export interface userModel {
  FirstName: string;
  LastName: string;
  Age: number;
  Activities: Activity[];
  Description: string;
  FeaturedImage: string;
  Hobbies: string;
  Mobile: string;
  Role: string[];
  UserUID?: string;
  WeekdaysAttending?: boolean[];
}
