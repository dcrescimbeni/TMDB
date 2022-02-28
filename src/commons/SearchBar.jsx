import useInput from '../hooks/useInput';
import axios from 'axios';

const SearchBar = () => {
  const searchQuery = useInput('lets test this');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/api/media/search?query=${searchQuery.value}`)
      .then((res) => res.data)
      .then((movies) => console.log(movies));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" {...searchQuery} />
      </form>
    </div>
  );
};

export default SearchBar;
