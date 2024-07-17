import { Button } from 'antd';

export interface IButton {
   label: string;
   icon?: any;
   style?: any;
}

export default function ButtonCustom({ label, ...props }: IButton) {
   return <Button {...props}>{label}</Button>;
}
