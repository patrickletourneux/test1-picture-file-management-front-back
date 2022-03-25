const debug = require('debug')('router');
const express = require('express');
var multer  = require('multer');
const client = require("./database");
const router = express.Router();
var upload = multer()

const bodyParser = multer();
router.use(bodyParser.none());


router.post('/profile-upload-single', upload.single('profile-file'), async function (req, res, next) {

    console.log(JSON.stringify(req.file))
    console.log('req.file:', req.file)
    // il y a un buffer dans req.file.buffer
    var buffer =  req.file.buffer;
    // convert buffer to base64
    var string64 = buffer.toString('base64');
    const values = [];
    const query = {
        text:`INSERT INTO avatar (avatar_name,avatar_image) VALUES ('${req.file.originalname}', '${string64}') RETURNING id;`,
        values
    };
    debug(query)
    const result = await client.query(query);
    console.log('id image saved', result.rows[0].id)

    res.status(200).json('ok saved in bdd')
    // return res.status(200).json('id image saved', result.rows[0].id)
  });
  
router.post('/profile-download-single', async function (req, res, next) {
    debug(req.body)
    const values = [];
    const query = {
        text:`SELECT * FROM avatar WHERE id=${req.body.id};`,
        values
    };
    debug(query)
    const result = await client.query(query);
    debug('image download id : ', result.rows[0].id)
    debug('image download name : ', result.rows[0].avatar_name)

    const b64string = result.rows[0].avatar_image;
    var buffer = Buffer.from(b64string, 'base64');
    debug('buffer:', buffer)
    res.send(buffer);
   
  })











  router.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
      // req.files is array of `profile-files` files
      // req.body will contain the text fields, if there were any
      var response = '<a href="/">Home</a><br>'
      response += "Files uploaded successfully.<br>"
      for(var i=0;i<req.files.length;i++){
          response += `<img src="${req.files[i].path}" /><br>`
      }
      
      return res.send(response)
  })

module.exports = router; 