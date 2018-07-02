<template>
    <div id="app">
        <img src="./assets/logo.png">
        <br>
        <br>
        <br>
        <td-button
            :disabled="false"
            @clicks="buttonClick">UI TEST</td-button>
        <br>
        <br>
        <br>
        <td-input></td-input>
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods: {
            buttonClick() {
                console.log(`ui test`);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
