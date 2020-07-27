<template>
  <ul v-if="paginasTotal">
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProdutosPaginar",
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      const currentQuery = this.$route.query;
      return {
        ...currentQuery,
        page: pagina,
      };
    },
  },
  computed: {
    paginas() {
      const current = this.$route.query._page;
      const range = 9;
      const offset = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },

    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;

      return total != Infinity ? Math.ceil(total) : 0;
    },
  },
};
</script>

<style scoped>
li {
  display: inline-block;
}

li a {
  padding: 5px 8px 3px 8px;
  border-radius: 4px;
  margin: 4px;
}

li a.router-link-exact-active {
  background: #87f;
  color: #fff;
}

li a:hover {
  background: #a9f;
  color: #fff;
}

ul {
  grid-column: 1/-1;
}
</style>
