// if (!window.fetch) {
//   throw new Error('[@dilu/core] Here is no "fetch" on the window env, you need to polyfill it');
// }
// if (!window.URL) {
//   throw new Error('[@dilu/core] Here is no "URL" on the window env, you need to polyfill it');
// }

// /**
//  * 校验是否是合法的host
//  * @param host
//  * @returns boolean
//  */
// export function isNotPureHost(host: string) {
//   const isValidHostWithProtocal = /^https?:\/\//.test(host);
//   const isValidHostWithoutProtocal = /^\/\//.test(host);
//   return isValidHostWithProtocal || isValidHostWithoutProtocal;
// }

// const NetWorkError = 'FetchCDNHooks NetWork Response was not OK';

// /**
//  * 兼容window.fetch，增加检测请求是否成功的能力
//  * https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
//  * @param url 定义要获取的资源
//  * @param init
//  * @returns
//  */
// export const fetchPatch: (url: RequestInfo | URL, init?: RequestInit) => Promise<any> =
//   async function (url: any, init?: RequestInit) {
//     return window
//       .fetch(url, init)
//       .then((response) => {
//         if (!response || !response.ok) {
//           throw new Error(
//             response
//               ? `${response.status} ${response.statusText}, ${NetWorkError}`
//               : `${NetWorkError}`,
//           );
//         } else {
//           return response;
//         }
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };

export enum FetchStatus {
  Init = 0,
  Fetching = 1,
  Fetched = 2,
  Error = 3,
}
