<template>
    <ul class="number-list">
        <li class="number-item" v-for="item in numberItemList" v-bind:key="item.value">
            <a href="#" v-on:click="onGuess(item.value)" v-bind:class="'number' + (item.isGuessed ? ' miss' : '')">{{ item.value }}</a>
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NumberList extends Vue {
    get numberItemList() {
        return this.$store.getters.getNumberItemList();
    }

    public onGuess(guess: number) {
        this.$store.dispatch('addGuess', guess);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.number-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 500px;
    margin: auto;
}

.number-list .number-item {
    display: block;
    width: 40px;
    height: 40px;
    border: 1px solid #666;
    margin: 2px;
}

.number-list .number {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
    color: #000;
}

.number-list .miss {
    background-color: #c66;
    color: #fff;
}

.number-list .win {
    background-color: #363;
    color: #fff;
}
</style>
