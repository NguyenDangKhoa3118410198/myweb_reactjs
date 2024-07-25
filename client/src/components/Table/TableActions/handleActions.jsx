import PropTypes from 'prop-types';
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

export const filterData = (searchTerm, records) => {
   return records.filter((row) =>
      Object.values(row).some(
         (value) =>
            canConvertToString(value) &&
            value
               .toString()
               .toLowerCase()
               .includes(removeExtraSpaces(searchTerm.toLowerCase()))
      )
   );
};

const canConvertToString = (value) => {
   return typeof value === 'string' || typeof value === 'number';
};

filterData.propTypes = {
   searchTerm: PropTypes.string.isRequired,
   records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const isFormDataValid = (formData) => {
   if (
      Object.values(formData).every(
         (value) =>
            value !== null &&
            value !== undefined &&
            removeExtraSpaces(value) !== ''
      )
   ) {
      const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
      return newFormData;
   }

   return false;
};

export const capitalizeFirstLetter = (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

export const headerCsv = (data) => {
   let headers;
   if (data.length > 0) {
      headers = Object.keys(data[0]).map((header) => ({
         label: capitalizeFirstLetter(header),
         key: header,
      }));
   }
   return headers;
};
