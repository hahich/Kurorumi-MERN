const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
    <p>Dear, ${name}</p>
    <p>You are request a password reset. Please use following OTP code to reset your password.</p>
    </div>

    <div style="background: yellow; padding: 30px; text-align: center; font-weight: 800; font-size: 20px">${otp}</div>
    <p>This otp is valid for 1 hour only. Enter this otp in My Website to process reseting your password.</p>
    <br>
    <p>Thanks</p>
    <p>Kurorumi</p>
    `;
};

export default forgotPasswordTemplate;
