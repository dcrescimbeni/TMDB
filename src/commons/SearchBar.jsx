import useInput from '../hooks/useInput';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('lets test this');

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, searchQuery.value);
        }}
      >
        <input type="text" name="search" {...searchQuery} />
      </form>
    </div>
  );
};

export default SearchBar;
