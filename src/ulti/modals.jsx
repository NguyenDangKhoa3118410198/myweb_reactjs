import Swal from 'sweetalert2';

const showToast = (icon, message) => {
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

export const alertMessage = (icon, data) => {
   showToast(icon, data);
};

export const alertMessageError = (data) => {
   showToast('error', data);
};

export const alertSuccess = (data) => {
   showToast('success', data);
};

export const alertConfirmDelete = async () => {
   const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
   });

   return result;

   // const result = await Swal.fire({
   //    title: 'Confirm Deletion',
   //    text: 'Are you sure you want to delete this record?',
   //    icon: 'warning',
   //    showCancelButton: true,
   //    confirmButtonText: 'OK',
   //    cancelButtonText: 'Cancel',
   // });

   // return result;
};
