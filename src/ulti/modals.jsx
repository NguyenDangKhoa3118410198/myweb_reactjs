import Swal from 'sweetalert2';

export const alertMessage = (data) => {
   Swal.fire({ position: 'top', text: data });
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
   Swal.fire({ position: 'top', icon: 'success', text: data });
};

export const loginFailure = (data) => {
   Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data,
   });
};

export const alertConfirmDelete = async () => {
   const result = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
   });

   return result;
};

export const alertSuccess = (data) => {
   Swal.fire({
      position: 'top',
      icon: 'success',
      title: data,
      showConfirmButton: false,
      timer: 1100,
   });
};
