<template>
    <div class='grid'>
        <div class="grid-row">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
        </div>
    </div>
</template>
<script>
    //将字符串分割成斐波那契数列
    // 1 1 2 3 5 8 13 21 34 55 89 144 
    // fn-2 + fn-1 = fn
    let str = '123345468' // 123345468
    function fbnq(str) {
        //切割字符串

    }
// let arr = [
//     {
//         len: 344,
//         num: 3
//     },{
//         len: 444,
//         num: 3
//     },{
//         len: 555,
//         num: 6
//     },{
//         len: 545,
//         num: 8
//     },{
//         len: 54,
//         num: 10
//     },{
//         len: 99,
//         num: 60
//     },{
//         len: 1110,
//         num: 10
//     },{
//         len: 1000,
//         num: 2
//     },{
//         len:602,
//         num: 3
//     },
// ]
// arr.sort((a,b)=>{
//     return a.len - b.len
// })

// let reArr = []
// arr.forEach(item=>{
//     for(let i=0;i<item.num;i++) {
//         reArr.push(item.len)
//     }
// })

// let leng = 0
// let space = 4
// let zuhe = []
// let zuhe1 = []
// reArr.forEach((item,index)=>{
//     leng+=item
//     leng+=space
//     if(leng<=2440 && reArr[index+1]) {
//         zuhe1.push(item)
//     } else if(leng<=2440 && !reArr[index+1]){
//         zuhe1.push(item)
//         zuhe.push(zuhe1)
//     }else{
//         zuhe.push(zuhe1)
//         zuhe1 = []
//         leng = 0
//         leng+=item
//         leng+=space
//         zuhe1.push(item)
//     }
// })

// console.log(zuhe,'zuhe')
export default {
components:{}
}
</script>

<style lang="less" scoped>
.grid {
    width: 600px;
    height: 100%;
    .grid-row {
        width:300px;
        height:300px;
        ul {
            list-style: none;
            li {
                width: 100px;
                height: 100px;
            }
        }
    }
}

</style>
