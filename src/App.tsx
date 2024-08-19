/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID, deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTypes } from './types/FilterTypes';
import classNames from 'classnames';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
/* eslint-disable-next-line max-len */
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [isTodosLoadedError, setIsTodosLoadedError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isRequestHasError, setIsRequestHasError] = useState(false);
  const [isDeletedTodoHasLoader, setIsDeletedTodoHasLoader] = useState(false);
  const [isDeletedRequestHasError, setIsDeletedRequestHasError] =
    useState(false);
  const [isToggledRequestHasError, setIsToggledRequestHasError] =
    useState(false);
  const [isTodoRenaming, setIsTodoRenaming] = useState(false);
  const [renameTodoTitle, setRenameTodoTitle] = useState('empty');
  const [isRenameRequestHasError, setIsRenameRequestHasError] = useState(false);

  const areTodosExist = todos.length !== 0;
  const completedIds = todos
    .filter(todo => todo.completed)
    .map(todo => todo.id);

  let filteredTodos = [...todos];

  if (selectedTodos === FilterTypes.Active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (selectedTodos === FilterTypes.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;
  const isAnyCompletedTodos = notCompletedTodos === filteredTodos.length;
  const areAllTodosCompleted = notCompletedTodos === 0;
  const allNotCompletedTodos = todos.filter(todo => todo.completed === false);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        setIsErrorHidden(false);
        setIsTodosLoadedError(true);
        setTimeout(() => {
          setIsErrorHidden(true);
          setIsTodosLoadedError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isTitleError) {
      timeoutId = setTimeout(() => {
        setIsTitleError(false);
        setIsErrorHidden(true);
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isTitleError]);

  function handleDeleteTodoCLick(todoId: number) {
    setIsDeletedTodoHasLoader(true);
    deleteTodo(todoId)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.filter(currTodo => todoId !== currTodo.id),
        );
      })
      .catch(() => {
        setIsErrorHidden(false);
        setIsDeletedRequestHasError(true);
        setTimeout(() => {
          setIsErrorHidden(true);
          setIsDeletedRequestHasError(false);
        }, 3000);
      })
      .finally(() => setIsDeletedTodoHasLoader(false));
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div
      className={classNames('todoapp', {
        'has-error': isTitleError || isRequestHasError,
      })}
    >
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          areAllTodosCompleted={areAllTodosCompleted}
          setTodos={setTodos}
          allNotCompletedTodos={allNotCompletedTodos}
          setIsErrorHidden={setIsErrorHidden}
          setIsTitleError={setIsTitleError}
          setTempTodo={setTempTodo}
          setIsRequestHasError={setIsRequestHasError}
          isTitleError={isTitleError}
          isRequestHasError={isRequestHasError}
          isTodoRenaming={isTodoRenaming}
        />
        {areTodosExist && (
          <TodoList
            filteredTodos={filteredTodos}
            tempTodo={tempTodo}
            handleDeleteTodoClick={handleDeleteTodoCLick}
            isDeletedTodoHasLoader={isDeletedTodoHasLoader}
            setIsToggledRequestHasError={setIsToggledRequestHasError}
            setIsErrorHidden={setIsErrorHidden}
            setTodos={setTodos}
            isTodoRenaming={isTodoRenaming}
            setIsTodoRenaming={setIsTodoRenaming}
            setRenameTodoTitle={setRenameTodoTitle}
            renameTodoTitle={renameTodoTitle}
            setIsRenameRequestHasError={setIsRenameRequestHasError}
            setIsDeletedRequestHasError={setIsDeletedRequestHasError}
          />
        )}
        {areTodosExist && (
          <Footer
            notCompletedTodos={notCompletedTodos}
            setIsDeletedTodoHasLoader={setIsDeletedTodoHasLoader}
            completedIds={completedIds}
            setTodos={setTodos}
            setIsErrorHidden={setIsErrorHidden}
            setIsDeletedRequestHasError={setIsDeletedRequestHasError}
            isAnyCompletedTodos={isAnyCompletedTodos}
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
          />
        )}
      </div>

      <ErrorNotification
        isErrorHidden={isErrorHidden}
        setIsErrorHidden={setIsErrorHidden}
        setIsTitleError={setIsTitleError}
        setIsRequestHasError={setIsRequestHasError}
        setIsTodosLoadedError={setIsTodosLoadedError}
        isTodosLoadedError={isTodosLoadedError}
        isTitleError={isTitleError}
        isRequestHasError={isRequestHasError}
        isDeletedRequestHasError={isDeletedRequestHasError}
        isToggledRequestHasError={isToggledRequestHasError}
        isRenameRequestHasError={isRenameRequestHasError}
      />
    </div>
  );
};
