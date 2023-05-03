<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-128x128 m-auto">
        <img :src="currentSprite" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content has-text-centered">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ capitalizeName }}</p>
          <p class="tag is-warning">{{ pokemon.type }}</p>
        </div>
      </div>
      <div class="content">
        <button class="button is-small" @click="changeSprite">Change sprite</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'PokemonItem',
  props: {
    num: Number,
    name: String,
    url: String
  },
  data() {
    return {
      pokemon: {
        type: null,
        sprites: {
          front: null,
          back: null
        }
      },
      isFront: true,
      currentSprite: null
    }
  },
  async created() {
    await this.getPokemonInfo();
  },
  methods: {
    async getPokemonInfo() {
      try {
        const response = await axios.get(this.url);

        this.pokemon.type = response.data.types[0].type.name;
        this.pokemon.sprites.front = response.data.sprites.front_default;
        this.pokemon.sprites.back = response.data.sprites.back_default;
        this.currentSprite = this.pokemon.sprites.front;
      } catch (error) {
        console.error(error);
      }
    },

    changeSprite() {
      if (this.isFront) {
        this.isFront = false;
        this.currentSprite = this.pokemon.sprites.back;
      } else {
        this.isFront = true;
        this.currentSprite = this.pokemon.sprites.front;
      }
    }
  },
  computed: {
    capitalizeName() {
      return this.name[0].toUpperCase() + this.name.slice(1);
    }
  }
}
</script>

<style scoped></style>