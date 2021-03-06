require ('dotenv').config({ silent: true })

const SparkPost = require('sparkpost');
const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}
const client = new SparkPost(process.env.SPARKPOST_API_KEY, options);
import EmailTemplate from '../assets/js/email-template'

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
}

exports.handler = function(event, context, callback) {
  console.log(event)
  // console.log(`this is the event body: JSON.parse(${event.body})`)
  // const responseBody = JSON.parse(event.body)
  // const { message, name, email, address_line1, city, state, zip, items } = responseBody
  // console.log(items)

  client.transmissions.send({
    content: {
      from: 'asa@backroom.io',
      subject: `Hello, `,
      html: '<html><body><p>test</p></body></html>',
    },
  recipients: [{ address: 'smith.asa.la@gmail.com'  }]
  })
  .then(data => {
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    })
  })
  .catch(err => {
    console.log('fail')
    console.log(err)
  })
}
