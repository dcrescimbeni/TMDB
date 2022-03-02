import useInput from '../hooks/useInput';

const SearchBar = ({ handleSubmit }) => {
  const searchQuery = useInput('');

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event, searchQuery.value);
        }}
      >
        <input
          type="text"
          name="search"
          {...searchQuery}
          placeholder="Search..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
