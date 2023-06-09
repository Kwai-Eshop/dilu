import { Activity, ActivityFn } from '@/type';

export function sanitizeActiveWhen(activeWhen: Activity) {
  let activeWhenArray = Array.isArray(activeWhen) ? activeWhen : [activeWhen];
  activeWhenArray = activeWhenArray.map((activeWhenOrPath) =>
    typeof activeWhenOrPath === 'function' ? activeWhenOrPath : pathToActiveWhen(activeWhenOrPath),
  );

  return (location: any) => activeWhenArray.some((activeWhen: ActivityFn) => activeWhen(location));
}

export function pathToActiveWhen(path: string, exactMatch?: boolean) {
  const regex = toDynamicPathValidatorRegex(path, exactMatch);

  return (location: any) => {
    // compatible with IE10
    let origin = location.origin;
    if (!origin) {
      origin = `${location.protocol}//${location.host}`;
    }
    const route = location.href.replace(origin, '').replace(location.search, '').split('?')[0];
    return regex.test(route);
  };
}

function escapeStrRegex(str: string) {
  // borrowed from https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function toDynamicPathValidatorRegex(path: string, exactMatch?: boolean) {
  let lastIndex = 0,
    inDynamic = false,
    regexStr = '^';

  if (path[0] !== '/') {
    path = '/' + path;
  }

  for (let charIndex = 0; charIndex < path.length; charIndex++) {
    const char = path[charIndex];
    const startOfDynamic = !inDynamic && char === ':';
    const endOfDynamic = inDynamic && char === '/';
    if (startOfDynamic || endOfDynamic) {
      appendToRegex(charIndex);
    }
  }

  appendToRegex(path.length);
  return new RegExp(regexStr, 'i');

  function appendToRegex(index: number) {
    const anyCharMaybeTrailingSlashRegex = '[^/]+/?';
    const commonStringSubPath = escapeStrRegex(path.slice(lastIndex, index));

    regexStr += inDynamic ? anyCharMaybeTrailingSlashRegex : commonStringSubPath;

    if (index === path.length) {
      if (inDynamic) {
        if (exactMatch) {
          // Ensure exact match paths that end in a dynamic portion don't match
          // urls with characters after a slash after the dynamic portion.
          regexStr += '$';
        }
      } else {
        // For exact matches, expect no more characters. Otherwise, allow
        // any characters.
        const suffix = exactMatch ? '' : '.*';

        regexStr =
          // use charAt instead as we could not use es6 method endsWith
          regexStr.charAt(regexStr.length - 1) === '/'
            ? `${regexStr}${suffix}$`
            : `${regexStr}(/${suffix})?(#.*)?$`;
      }
    }

    inDynamic = !inDynamic;
    lastIndex = index;
  }
}
