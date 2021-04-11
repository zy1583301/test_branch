<template>
    <div>
        <input type="text" v-model="value">
        <button @click="confirm">确认</button>
        <!-- {{$route.query}}$route.query -->
    </div>
</template>

<script>
export default {
    components:{},
    data() {
        return {
            value: null
        }
    },
    created() {
        console.log(this.$route.query)
    },
    methods: {
        confirm() {
            if(!this.value) return;
            this.$router.push({path: '/qrcode/result', query: {
                name: this.$route.query.name,
                value: this.value
            }});
        }
    }
}
</script>
