import { IUser } from "../interface/IUser";

export type ILearner = IUser & {
  readonly id?: number
  password: string
};
