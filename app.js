
// Reply with two static messages
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const configParams = require('./config/config')
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(event => {
    console.log('event', event)
  })).then(() => res.end()).catch((err) => {
    console.error(err)
    res.status(500).end()
  })
  let replyToken = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  // console.log('req.body :> ', req.body)
  if (msg === 'Payment' || msg === 'payment') {
    paymentApi(replyToken, 'Register')
  } else if (msg === 'Register' || msg === 'register') {
    registerMessage(replyToken, 'Register')
  } else if (msg === 'Register Wallet' || msg === 'register wallet') {
    registerAPI(replyToken, 'Register')
  } else if (msg === 'my account' || msg === 'account') {
    getProfilrUser(replyToken, 'my account')
  } else if (msg === 'token') {
    getTokenUser(req.body.events[0].replyToken)
  } else {
    reply(replyToken, msg)
  }
  res.sendStatus(200)
})
app.listen(port)
function reply(replyToken, text) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + configParams.token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: text
    }]
  })
  request.post({
    url: configParams.replyMessage,
    headers: headers,
    body: body
  }, (_err, res, _body) => {
    console.log('status = ' + res.statusCode)
  })
}
function registerMessage(replyToken, text) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + configParams.token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      'type': 'template',
      'altText': 'This is a buttons template',
      'template': {
        'type': 'buttons',
        'thumbnailImageUrl': 'https://1.bp.blogspot.com/-U90M8DyKu7Q/W9EtONMCf6I/AAAAAAAAW_4/7L_jB_Rg9oweu2HKhULNdu9WNefw9zf9wCLcBGAs/s1600/sao-full.jpg',
        'imageAspectRatio': 'rectangle',
        'imageSize': 'cover',
        'imageBackgroundColor': '#FFFFFF',
        'title': 'Map Wallet with Line',
        'text': 'กรุณาเลือก',
        'defaultAction': {
          'type': 'uri',
          'label': 'View detail',
          'uri': 'https://line-demobot.herokuapp.com/webhook/php/login_uselib_callback.php'
        },
        'actions': [
          {
            'type': 'uri',
            'label': 'Register',
            'text': 'Register Wallet',
            'uri': 'line://app/1579352637-kqrj0QDw'
          }
        ]
      }
    }]
  })
  // let body = JSON.stringify({
  //   replyToken: replyToken,
    // messages: [{
    //   'type': 'template',
    //   'altText': 'This is a buttons template',
    //   'template': {
    //     'type': 'confirm',
    //     'text': 'ต้องการผูกบัญชีผู้ใช่งาน',
    //     'actions': [
    //       {
    //         'type': 'uri',
    //         'label': 'ใช่',
    //         // 'text': 'Register Wallet',
    //         'url': 'https://line-demobot.herokuapp.com/webhook/php/login_uselib_callback.php'
    //       },
    //       {
    //         'type': 'postback',
    //         'label': 'ไม่',
    //         'data': 'action=buy&itemid=123'
    //       }
    //     ]
    //   }
    // }]
  // })
  request.post({
    url: configParams.replyMessage,
    headers: headers,
    body: body
  }, (_err, res, _body) => {
    console.log('status = ' + res.statusCode)
  })
}
function registerAPI(replyToken, text) {
  let option = {
    url: configParams.serviceAPIPort + '/api/v1/portals/get/email',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZGlnaW86MXFhelpBUSE='
    }
  }
  request.post({
    url: configParams.serviceAPIPort + '/api/v1/portals/get/email',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZGlnaW86MXFhelpBUSE='
    }
  }, (error, res, _body) => {
    if (error) {
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + configParams.token
      }
      let body = JSON.stringify({
        replyToken: replyToken,
        messages: [{
          type: 'text',
          text: error
        }]
      })
      request.post({
        url: configParams.replyMessage,
        headers: headers,
        body: body
      }, (_err, res, _body) => {
        console.log('status = ' + res.statusCode)
      })
    } else {
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + configParams.token
      }
      let body = JSON.stringify({
        replyToken: replyToken,
        messages: [{
          type: 'text',
          text: _body
        }]
      })
      request.post({
        url: configParams.replyMessage,
        headers: headers,
        body: body
      }, (_err, res, _body) => {
        console.log('status = ' + res.statusCode)
      })
    }
  })
}
function paymentApi(replyToken, text) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + configParams.token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      'type': 'template',
      'altText': 'This is a buttons template',
      'template': {
        'type': 'buttons',
        'thumbnailImageUrl': 'https://1.bp.blogspot.com/-U90M8DyKu7Q/W9EtONMCf6I/AAAAAAAAW_4/7L_jB_Rg9oweu2HKhULNdu9WNefw9zf9wCLcBGAs/s1600/sao-full.jpg',
        'imageAspectRatio': 'rectangle',
        'imageSize': 'cover',
        'imageBackgroundColor': '#FFFFFF',
        'title': 'แผ่นเกม Sword Art Online',
        'text': 'กรุณาเลือก',
        'defaultAction': {
          'type': 'uri',
          'label': 'View detail',
          'uri': 'https://www.google.com'
        },
        'actions': [
          {
            'type': 'postback',
            'label': 'สั่งซื้อ',
            'text': 'สั่งซื้อ',
            'data': 'action=buy&itemid=123'
          },
          {
            'type': 'postback',
            'label': 'เพิ่มลงรถเข็น',
            'text': 'เพิ่มลงรถเข็น',
            'data': 'action=add&itemid=123'
          },
          {
            'type': 'uri',
            'label': 'อ่านรายละเอียด',
            'uri': 'https://www.google.com'
          }
        ]
      }
    }]
  })
  request.post({
    url: configParams.replyMessage,
    headers: headers,
    body: body
  }, (_err, res, _body) => {
    console.log('status = ' + res.statusCode)
  })
}
function getProfilrUser(replyToken, text) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + configParams.token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: text
    }]
  })
  request.post({
    url: configParams.replyMessage,
    headers: headers,
    body: body
  }, (_err, res, _body) => {
    console.log('status = ' + res.statusCode)
  })
}

function getTokenUser(replyToken) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + configParams.token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: 'profile token:> ' + replyToken
    }]
  })
  request.post({
    url: configParams.replyMessage,
    headers: headers,
    body: body
  }, (_err, res, _body) => {
    console.log('status = ' + res.statusCode)
  })
}
