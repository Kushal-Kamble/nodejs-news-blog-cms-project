const isAdmin = (req, res, next) => { // admin hai ki nahi ye check krne ke liye middleware
  if (req.role === 'admin') {// agar role admin hai to next kr do
    next();// next kr do
  } else {
    res.redirect('/admin/dashboard');// nahi to dashboard pe redirect kr do
  }
}

module.exports = isAdmin