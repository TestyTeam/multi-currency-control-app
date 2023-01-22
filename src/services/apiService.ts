import ky from 'ky';
import type { KyInstance } from 'ky/distribution/types/ky';

async function handleResponse(response: Response) {
  try {
    let dataJson;
    const dataText = await response.clone().text();

    if (dataText.length) dataJson = JSON.parse(dataText);
    const result = dataJson ?? dataText;
    return result;
  } catch (e) {
    // TODO заменить нормальным оповещением об ошибке или сделать редайрект на страницу с ошибкой
    console.log(e, e);
  }
}

export default function kyS(
  baseUrl: string,
  optionalKeys: { hasRetry: boolean; hasCache: boolean } = { hasRetry: false, hasCache: false },
): KyInstance {
  return ky.create({
    prefixUrl: baseUrl,
    hooks: {
      afterResponse: [
        async (request, options, response) => handleResponse(response),
      ],
      beforeError: [
        (errorData) => {
          const { response } = errorData;

          throw new Error();
        },
      ],
    },
    retry: optionalKeys.hasRetry
      ? {
        limit: 2,
        methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      }
      : 0,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
