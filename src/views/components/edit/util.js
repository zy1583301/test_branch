/*---------------------------------------------------------------------------------------
 *  Gin [ zhouweiping@aibank.com | eric.prototype@gmail.com ]
 *  Created by 2019-09-27 19:19
 *  Copyright © 2019 AIbank. All Rights Reserved.
 *-------------------------------------------------------------------------------------*/

export function debounce(fn, wait = 1) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, ...args), wait);
  };
}
