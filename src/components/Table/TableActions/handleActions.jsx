export const searchBox = (searchTerm, setSearchTerm) => {
   function handleSearch(event) {
      setSearchTerm(event.target.value);
   }

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

export const removeExtraSpaces = (text) => {
   if (typeof text === 'string') {
      return text.replace(/\s+/g, ' ').trim();
   } else {
      return text;
   }
};

export const formDataObjectWithExtraSpacesRemoved = (formData) => {
   const formDataWithExtraSpacesRemoved = {};
   Object.entries(formData).forEach(([key, value]) => {
      formDataWithExtraSpacesRemoved[key] = removeExtraSpaces(value);
   });
   return formDataWithExtraSpacesRemoved;
};
