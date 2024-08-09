const UserDetail = require('../models/UserDetail');

const getUsersDetail = async (req, res) => {
   console.log('--------------- Get user detail -------------------');
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 5;
   const skip = (page - 1) * limit;

   try {
      const totalUserDetails = await UserDetail.countDocuments({});
      const usersDetailDB = await UserDetail.find({}).skip(skip).limit(limit);

      if (!usersDetailDB || usersDetailDB.length === 0) {
         return res.status(404).json({ error: 'No user detail found' });
      }

      const listUserDetails = usersDetailDB.map((userDetail) => ({
         id: userDetail._id,
         userId: userDetail.user,
         address: userDetail.address,
         phone: userDetail.phone,
         dateOfBirth: userDetail.dateOfBirth,
         gender: userDetail.gender,
         avatar: userDetail.avatar,
      }));

      const totalPages = Math.ceil(totalUserDetails / limit);

      res.status(200).json({
         data: listUserDetails,
         pagination: { page, totalPages },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const editUserDetail = async (req, res) => {
   console.log('--------------- Edit user detail -------------------');

   const idUserDetail = req.params.id;

   try {
      if (!idUserDetail) {
         return res.status(400).json({ error: 'Invalid user ID' });
      }

      const userDetailDB = await UserDetail.findOne({ _id: idUserDetail });

      if (!userDetailDB) {
         return res.status(404).json({ error: 'UserDetail not found' });
      }

      const { address, phone, dateOfBirth, gender, avatar } = req.body;

      userDetailDB.address = address ?? userDetailDB.address;
      userDetailDB.phone = phone ?? userDetailDB.phone;
      userDetailDB.dateOfBirth = dateOfBirth ?? userDetailDB.dateOfBirth;
      userDetailDB.gender = gender ?? userDetailDB.gender;
      userDetailDB.avatar = avatar ?? userDetailDB.avatar;

      await userDetailDB.save();

      res.status(200).json({
         success: true,
         message: 'User detail updated successfully',
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteUserDetail = async (req, res) => {
   console.log('--------------- Delete user detail -------------------');
   try {
      const userDetailId = req.params.id;
      console.log('delete user detailId : ', userDetailId);

      const existingUserDetail = await UserDetail.findOneAndDelete({
         _id: userDetailId,
      });

      if (!existingUserDetail) {
         return res.status(404).json({
            success: false,
            message: 'User detail not found',
         });
      }

      res.status(200).json({
         success: true,
         message: 'User detail deleted successfully',
      });
   } catch (error) {
      console.error('Error deleting user detail:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

module.exports = { getUsersDetail, editUserDetail, deleteUserDetail };
