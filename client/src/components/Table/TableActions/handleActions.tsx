import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import useDebounce from 'hooks/useDebounce';
import { useEffect, useState } from 'react';

interface FormData {
   [key: string]: string | number | null | undefined;
}

interface Record {
   [key: string]: string | number | null | undefined;
}

interface SearchBoxProps {
   searchTerm: string;
   setSearchTerm: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
   searchTerm,
   setSearchTerm,
}) => {
   const [inputValue, setInputValue] = useState(searchTerm);
   const debouncedValue = useDebounce(inputValue, 300);

   useEffect(() => {
      setSearchTerm(debouncedValue);
   }, [debouncedValue, setSearchTerm]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
   };

   return (
      <Input
         placeholder='Search'
         prefix={<SearchOutlined />}
         variant='filled'
         className='custom-search-input'
         value={inputValue}
         onChange={handleChange}
      />
   );
};

export const removeExtraSpaces = (text: string): string => {
   if (typeof text === 'string') {
      return text.replace(/\s+/g, ' ').trim();
   } else {
      return text;
   }
};

export const formDataObjectWithExtraSpacesRemoved = (
   formData: FormData
): FormData => {
   const formDataWithExtraSpacesRemoved: FormData = {};
   Object.entries(formData).forEach(([key, value]) => {
      formDataWithExtraSpacesRemoved[key] = removeExtraSpaces(value as string);
   });
   return formDataWithExtraSpacesRemoved;
};

export const filterData = (searchTerm: string, records: Record[]): Record[] => {
   return records.filter((row: any) =>
      Object.values(row).some(
         (value: any) =>
            canConvertToString(value) &&
            value
               .toString()
               .toLowerCase()
               .includes(removeExtraSpaces(searchTerm.toLowerCase()))
      )
   );
};

const canConvertToString = (value: any): boolean => {
   return typeof value === 'string' || typeof value === 'number';
};

export const isFormDataValid = (formData: any) => {
   if (
      Object.values(formData).every(
         (value) =>
            value !== null &&
            value !== undefined &&
            removeExtraSpaces(value as string) !== ''
      )
   ) {
      const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
      return newFormData;
   }

   return false;
};

export const capitalizeFirstLetter = (string: string): string => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

export const headerCsv = (
   data: Record[]
): { label: string; key: string }[] | undefined => {
   let headers;
   if (data.length > 0) {
      headers = Object.keys(data[0]).map((header) => ({
         label: capitalizeFirstLetter(header),
         key: header,
      }));
   }
   return headers;
};
