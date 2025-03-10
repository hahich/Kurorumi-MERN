const verifyEmailTemplate = ({ name, url }) => {
  return `
  <p>Dear ${name}</p>
    <p>Thanks for register Kurorumi</p>
    <a href=${url} style="color: black; marginTop: 10px">Verify Email</a>
    
    `;
};

export default verifyEmailTemplate;
