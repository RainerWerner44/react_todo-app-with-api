import { FilterTypes } from '../../types/FilterTypes';
import { deleteTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  notCompletedTodos: number;
  setIsDeletedTodoHasLoader: (state: boolean) => void;
  completedIds: number[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsErrorHidden: (state: boolean) => void;
  setIsDeletedRequestHasError: (state: boolean) => void;
  isAnyCompletedTodos: boolean;
  selectedTodos: FilterTypes;
  setSelectedTodos: (state: FilterTypes) => void;
};

export const Footer: React.FC<Props> = ({
  notCompletedTodos,
  setIsDeletedTodoHasLoader,
  completedIds,
  setTodos,
  setIsErrorHidden,
  setIsDeletedRequestHasError,
  isAnyCompletedTodos,
  selectedTodos,
  setSelectedTodos,
}) => {
  function handleDeleteCompletedTodos() {
    setIsDeletedTodoHasLoader(true);

    Promise.allSettled(completedIds.map(id => deleteTodo(id)))
      .then(results => {
        const successfulIds = results
          .map((result, index) =>
            result.status === 'fulfilled' ? completedIds[index] : null,
          )
          .filter(id => id !== null);

        setTodos(currTodos =>
          currTodos.filter(todo => !successfulIds.includes(todo.id)),
        );

        if (results.some(result => result.status === 'rejected')) {
          setIsErrorHidden(false);
          setIsDeletedRequestHasError(true);
          setTimeout(() => {
            setIsErrorHidden(true);
            setIsDeletedRequestHasError(false);
          }, 3000);
        }
      })
      .finally(() => {
        setIsDeletedTodoHasLoader(false);
      });
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos} items left
      </span>

      <Filter
        selectedTodos={selectedTodos}
        setSelectedTodos={setSelectedTodos}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteCompletedTodos}
        disabled={isAnyCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
