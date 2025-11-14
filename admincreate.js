const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('./models/User');

mongoose.connect('mongodb://localhost:27017/news-cms-blog')
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

async function createAdmin() {
  const hashedPass = await bcrypt.hash('123456', 10);

  await userModel.create({
    fullname: "Admin User",
    username: "admin",
    password: hashedPass,
    role: "admin"
  });

  console.log("Admin Created Successfully");
  process.exit();
}

createAdmin();
