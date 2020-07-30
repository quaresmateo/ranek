<template>
  <transition mode="out-in">
    <section>
      <div v-if="produto" class="produto">
        <ul class="fotos" v-if="produto.fotos">
          <li v-for="(foto, index) in produto.fotos" :key="index">
            <img :src="foto.src" :alt="foto.titulo" />
          </li>
        </ul>
        <div class="info">
          <h1>{{ produto.nome }}</h1>
          <p class="preco">{{ produto.preco | numeroPreco }}</p>
          <p class="descricao">{{ produto.descricao }}</p>
          <transition v-if="produto.vendido === 'false'" mode="out-in">
            <button class="btn" v-if="!finalizar" @click="finalizar = true">
              Comprar
            </button>
            <FinalizarCompra v-else :produto="produto" />
          </transition>
          <button v-else class="btn btn-disabled" disabled>
            Produto Vendido
          </button>
        </div>
      </div>
      <PaginaCarregando v-else />
    </section>
  </transition>
</template>

<script>
import { api } from "@/services.js";
import FinalizarCompra from "@/components/FinalizarCompra.vue";
export default {
  name: "Produto",
  components: {
    FinalizarCompra,
  },
  props: ["id"],
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  methods: {
    getProduto() {
      api.get(`/produto/${this.id}`).then((response) => {
        this.produto = response.data.produto;
        document.title = this.produto.nome;
      });
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style scoped>
img {
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

.descricao {
  font-size: 1.3rem;
}

.fotos {
  grid-row: 1/3;
}

.info {
  position: sticky;
  top: 20px;
}

.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }

  .fotos {
    grid-row: 2;
  }

  .info {
    position: initial;
  }
}

.preco {
  color: #ee8800;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}
</style>
