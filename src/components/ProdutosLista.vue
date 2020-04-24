<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div
          v-for="(produto, index) in produtos"
          :key="produto.id + index"
          class="produto"
        >
          <router-link to="/">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtos-total="produtosTotal"
          :produtos-por-pagina="produtosPorPagina"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultado">
          Busca sem Resultados. Tente buscar outro termo.
        </p>
      </div>
      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
import { serialize } from "@/helpers.js";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers["x-total-count"]);
        this.produtos = response.data;
      });
    },
  },

  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  watch: {
    url() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.preco {
  font-weight: bold;
  color: #e80;
}

.produto {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  transition: all 0.2s;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}
.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  z-index: 1;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.sem-resultado {
  text-align: center;
}

.titulo {
  margin-bottom: 10px;
}
</style>
