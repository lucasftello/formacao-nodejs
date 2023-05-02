<template>
  <div :class="{ 'customer': !customer.premium, 'customer-premium': customer.premium }">
    <h2>{{ customer.name }}</h2>
    <p v-if="showAge">Idade: {{ customer.age }}</p>
    <p v-else>Idade: Menor de idade</p>
    <p>E-mail: {{ customer.email }}</p>
    <p>Número: {{ customer.number }}</p>
    <button @click="changeColor($event)">Mudar cor</button>
    <button @click="deleteEvent">Deletar</button>
  </div>
</template>

<script>
export default {
  props: {
    customer: Object,
    showAge: Boolean
  },
  methods: {
    changeColor($event) {
      console.log($event);
      this.customer.premium = !this.customer.premium;
    },

    deleteEvent() {
      this.$emit('delete', {
        customerId: this.customer.id
      });
    }
  }
}
</script>

<style scoped>
.customer {
  background-color: green;
  padding: 10px;
  margin-top: 30px;
  color: #fff;
}

.customer-premium {
  background-color: gold;
  padding: 10px;
  margin-top: 30px;
  color: #333;
}
</style>
