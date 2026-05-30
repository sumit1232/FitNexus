const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        "sumitjadav2525@gmail.com",

      pass:
        "rmczokqlqhixzqpn",
    },
  });

const sendEmail = async (
  email,
  otp
) => {
  try {

    console.log(
      "EMAIL FUNCTION CALLED"
    );

    console.log(
      "Receiver:",
      email
    );

    console.log(
      "OTP:",
      otp
    );

    const info =
      await transporter.sendMail({
        from:
          '"FitNexus Gym" <sumitjadav2525@gmail.com>',

        to: email,

        subject: "Your OTP Code",

        text: `Your OTP is ${otp}`,

        html: `
          <h2>Your OTP Code</h2>

          <h1>${otp}</h1>

          <p>
            OTP valid for 5 minutes
          </p>
        `,
      });

    console.log(
      "EMAIL SENT:",
      info.messageId
    );

  } catch (error) {

    console.log(
      "GMAIL ERROR:"
    );

    console.log(error);

    throw error;
  }
};

module.exports = sendEmail;