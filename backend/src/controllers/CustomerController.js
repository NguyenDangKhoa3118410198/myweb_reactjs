const Customer = require('../models/Customer');

const customers = [];

const getCustomers = async (req, res) => {
   console.log('--------------- Get customers -------------------');
   try {
      const customersDB = await Customer.find({});

      if (!customersDB || customersDB.length === 0) {
         return res.status(404).json({ error: 'No customers found' });
      }

      const filteredCustomers = customersDB.map((customer) => ({
         id: customer._id,
         userId: customer.user,
         address: customer.address,
         phone: customer.phone,
         dateOfBirth: customer.dateOfBirth,
         gender: customer.gender,
         avatar: customer.avatar,
      }));

      res.json(filteredCustomers);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const editCustomers = async (req, res) => {
   const idCustomers = req.params.id;

   try {
      if (!idCustomers) {
         return res.status(400).json({ error: 'Invalid customer ID' });
      }

      const customerDB = await Customer.findOne({ _id: idCustomers });

      if (!customerDB) {
         return res.status(404).json({ error: 'Customer not found' });
      }

      const { address, phone, dateOfBirth, gender, avatar } = req.body;

      // ?? (nullish coalescing operator) để kiểm tra giá trị của req.body
      //và chỉ cập nhật các trường nếu giá trị từ req.body là truthy (không phải null hoặc undefined).
      customerDB.address = address ?? customerDB.address;
      customerDB.phone = phone ?? customerDB.phone;
      customerDB.dateOfBirth = dateOfBirth ?? customerDB.dateOfBirth;
      customerDB.gender = gender ?? customerDB.gender;
      customerDB.avatar = avatar ?? customerDB.avatar;

      await customerDB.save();

      res.json(customerDB);
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

module.exports = { getCustomers, editCustomers, deleteCustomer };
