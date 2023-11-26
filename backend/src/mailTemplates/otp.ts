import fs from 'fs';
import path from 'path';

const otpHTML = fs.readFileSync(path.join(__dirname, './otp.html'), {
  encoding: 'utf-8',
});

// export const verify = (url: string, year: string) => {
//   return verifyHTML.replace('{{link}}', `${url}`).replace('{{year}}', year);
// };

export const otp = (data: { otp: string; year: number }) => {
  return otpHTML.replace('{{OTP}}', `${data.otp}`).replace('{{year}}', data.year.toString());
};
