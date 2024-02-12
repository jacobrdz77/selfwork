const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: any = 0;

  const debounced = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  //   @ts-ignore
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

// const debounce = (fn: Function, ms = 300) => {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, args), ms);
//   };
// };

export default debounce;
