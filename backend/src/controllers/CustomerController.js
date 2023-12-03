const axios = require('axios');
const customers = [];

const getCustomers = async (req, res) => {
   console.log('--------------- Get customers -------------------');
   try {
      const response = await axios.get('https://dummyjson.com/users');
      const data = response.data.users;
      const customerData = data.map((user) => {
         return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            maidenName: user.maidenName,
            age: user.age,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
         };
      });
      customers.push(...customerData);
      res.json(customerData);
      // console.log(customers);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteCustomer = (req, res) => {
   console.log('--------------- Delete customer -------------------');

   try {
      const customerId = parseInt(req.params.id, 10);
      console.log('delete userId : ', customerId);

      const customerIndex = customers.findIndex(
         (customer) => customer.id === customerId
      );

      if (customerIndex === -1) {
         return res.status(404).json({
            success: false,
            message: 'Customer not found',
         });
      }

      const deletedUser = customers.splice(customerIndex, 1)[0];

      res.json({
         success: true,
         message: 'Customer deleted successfully',
         deletedUser,
      });
   } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

module.exports = { getCustomers, deleteCustomer };
