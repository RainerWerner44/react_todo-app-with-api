import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { addTodo, toggleTodo, USER_ID } from '../../api/todos';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todos: Todo[];
  areAllTodosCompleted: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  allNotCompletedTodos: Todo[];
  setIsErrorHidden: (state: boolean) => void;
  setIsTitleError: (state: boolean) => void;
  setTempTodo: (todo: Todo | null) => void;
  setIsRequestHasError: (state: boolean) => void;
  isTitleError: boolean;
  isRequestHasError: boolean;
  isTodoRenaming: boolean;
};

export const Header: React.FC<Props> = ({
  todos,
  areAllTodosCompleted,
  setTodos,
  allNotCompletedTodos,
  setIsErrorHidden,
  setIsTitleError,
  setTempTodo,
  setIsRequestHasError,
  isTitleError,
  isRequestHasError,
  isTodoRenaming,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos, isRequestHasError]);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (todoTitle.trim().length === 0) {
      setIsTitleError(true);
      setIsErrorHidden(false);

      return;
    }

    setIsTitleError(false);
    setIsErrorHidden(true);
    setIsInputDisabled(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: todoTitle,
      completed: false,
    });

    addTodo({ userId: USER_ID, title: todoTitle.trim(), completed: false })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setIsTitleError(false);
        setIsErrorHidden(true);
        setTodoTitle('');
      })
      .catch(() => {
        setIsRequestHasError(true);
        setIsErrorHidden(false);
        setTimeout(() => {
          setIsErrorHidden(true);
          setIsRequestHasError(false);
        }, 3000);
      })
      .finally(() => {
        setIsInputDisabled(false);
        setTempTodo(null);
      });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isTitleError) {
      timeoutId = setTimeout(() => {
        setIsTitleError(false);
        setIsErrorHidden(true);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isTitleError, setIsErrorHidden, setIsTitleError]);

  function handleToggleAllClick() {
    if (!areAllTodosCompleted) {
      Promise.allSettled(
        allNotCompletedTodos.map(todo =>
          toggleTodo({ completed: true }, todo.id),
        ),
      ).then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo => ({
            ...todo,
            completed: true,
          })),
        );
      });
    } else {
      Promise.allSettled(
        todos.map(todo => toggleTodo({ completed: false }, todo.id)),
      ).then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todo => ({
            ...todo,
            completed: false,
          })),
        );
      });
    }
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllClick}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          ref={inputRef}
          disabled={isInputDisabled || isTodoRenaming}
        />
      </form>
    </header>
  );
};
