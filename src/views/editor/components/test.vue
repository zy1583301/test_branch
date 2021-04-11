<template>
    <div>
        哈哈
    </div>
</template>
<script>

export default {
    data() {

    },
    created() {
        import('ofd.js').then(({parseOfdDocument, renderOfd})=>{
            console.log(parseOfdDocument, renderOfd,'parseOfdDocument, renderOfd')
        })
    }
}
</script>