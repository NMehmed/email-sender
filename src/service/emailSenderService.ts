const mailgun = require("mailgun-js")
const domain = process.env.MAIL_GUN_DOMAIN
const apiKey = process.env.MAIL_GUN_API_KEY
const from = process.env.MAIL_FROM
const mg = mailgun({ apiKey, domain })

const send = (to: string, subject: string, text: string, cb: Function) => {
  const data = {
    from,
    to,
    subject,
    text
  }

  mg.messages().send(data, cb)
}

export default { send }
