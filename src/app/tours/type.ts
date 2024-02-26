export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestBaby?: number;
}

export type SearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
