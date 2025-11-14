const bcrypt = require('bcryptjs');
const userModel = require('../models/User');

app.get('/create-admin', async (req, res) => {
  const hashed = await bcrypt.hash('123456', 10);

  await userModel.create({
    fullname: "Admin",
    username: "admin",
    password: hashed,
    role: "admin"
  });

  res.send("Admin Created");
});
