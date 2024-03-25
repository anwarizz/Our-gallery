const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');
const jwt = require('jsonwebtoken')
const port = 3000

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())





const storage = multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, path.join(__dirname, "uploads/"))
        },
        filename:  function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
})

const upload = multer({storage: storage})





mongoose.connect('mongodb://127.0.0.1:27017/gallery')

const db = mongoose.connection  
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => { console.log('Connected to MongoDB') })

const Schema = mongoose.Schema

const albumSchema = new Schema({
    image: {type: String},
    header: {type: String},
    create_at: {type: String},
    photos: {type: []},
})

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
})



const Albums = mongoose.model('albums', albumSchema) 
const Users = mongoose.model('users', userSchema)   




app.post('/auth', (req, res) => {
    const token = jwt.sign({ userID:  req.body.id, username: req.body.username, password: req.body.password }, 'shhhhh');
    const decoded = jwt.verify(token, 'shhhhh')
    res.status(200).json({token})
    console.log('user login!!' + decoded)    
    // req.session.loggedin = true
    // req.session.SID = req.body.id
    // console.log(req.session)
})

app.get('/get-auth', (req, res) => {
    const UID = req.query.uid
    const decodedUID = jwt.verify(UID.split(' ')[0], 'shhhhh')
    res.status(200).json({decodedUID})
    // console.log(req.headers['authorization'])
    // res.status(200).json({loggedin: req.session.loggedin, SID: req.session.SID})
})

app.get("/albums", (req, res) => {
    let id = req.query.id
    try {
        if (id) {
            Albums.find({_id: id}).then(item => {
                res.status(200).json({message:"Successfully!", data: item})
            })  
        } else {
            Albums.find().then(item => {
                res.status(200).json({message:"Successfully!", data: item})
            })
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.get('/albums-query', (req, res) => {
    let header = req.query.header
    console.log(header)
    Albums.find({header: {$regex: `${header}`}}).then(item => {
        res.status(200).json({message: 'haii', data: item})
        console.log('fine one query' + item + 'haha')})
})



app.post('/albums', async (req, res) => {
    try {
        const albums = new Albums(req.body)
        albums.save().then((albums) => console.log(`Album create data: ${albums}.`))
    } catch (error) {
        console.log(error)
    }

})

app.delete('/albums/:id/delete', (req, res) => {
    const { id } = req.params
    Albums.deleteOne({_id: id}).then(() => console.log(`Album delete id: ${id}.`)).catch(() => console.log("error deleted!!"))
})

app.put('/albums/:id/edit', upload.single('file'), (req, res) => {
    // console.log(req.file)
    // console.log(req.body)

    const { id } = req.params
    let data = {}

    if (req.file) {
        data = {
            image: req.file.filename, 
            header: req.body.header
        }
    } else {
        data = {
            header: req.body.header
        }
    }
    // console.log(id)
    // console.log(req.body)
    try {
        Albums.findOneAndUpdate({_id: id}, data).then(() => console.log(`Album update id: ${id} data: ${data}.`))
    } catch (error) {
        console.log(error)
    }
})


app.put('/albums/:id/add', upload.single('photo'), (req, res) => {
    const { id } = req.params
    console.log(req.file)
    console.log(id)
    Albums.findByIdAndUpdate(id, {$push: {photos: {url: req.file.filename}}}).then(() => console.log('finally adding some photo!'))
})


app.post('/register', (req, res) => {
    // console.log(req.body)
    Users.insertMany(req.body).then(() => console.log('Create one user! username:' + req.body.username))
})

app.get('/users', (req, res) => {
    const username = req.query.username
    Users.find({username}).then(item => {
        res.status(200).json({message:"Getting one data like!", data: item})
    })
})

app.get('/users', (req, res) => {
    const username = req.query.username
    const password = req.query.password
    Users.find({username, password}).then(item => {
        res.status(200).json({message:"Getting user data!", data: item})
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})