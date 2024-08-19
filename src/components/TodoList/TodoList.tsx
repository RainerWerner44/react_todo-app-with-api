import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInput } from '../TodoInput/TodoInput';
import { TempTodo } from '../TempTodo/TempTodo';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  handleDeleteTodoClick: (id: number) => void;
  isDeletedTodoHasLoader: boolean;
  setIsToggledRequestHasError: (state: boolean) => void;
  setIsErrorHidden: (state: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setRenameTodoTitle: (title: string) => void;
  isTodoRenaming: boolean;
  setIsTodoRenaming: (state: boolean) => void;
  renameTodoTitle: string;
  setIsRenameRequestHasError: (state: boolean) => void;
  setIsDeletedRequestHasError: (state: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  handleDeleteTodoClick,
  isDeletedTodoHasLoader,
  setIsToggledRequestHasError,
  setIsErrorHidden,
  setTodos,
  setRenameTodoTitle,
  isTodoRenaming,
  setIsTodoRenaming,
  renameTodoTitle,
  setIsRenameRequestHasError,
  setIsDeletedRequestHasError,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoInput
          todo={todo}
          key={todo.id}
          handleDeleteTodoClick={handleDeleteTodoClick}
          isDeletedTodoHasLoader={isDeletedTodoHasLoader}
          setIsToggledRequestHasError={setIsToggledRequestHasError}
          setIsErrorHidden={setIsErrorHidden}
          setTodos={setTodos}
          setRenameTodoTitle={setRenameTodoTitle}
          isTodoRenaming={isTodoRenaming}
          setIsTodoRenaming={setIsTodoRenaming}
          renameTodoTitle={renameTodoTitle}
          setIsRenameRequestHasError={setIsRenameRequestHasError}
          setIsDeletedRequestHasError={setIsDeletedRequestHasError}
        />
      ))}
      {tempTodo && <TempTodo tempTodo={tempTodo} />}
    </section>
  );
};
