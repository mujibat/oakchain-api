import fs from 'fs';
import path from 'path';

const welcomeHTML = fs.readFileSync(path.join(__dirname, './welcome.html'), {
  encoding: 'utf-8',
});

// export const verify = (url: string, year: string) => {
//   return verifyHTML.replace('{{link}}', `${url}`).replace('{{year}}', year);
// };

export const welcome = (data: { welcome: string; year: number }) => {
  return welcomeHTML
    .replace('{{name}}', `${data.welcome}`)
    .replace('{{year}}', data.year.toString());
};
