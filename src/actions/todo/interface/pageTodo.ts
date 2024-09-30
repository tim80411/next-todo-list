import { BasePaginatedResponse } from "@/actions/baseAction";
import { ITodo } from "@/lib/types/entities/todo";

export interface IPageTodoResponse extends BasePaginatedResponse<ITodo> {}
