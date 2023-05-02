<template>
  <main>
    <h1>Guia Clientes</h1>

    <form @submit="addCustomer">
      <small v-show="errorMsg">{{ errorMsg }}</small><br>
      <input type="text" name="name" id="name" placeholder="Nome" v-model="nameField"><br>
      <input type="number" name="age" id="age" placeholder="Idade" v-model="ageField"><br>
      <input type="email" name="email" id="email" placeholder="E-mail" v-model="emailField"><br>
      <input type="text" name="number" id="number" placeholder="Número" v-model="numberField"><br>
      <button type="submit">Cadastrar</button>
    </form>

    <Customer v-for="customer in orderCustomers" :key="customer.id" :customer="customer" :showAge="customer.age >= 18"
      @delete="deleteCustomer($event)" />
  </main>
</template>

<script>
import _ from 'lodash';
import Customer from './components/Customer.vue';
import Product from './components/Product.vue';

export default {
  name: 'App',
  components: {
    Customer,
    Product
  },
  data() {
    return {
      nameField: '',
      ageField: '',
      emailField: '',
      numberField: '',
      errorMsg: '',
      customers: [
        {
          id: 12,
          name: 'Lucas Tello',
          age: 16,
          email: 'lucas@email.com',
          number: '(14) 99999-9999',
          premium: false
        },
        {
          id: 2,
          name: 'Tiago Tello',
          age: 18,
          email: 'tiago@email.com',
          number: '(14) 88888-9999',
          premium: true
        },
        {
          id: 3,
          name: 'Roger KN',
          age: 14,
          email: 'roger@email.com',
          number: '(14) 77777-9999',
          premium: false
        },
        {
          id: 11,
          name: 'Marli Thomaz',
          age: 22,
          email: 'marli@email.com',
          number: '(14) 55555-9999',
          premium: true
        },
        {
          id: 17,
          name: 'Silvio Tello',
          age: 22,
          email: 'silvio@email.com',
          number: '(14) 44444-9999',
          premium: true
        }
      ]
    }
  },
  methods: {
    addCustomer(event) {
      event.preventDefault();

      if (!this.nameField || this.nameField == ' ' || this.nameField.length < 3) {
        this.errorMsg = 'O nome é inválido';
        return;
      }

      const data = {
        id: Date.now(),
        name: this.nameField,
        age: this.ageField,
        email: this.emailField,
        number: this.numberField,
        premium: false
      };

      this.customers.push(data);

      this.nameField = '';
      this.ageField = '';
      this.emailField = '';
      this.numberField = '';
      this.errorMsg = '';
    },

    deleteCustomer($event) {
      const filteredCustomers = this.customers.filter(customer => customer.id != $event.customerId);

      this.customers = filteredCustomers;
    }
  },
  computed: {
    orderCustomers() {
      return _.orderBy(this.customers, ['name'], ['asc']);
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

small {
  color: red;
}
</style>
