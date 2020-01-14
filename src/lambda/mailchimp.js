/* eslint-disable func-names */
/* eslint-disable consistent-return */

require(`dotenv`).config();

const Mailchimp = require(`mailchimp-api-v3`);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": `*`,
  "Access-Control-Allow-Headers": `Content-Type`
};
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

exports.handler = function(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode,
      headers,
      body: `Method unsupported: ${event.httpMethod}`
    };
  }

  const data = JSON.parse(event.body);

  if (!data.list_id || !data.email || !data.name) {
    const message = `Required information missing`;

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: `failed`,
        message
      })
    };
  }

  mailchimp
    .post(`lists/${data.list_id}`, {
      members: [
        {
          email_address: data.email,
          merge_fields: {
            FNAME: data.name
          },
          status: `subscribed`
        }
      ]
    })
    .then(() => {
      return {
        statusCode,
        headers,
        body: JSON.stringify({
          status: `ok`,
          message: `Mailchimp subscription successful`
        })
      };
    })
    .catch(error => {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: `failed`,
          error
        })
      };
    });
};
