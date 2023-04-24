/**
 * 根据Prefix创建CSS BEM 生成器；
 * @param prefix
 * @returns
 */
export const createBEMGenerator = (prefix: string) => (element: string, modifier?: string) => {
  return `${prefix}__${element}${modifier ? '--' + modifier || '' : ''}`;
};
