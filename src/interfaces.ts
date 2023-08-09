export interface IAppProps {
  tasks: ITask[];
}

export interface ITask {
  name: string;
  completed: boolean;
  id: string;
}

export interface IAddTask {
  (name: string): void;
}

export interface IFormProps {
  addTask: IAddTask;
}

export interface IToggleTaskCompleted {
  (id: string): void;
}

export interface IDeleteTask {
  (id: string): void;
}

export interface IEditTask {
  (id: string, newName: string): void;
}

export interface ITodoProps extends ITask {
  toggleTaskCompleted: IToggleTaskCompleted;
  deleteTask: IDeleteTask;
  editTask: IEditTask;
}

export interface IFilterButtonProps {
  name: string;
  isPressesd: boolean;
  setFilter: (filter: string) => void;
}
