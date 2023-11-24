const axios = require('axios');

const getUsers = async (req, res) => {
   try {
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/users'
      );
      const updatedData = response.data.map((user) => ({
         id: user.id,
         name: user.name,
         username: user.username,
         email: user.email,
      }));
      res.json(updatedData);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { getUsers };
