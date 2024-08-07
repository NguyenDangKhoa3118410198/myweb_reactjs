const Customer = require('../models/Customer');

const getCustomers = async (req, res) => {
   console.log('--------------- Get customers -------------------');

   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 5;
   const skip = (page - 1) * limit;
   const searchTerm = req.query.search ? req.query.search.trim() : '';

   try {
      const searchQuery = searchTerm
         ? {
              $or: [
                 { address: { $regex: searchTerm, $options: 'i' } },
                 { phone: { $regex: searchTerm, $options: 'i' } },
                 { gender: { $regex: searchTerm, $options: 'i' } },
              ],
           }
         : {};

      const totalCustomers = await Customer.countDocuments(searchQuery);

      const customersDB = await Customer.find(searchQuery)
         .skip(skip)
         .limit(limit);

      if (!customersDB) {
         return res.status(404).json({ error: 'No customers found' });
      }

      const listCustomers = customersDB.map((customer) => ({
         id: customer._id,
         userId: customer.user,
         address: customer.address,
         phone: customer.phone,
         dateOfBirth: customer.dateOfBirth,
         gender: customer.gender,
         avatar: customer.avatar,
      }));

      const totalPages = Math.ceil(totalCustomers / limit);

      res.status(200).json({
         data: listCustomers,
         pagination: { page, totalPages },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const editCustomers = async (req, res) => {
   console.log('--------------- Edit customer -------------------');

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

      res.status(200).json({
         success: true,
         message: 'Customer updated successfully',
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteCustomer = async (req, res) => {
   console.log('--------------- Delete customer -------------------');
   try {
      const customerId = req.params.id;
      console.log('delete customerId : ', customerId);

      const existingCustomer = await Customer.findOneAndDelete({
         _id: customerId,
      });

      if (!existingCustomer) {
         return res.status(404).json({
            success: false,
            message: 'Customer not found',
         });
      }

      res.status(200).json({
         success: true,
         message: 'Customer deleted successfully',
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
