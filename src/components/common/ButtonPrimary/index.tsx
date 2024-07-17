import { Button } from 'antd';
import { IButton } from '../Button';

export default function PrimaryButton({ label, icon, ...props }: IButton) {
   return (
      <>
         <Button
            type='primary'
            {...props}
            style={{
               backgroundColor: 'var(--buttonSubmit)',
               borderRadius: '10px',
               fontSize: '14px',
               fontWeight: 500,
               padding: '16px',
               ...props?.style,
            }}
            icon={icon}
         >
            {label}
         </Button>
      </>
   );
}
