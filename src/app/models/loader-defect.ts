export interface LoaderDefect {
  id: number;
  dateOfProblemIdentification: Date;
  dateOfProblemSolved: Date;
  durationOfDefectInMinutes: number;
  reasonOfDefect: string;
  loaderId: number;
}
