import { BaseResponse } from "./baseAction";

export interface ITodo {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface ICreateTodoResponse extends BaseResponse<ITodo> {}
