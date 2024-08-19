import classNames from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  selectedTodos: FilterTypes;
  setSelectedTodos: (state: FilterTypes) => void;
};

export const Filter: React.FC<Props> = ({
  selectedTodos,
  setSelectedTodos,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: selectedTodos === FilterTypes.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => {
          if (selectedTodos !== FilterTypes.All) {
            setSelectedTodos(FilterTypes.All);
          }
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: selectedTodos === FilterTypes.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => {
          if (selectedTodos !== FilterTypes.Active) {
            setSelectedTodos(FilterTypes.Active);
          }
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: selectedTodos === FilterTypes.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => {
          if (selectedTodos !== FilterTypes.Completed) {
            setSelectedTodos(FilterTypes.Completed);
          }
        }}
      >
        Completed
      </a>
    </nav>
  );
};
