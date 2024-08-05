import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import styled from 'styled-components';

export interface IInputSearch extends SearchProps {
   placeholder?: string;
   onSearch?: (value: string) => void;
   style?: React.CSSProperties;
   enterButton?: React.ReactNode;
   height?: string;
}

const StyledInputSearch = styled(Input.Search)<{}>`
   padding: 5px;
`;

export default function InputSearch({
   placeholder,
   onSearch,
   ...props
}: IInputSearch) {
   return (
      <StyledInputSearch
         placeholder={placeholder || 'Enter something.'}
         onSearch={onSearch}
         {...props}
      />
   );
}
