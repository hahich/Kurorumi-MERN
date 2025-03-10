const generatedOtp = () => {
  return Math.floor(Math.random() * 90000) + 100000; //100000 to 999999
};

export default generatedOtp;
