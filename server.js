const express = require('express');
const app = express();
const db = require('./db/dbConnection');
const path = require('path');
const file = path.join(__dirname, './views');
const model = require('./model/imageModel');
const router = require('./Router/userRouter');
const adminRouter = require('./Router/adminRouter')
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', file);

app.use('/', router);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('./user/register')
})

app.get('/adminLogin', (req, res) => {
  res.render('./admin/adminLogin')
})

app.get('/login', (req, res) => {
  res.render('./user/login')
})

app.post('/edit/:id', async (req, res) => {
  try {
    const user = await model.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();

    res.redirect('http://localhost:3000/admin/view');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});    
