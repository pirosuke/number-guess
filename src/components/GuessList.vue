<template>
    <ul class="guess-list">
        <li class="guess win" v-if="hasWon">あたり！こたえは {{ answerNumber }} でした。<a href="#" v-on:click="onResetGame">もういっかいあそぶ？</a></li>
        <li class="guess miss" v-for="(message, index) in guessMessageList" v-bind:key="index">{{ message }}</li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GuessList extends Vue {
    get guessMessageList() {
        const guessList = this.$store.getters.getGuessList();
        const answerNumber = this.$store.getters.getAnswerNumber();
        const guessMessageList: string[] = [];
        for (const guess of guessList) {
            if (guess > answerNumber) {
                guessMessageList.push('ぶぶー！ ' + guess + ' よりちいさいよ');
            } else {
                guessMessageList.push('ぶぶー！ ' + guess + ' よりおおきいよ');
            }
        }

        return guessMessageList.reverse();
    }

    get hasWon() {
        return this.$store.getters.hasWon();
    }

    get answerNumber() {
        return this.$store.getters.getAnswerNumber();
    }

    public onResetGame(event: Event) {
        this.$store.dispatch('resetGame');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.guess-list {
    list-style-type: none;
}

.guess-list .guess {
    margin-bottom: 3px;
}

.guess-list .miss {
    color: #c00;
}

.guess-list .win {
    color: #030;
}
</style>
