import { Input } from 'antd';

export interface IInputSearch {
   placeholder?: string;
   onSearch?: (value: string) => void;
   style?: React.CSSProperties;
   enterButton?: React.ReactNode;
}

export default function InputSearch({
   placeholder,
   onSearch,
   ...props
}: IInputSearch) {
   return (
      <Input.Search
         placeholder={placeholder || 'Enter something.'}
         onSearch={onSearch}
         {...props}
      />
   );
}
