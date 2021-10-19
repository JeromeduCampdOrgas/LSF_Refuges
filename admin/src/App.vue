<template>
  <div class="b-container">
    <Header />
    <div id="nav">
      <div id="burger" @click="menuvisibility">
        <img
          class="icons"
          src="@/assets/icons/menu.svg"
          alt="menu"
          title="Modifier"
        />
      </div>
      <div id="mobileMenu" v-if="this.menuVisible">
        <!--v-if="this.setUserLogged"-->
        <router-link to="/" @click="deconnect">Déconnexion</router-link>
        <router-link to="/AllProducts">Tous les produits</router-link>

        <router-link to="/recapitulatif" @click="recapitulatif"
          >Récapitulatif</router-link
        ><!--v-if="this.userLoggedIn.isAdmin"-->
        <router-link to="/creation" v-if="this.userLoggedIn.isAdmin"
          >Nouveau produit</router-link
        >
        <router-link to="/utilisateurs" @click="getusers"
          >Admin utilisateurs</router-link
        ><!--v-if="this.userLoggedIn.isAdmin"-->
      </div>

      <div id="desktopMenu">
        <router-link to="/" @click="deconnect">Déconnexion</router-link
        ><!--v-if="this.setUserLogged"-->
        <router-link to="/AllProducts">Tous les produits</router-link
        ><!--v-if="this.setUserLogged"-->

        <router-link to="/recapitulatif" @click="recapitulatif"
          >Récapitulatif</router-link
        ><!--v-if="this.userLoggedIn.isAdmin"-->

        <router-link to="/creation">Nouveau produit</router-link
        ><!--v-if="this.userLoggedIn.isAdmin"-->
        <router-link to="/utilisateurs" @click="getusers"
          >Admin utilisateurs</router-link
        ><!--v-if="this.userLoggedIn.isAdmin"-->
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header.vue";
//import Footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Header,
    //Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
