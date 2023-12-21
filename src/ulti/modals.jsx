import Swal from 'sweetalert2';

export const alertMessage = (data) => {
   Swal.fire({ position: 'top', fontSize: '16px', text: data });
};

export const alertMessageError = (data) => {
   Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: data,
   });
};

export const loginSuccess = (data) => {
   Swal.fire({ position: 'top', fontSize: '16px', text: data });
};

export const loginFailure = (data) => {
   Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data,
   });
};
