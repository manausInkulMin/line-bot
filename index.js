// /**
//  * @author Pamontep Panya
//  * @email pamontep.p@gmail.com
//  * @create date 2018-06-03 03:45:02
//  * @modify date 2018-06-03 03:45:02
//  * @desc A sample project of Node.js and Line API
// */
// const server = require('express')
// const PORT = process.env.PORT || 4000
// const request = require('request')
// const bodyParser = require('body-parser')

// server()
//   .use(bodyParser.json())
//   .use(bodyParser.urlencoded({extended: false}))
//   .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${PORT}`))
//   // .post('/webHook', function (req, res) {
//   //   let replyToken = req.body.events[0].replyToken
//   //   let msg = req.body.events[0].message.text
//   //   console.log(`Message token : ${replyToken}`)
//   //   console.log(`Message from chat : ${msg}`)
//   //   res.json({
//   //     status: 200,
//   //     message: `Webhook is working!`
//   //   })
//   // })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`))
