<template>
  <section class="py-6">
    <div class="container">
      <div class="logo is-flex is-justify-content-center is-align-items-center">
        <img src="./assets/img/logo.svg" alt="Logo Pokedex">
      </div>

      <form class="my-6" @submit="searchPokemons">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Search a pokemon..." v-model="search">
          </div>
          <div class="control">
            <button type="submit" class="button is-danger">Search</button>
          </div>
        </div>
      </form>

      <div class="columns is-multiline">
        <div class="column is-3" v-for="(pokemon, index) in filteredPokemons" :key="pokemon.name">
          <Pokemon :num="index + 1" :name="pokemon.name" :url="pokemon.url" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Pokemon from './components/Pokemon.vue';

export default {
  components: {
    Pokemon
  },
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      search: ''
    }
  },
  async created() {
    await this.getPokemons();
  },
  methods: {
    async getPokemons() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

        this.pokemons = response.data.results;
        this.filteredPokemons = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    searchPokemons(event) {
      event.preventDefault();

      if (!this.search || this.search == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.search.toLocaleLowerCase()));
      }
    }
  },
  computed: {
    // filteredPokemons() {
    //   if (!this.search || this.search === ' ') {
    //     return this.pokemons;
    //   } else {
    //     return this.pokemons.filter(pokemon => pokemon.name === this.search);
    //   }
    // }
  }
}

</script>

<style scoped>
.logo img {
  width: 320px;
}
</style>
