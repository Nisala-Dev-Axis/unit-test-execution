export interface IDbWorkRecord {
  dateString: string;
  workHours: number;
  workerId: string;
}

export enum SprintState {
  ACTIVE = "active",
  FUTURE = "active",
  CLOSED = "closed",
}

export interface Sprint {
  id: number;
  name: string;
  self: string;
  state: SprintState;
}
