<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "App",
  components: {
    TheFooter: () => import("@/components/TheFooter.vue"),
    TheHeader: () => import("@/components/TheHeader.vue"),
  },
  created() {
    if (window.localStorage.token) {
      api
        .validateToken()
        .then(() => {
          this.$store.dispatch("getUsuario");
        })
        .catch(() => {
          window.localStorage.removeItem("token");
        });
    }
  },
};
</script>

<style>
@font-face {
  font-family: Avenir;
  src: url("./assets/Avenir/Avenir-Medium.otf");
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}

a {
  color: #345;
  text-decoration: none;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3;
  border: none;
  font-family: Avenir, Helvetica, sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled {
  background: #bbc;
  transform: scale(1);
}

body {
  font-family: Avenir, Helvetica, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

img {
  max-width: 100%;
  display: block;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid white;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin-bottom: 15px;
  padding: 15px;
  transition: all 0.3s;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  border-color: #87f;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  outline: none;
  transform: scale(1.1);
}

label {
  margin-bottom: 5px;
}

ul {
  list-style: none;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
