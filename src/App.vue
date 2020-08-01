<template>
  <div id="app">
    <header class="app-header">
      <h1 class="app-title">かずあてゲーム</h1>
    </header>
    <p class="app-intro">
      1つすうじをえらんだよ。どのすうじかあててみてね。
    </p>

    <NumberList />

    <GuessList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberList from './components/NumberList.vue';
import GuessList from './components/GuessList.vue';

@Component({
  components: {
    NumberList,
    GuessList,
  },
})
export default class App extends Vue {
  public created() {
    this.$store.dispatch('resetGame');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-header {
  background-color: #222;
  padding: 10px;
  color: white;
}

.app-title {
  font-size: 1.5em;
}

.app-intro {
  font-size: large;
}
</style>
