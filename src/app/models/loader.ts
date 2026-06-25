export interface Loader {
  id: number;
  brand: string;
  number: string;
  capacity: number;
  isActive: boolean;
  modifiedAt: Date;
  user: string;
}
