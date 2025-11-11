const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {  // ye fucntion chck krta hai ki userlogin hai kii nhi
  try {
    const token = req.cookies.token; // cookies mese data ko pick krta hooo vhape me check krta hooo ki vhape ky token hai ki nahi agar token nhi hai to redirect krta hoo aur agar hai to jwt me pass krta hooo 
    if (!token) return res.redirect('/admin/'); // agar token na mile to login page pe redirect kr dena hai

    const tokenData = jwt.verify(token, process.env.JWT_SECRET); // cookie me jo token hai usko verify krta hai
    // console.log(tokenData)
    req.id = tokenData.id;// jo token me id hai usko req.id me store kr dena hai
    req.role = tokenData.role;// jo token me role hai usko req.role me store kr dena hai
    req.fullname = tokenData.fullname;// jo token me fullname hai usko req.fullname me store kr dena hai
    next();// next kr dena hai agr sab kuch thik hai to
  } catch (error) {
    res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = isLoggedIn