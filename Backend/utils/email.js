const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
module.exports = class Email {
  constructor(_0x51eb5f, _0x21fb66) {
    console.log(process.env.EMAIL_HOST);
    this.to = _0x51eb5f.email;
    this.firstName = _0x51eb5f.name.split(" ")[0x0];
    this.url = _0x21fb66;
    this.from = "OrderIt <" + process.env.EMAIL_FROM + ">";
  }
  ["newTransport"]() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  async ["send"](_0x3f224c, _0x5c1275) {
    const _0x20aaa1 = pug.renderFile(__dirname + "/../view/" + _0x3f224c + ".pug", {
      firstName: this.firstName,
      url: this.url,
      subject: _0x5c1275
    });
    const _0x2546b0 = {
      from: this.from,
      to: this.to,
      subject: _0x5c1275,
      html: _0x20aaa1,
      text: htmlToText.convert(_0x20aaa1)
    };
    await this.newTransport().sendMail(_0x2546b0);
  }
  async ["sendWelcome"]() {
    await this.send("welcome", "welcome to the Order It!");
  }
  async ["sendPasswordReset"]() {
    await this.send("passwordReset", "password reset token (valid for only 10 minutes)");
  }
};