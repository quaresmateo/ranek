<template>
  <div>
    <ul>
      <li v-for="(pagina, index) in paginasTotal" :key="index">
        <router-link :to="{ query: query(pagina) }">
          {{ pagina }}
        </router-link>
      </li>
    </ul>
  </div>
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
        _page: pagina,
      };
    },
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;

      return total != Infinity ? Math.ceil(total) : 0;
    },
  },
};
</script>

<style></style>
