import { v4 as uuidv4 } from 'uuid';

// uuid/key1:v1,key2:v2,key3:v3....
export const ObjectIdPaser = (id: string) => {
  const result: Record<string, string> = {};
  const infoStringify = id.split('/')[1];
  const infoArr = infoStringify.split(',');
  infoArr.forEach((item) => {
    const [key, value] = item.split(':');
    result[key] = value;
  });
  return result;
};

export const ObjectIdCreator = (data: Record<string, number | string>) => {
  const uuid = uuidv4();

  const infoStringify = Object.keys(data)
    .map((key) => {
      return `${key}:${data[key]}`;
    })
    .join(',');

  return `${uuid}/${infoStringify}`;
};
