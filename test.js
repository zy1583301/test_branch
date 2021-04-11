/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-11 13:56:38
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 14:18:23
 */
let arr = [5,2,1,3,2,4] 
console.log(shunzi(arr),'shunzi(arr)')
function shunzi(arr) {
   arr.sort((a,b)=> a-b)
   let flag = true
   arr.reduce((a,b)=>{
       console.log(a,b,'ab')
    if(b-a !== 1) flag = false
    return b
   })
   return flag
}


// console.log(isStraight(arr))
// console.log(shunzi(arr),'arrarr')
// // function shunzi(list) {
// //     const length = list.length;
// //     const reSort = list.sort((prev,next)=>prev-next);
// //     let min = reSort[0];
// //     let max = reSort[length -1 ];
// //     return max - min === length - 1
// // }
// function shunzi(list) {
//     const sortResult = list.sort((prev, next) => prev - next);
//     let bool = true;
//     sortResult.reduce((prev, next) => {
//       if (next - prev !== 1) bool = false
//       console.log(next,'next')
//         return next
//     })
//     return bool;
//   }
// function isStraight(arr) {
//     arr.sort((a,b) => a - b)
//     let len = arr.length
//     let m = arr[len-1]
//     for(let i = len-2;i>=0;i--) {
//         if(m-arr[i] !== 1) return false 
//         m = arr[i]
//     }
//     return true
// }
//  let arr = [1,2,3,3,4,5,6,7,8,9]
//     arr= [1,2,3,4,4,5]

//  var isPossible = function( nums) {
 
//     let split = (nums, start, end) =>{
    
//         for(let i= start;i<end-1;i++) {
//             if (nums[i + 1] - nums[i] > 1) return isSerial(nums , start, i) && split(nums, i + 1, end);
//         }
//         return isSerial(nums, start, end);
//     }
//     let isSerial = (nums, start, end) => {
        
//         let arr = [];
//         let count = 1
//         for(let i=start+1;i<=end;i++){
//             if (nums[i] == nums[i - 1]){
//             count ++;
//             } else {
//                 arr.push( count );
//                 count = 1;
//             }
//         }
//         arr.push( count );
//         return isSerialArr(arr, arr.length - 1);
//     }
//     let isSerialArr = (arr, end) =>{
//         if (end < 0) return true ;
        
//         if (end < 2) return false;
        
//         let i = end;
        
//         for(;i>0;i--){
//         if (arr[i] > arr[i -1]) break;
//         }
//         if (end - i < 2) return false;
        
//         for(let j=end;j>i-1;j--) {
//             if (arr[j] -- === 1) end--;
//         }
//         return isSerialArr(arr, end);
//     }
//     return split(nums, 0, nums.length - 1);
 
// }
// let m = isPossible(arr)
// console.log(m,'mmmmmm')
        //[1,2,3,4,5,6,7,8,9]
//  let m = JSON.parse(JSON.stringify(arr))
//  h(arr)
//  function h(arr) {
//      let len = arr.length
//      let k = arr[len-1 ]
//      let a = []
//      let b = []
//      let s = 0
//      a.push(k)
//      for(let i=len-2;i>=0;i--) {
//          if(arr[i]+1 == k) {
//             a.unshift(arr[i])
//             //arr.splice(i,1)
            
//             k= arr[i]
            
//          }
//      }
//      for(let i = 0;i<len;i++) {
//         // if(a.indexOf(arr[i])==-1) {
//         //     b.push(arr[i])
//         // }
//         // console.log(a.indexOf(arr[i]),'a.indexOf(arr[i])')
//      }
//      console.log(a,b,arr,'aa')
     
//  }
// let str = 'abs'

// let mx = str.charAt(2)
// console.log(mx,'mx')
//  let children = [1,2,3,4] 
//  for(let item of children) {
//      console.log(item,'item')
//  }
// let a = {
//     x: 1
// }
// let b = {
//     y: 1,
//     c: {
//         m:3
//     }
// }
// let c = Object.assign(b)
// console.log(c==b,'aaa')
// c.a =2
// console.log(b,'bbbbbb')
// const arr = [1,2,3]
// console.log(Array.isArray(arr))
// Array.isArray(arr) && arr.forEach((item)=>{
//     console.log(item,'item')
// })

// 0 && arr.forEach((item)=>{
//     console.log(item,'itemsss')
// })

// let obj = {
//     a: {
//         b: 1
//     }
// }

// var b = obj.a.b
