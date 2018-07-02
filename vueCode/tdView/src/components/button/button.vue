<template>
    <button
        @click="handleClick"
        :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "td-button",
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClick() {
                this.$emit('clicks')
            }
        }
    }
</script>

<style scoped>

</style>
