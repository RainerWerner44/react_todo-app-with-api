import classNames from 'classnames';

type Props = {
  isErrorHidden: boolean;
  setIsErrorHidden: (state: boolean) => void;
  setIsTitleError: (state: boolean) => void;
  setIsRequestHasError: (state: boolean) => void;
  setIsTodosLoadedError: (state: boolean) => void;
  isTodosLoadedError: boolean;
  isTitleError: boolean;
  isRequestHasError: boolean;
  isDeletedRequestHasError: boolean;
  isToggledRequestHasError: boolean;
  isRenameRequestHasError: boolean;
};

export const ErrorNotification: React.FC<Props> = ({
  isErrorHidden,
  setIsErrorHidden,
  setIsTitleError,
  setIsRequestHasError,
  setIsTodosLoadedError,
  isTodosLoadedError,
  isTitleError,
  isRequestHasError,
  isDeletedRequestHasError,
  isToggledRequestHasError,
  isRenameRequestHasError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isErrorHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setIsErrorHidden(true);
          setIsTitleError(false);
          setIsRequestHasError(false);
          setIsTodosLoadedError(false);
        }}
      />
      {isTodosLoadedError && <p>Unable to load todos</p>}
      {isTitleError && 'Title should not be empty'}
      {isRequestHasError && <p>Unable to add a todo</p>}
      {isDeletedRequestHasError && 'Unable to delete a todo'}
      {(isToggledRequestHasError || isRenameRequestHasError) &&
        'Unable to update a todo'}
    </div>
  );
};
