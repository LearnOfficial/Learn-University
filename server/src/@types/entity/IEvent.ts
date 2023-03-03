export enum EventTypeEnum {
  "important" = 1,
  "normal" = 2,
  "irrelevant" = 3,
  "flexible" = 4
}


export type IEvent = {
  id?: number
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  type: EventTypeEnum
}

