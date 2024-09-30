import { ITodo } from "@/lib/types/entities/todo";
import { BaseResponse } from "../../baseAction";

export interface ICreateTodoResponse extends BaseResponse<ITodo> {}
