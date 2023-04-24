import { describe, expect, test } from '@jest/globals';
import { fetchPatch, isNotPureHost } from '../src/fetch';

describe('的卢Core', () => {
  test('测试fetchHook', async () => {
    await expect(
      fetchPatch('https://g.alicdn.com/??secdev/entry/index.js'),
    ).resolves.toHaveProperty('ok', true);
    await expect(fetchPatch('https://fanyi.baidu.com')).rejects.toThrow();
  });

  test('测试isNotPureHost', () => {
    expect(isNotPureHost('https://g.alicdn.com')).toBe(true);
    expect(isNotPureHost('//g.alicdn.com')).toBe(true);
    expect(isNotPureHost('g.alicdn.com')).toBe(false);
  });
});
