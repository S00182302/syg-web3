export interface Activity {
    Name: string;
    Selected: boolean;
}

export interface userModel {
    Activities: Activity[];
    Age: number;
    Description: string;
    FeaturedImage: string;
    FirstName: string;
    Hobbies: string;
    LastName: string;
    Mobile: string;
    Role: string[];
    UserUID: string;
    WeekdaysAttending: boolean[];
}
