import Loader from 'components/Loader/Loader';
import css from './Button.module.css';

const Button = ({ onLoadMore, isLoading }) => {
  return (
    <button className={css.button} onClick={onLoadMore} disabled={isLoading}>
      {!isLoading ? 'Load more' : <Loader button />}
    </button>
  );
};

export default Button;
