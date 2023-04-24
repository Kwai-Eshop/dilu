// import { MicroInfo } from '@/type';
// import { fetchPatch } from '@/fetch';

// import createDebug from 'debug';

// const debug = createDebug('DL:Core-GetMicroAppList');

// export const getMicroAppList: (
//   api: RequestInfo,
//   init?: RequestInit,
// ) => Promise<Array<MicroInfo>> = async (api: RequestInfo | URL, init?: RequestInit) => {
//   try {
//     const _microList: Array<MicroInfo> = await fetchPatch(api, init);
//     const microList: Array<MicroInfo> = [];
//     _microList.forEach((micro: MicroInfo) => {
//       if (!!micro.entry) {
//         microList.push({
//           ...micro,
//         });
//       } else {
//         debug(`过滤没有入口的子应用：${micro.name}`);
//       }
//     });

//     return microList;
//   } catch {
//     return [];
//   }
// };
