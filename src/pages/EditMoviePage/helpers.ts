const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
const idLength = 8;
export const GenerateID = () => {
  let result = '';
  let counter = 0;
  while (counter < idLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export function getSafeFileName(fileName: string) {
  const name = getFileName(fileName);
  const extension = fileName.substring(fileName.lastIndexOf('.'));
  return name + '_' + GenerateID() + extension;
}

export function getFileName(fileName: string) {
  return fileName.slice(0, fileName.lastIndexOf('.'));
}
