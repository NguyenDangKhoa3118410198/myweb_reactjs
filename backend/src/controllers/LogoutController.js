const logout = (req, res) => {
   console.log('Server req logout');
   res.json({ success: true, message: 'Logout successful' });
};

module.exports = { logout };
