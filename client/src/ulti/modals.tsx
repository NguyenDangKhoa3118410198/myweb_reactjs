import Swal from 'sweetalert2';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const showToast = (icon: any, message: string) => {
   const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
         popup: 'custom-toast',
      },
      didOpen: (toast) => {
         toast.onmouseenter = Swal.stopTimer;
         toast.onmouseleave = Swal.resumeTimer;
      },
   });

   Toast.fire({
      icon,
      title: icon === 'error' ? 'Oops...' : '',
      text: message,
   });
};

export const alertMessage = (data: string, icon?: any) => {
   showToast(icon, data);
};

export const alertMessageError = (data: string) => {
   showToast('error', data);
};

export const alertSuccess = (data: string) => {
   showToast('success', data);
};

export const alertConfirmDelete = async (): Promise<boolean> => {
   return new Promise((resolve) => {
      Modal.confirm({
         title: 'Are you sure?',
         content: "You won't be able to revert this!",
         icon: <ExclamationCircleOutlined />,
         okText: 'Yes, delete it!',
         cancelText: 'Cancel',
         onOk() {
            resolve(true); // User confirmed
         },
         onCancel() {
            resolve(false); // User canceled
         },
      });
   });
};
