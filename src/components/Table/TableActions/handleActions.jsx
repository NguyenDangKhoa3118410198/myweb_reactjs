export const searchBox = (searchTerm, handleSearch) => {
   return (
      <input
         className='searchBox'
         type='search'
         placeholder='Search...'
         value={searchTerm}
         onChange={handleSearch}
      />
   );
};
