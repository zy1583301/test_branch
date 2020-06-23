let context = null;
export function getContext(that) {
  context = that
}
export function con() {
  console.log(context,'contet1111')
  context.a++
}
console.log(context,'contet')