export const generateAuthHeader = () => {
   const token = localStorage.getItem('authToken');
   return {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
};
