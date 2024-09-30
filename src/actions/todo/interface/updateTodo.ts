import { BaseResponse } from "@/actions/baseAction";
import { ITodo } from "@/lib/types/entities/todo";

export interface IUpdateTodoResponse extends BaseResponse<ITodo> {}
