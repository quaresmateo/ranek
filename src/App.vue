<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    TheFooter: () => import("@/components/TheFooter.vue"),
    TheHeader: () => import("@/components/TheHeader.vue"),
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

body {
  font-family: Avenir, Helvetica, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

img {
  max-width: 100%;
  display: block;
}

ul {
  list-style: none;
}
</style>
