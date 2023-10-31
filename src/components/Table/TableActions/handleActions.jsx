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
