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
      {Object.entries(FilterTypes).map(filterType => (
        <a
          href={filterType[0] === 'All' ? `#/` : `#/${filterType[0]}`}
          className={classNames('filter__link', {
            selected: selectedTodos === filterType[1],
          })}
          data-cy={`FilterLink${filterType[0]}`}
          onClick={() => {
            if (selectedTodos !== filterType[0]) {
              setSelectedTodos(filterType[1]);
            }
          }}
          key={filterType[0]}
        >
          {filterType[0]}
        </a>
      ))}
    </nav>
  );
};
