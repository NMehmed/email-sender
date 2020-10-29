"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mailgun = require("mailgun-js");
var domain = process.env.MAIL_GUN_DOMAIN;
var apiKey = process.env.MAIL_GUN_API_KEY;
var from = process.env.MAIL_FROM;
var mg = mailgun({ apiKey: apiKey, domain: domain });
var send = function (to, subject, text, cb) {
    var data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };
    mg.messages().send(data, cb);
};
exports.default = { send: send };
