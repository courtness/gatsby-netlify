/* eslint-disable func-names */
/* eslint-disable consistent-return */

const nodemailer = require(`nodemailer`);

require(`dotenv`).config();

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": `*`,
  "Access-Control-Allow-Headers": `Content-Type`
};

exports.handler = function(event) {
  if (event.httpMethod !== `POST`) {
    return {
      statusCode,
      headers,
      body: `Method unsupported: ${event.httpMethod}`
    };
  }

  const data = JSON.parse(event.body);

  if (!data) {
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

  async function sendMail(payload) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    //

    const enquiryText = `New Site Name Enquiry`;

    let html = ``;
    let text = ``;

    Object.keys(payload).forEach(key => {
      text = `${text}${key}: ${payload[key].value}`;
      html = `${html}<p>${key}: ${payload[key].value}</p>`;
    });

    // eslint-disable-next-line no-unused-vars
    const info = await transporter.sendMail({
      from: `"${enquiryText}" <${process.env.SMTP_USERNAME}>`,
      to: process.env.MAIL_TARGET,
      subject: `Site Enquiry`,
      text,
      html: `<b>${html}</b>`
    });
  }

  sendMail(data).then(() => {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        status: `ok`,
        message: `Email data sent`
      })
    };
  });
};
