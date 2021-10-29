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
        <router-link to="/" @click="deconnect" v-if="this.setUserLogged"
          >Déconnexion</router-link
        >
        <router-link to="/Accueil" v-if="this.setUserLogged"
          >Accueil</router-link
        >

        <!---->
        <span v-if="this.setUserLogged" @click="toggleModale"
          >Nouveau chien</span
        >
        <span @click="userModale" v-if="this.userLoggedIn.isAdmin"
          >Admin utilisateurs</span
        ><!---->
      </div>

      <div id="desktopMenu">
        <router-link to="/" @click="deconnect" v-if="this.setUserLogged"
          >Déconnexion</router-link
        ><!---->
        <router-link to="/Accueil" v-if="this.setUserLogged"
          >Accueil</router-link
        ><!---->

        <span v-if="this.setUserLogged" @click="toggleModale"
          >Nouveau chien</span
        >
        <!---->
        <span @click="userModale" v-if="this.userLoggedIn.isAdmin"
          >Admin utilisateurs</span
        ><!---->
      </div>
      <dogModale
        v-bind:createDogRevele="createDogRevele"
        v-bind:toggleModale="toggleModale"
        v-bind:toggleClose="toggleClose"
      ></dogModale>
      <userModale v-bind:userRevele="userRevele" v-bind:userModale="userModale">
      </userModale>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import store from "./store/index";
import dogModale from "./components/chiens/createDogModal.vue";
import userModale from "./components/user/UserModalForm.vue";

import configAxios from "../src/axios/configAxios";

//import Footer from "./components/footer.vue";

export default {
  name: "App",
  data() {
    return {
      menuVisible: false,
      refuges: store.state.refuges,
      dogs: store.state.chiens,
      chiens: [],
      token: localStorage.getItem("token"),
      /*****props */
      createDogRevele: false,
      userRevele: false,
    };
  },
  components: {
    Header,
    dogModale,
    userModale,

    //Footer,
  },
  methods: {
    deconnect: function() {
      localStorage.clear();
      window.location.replace("/");
    },
    menuvisibility() {
      this.menuVisible = !this.menuVisible;
    },
    toggleModale: function() {
      this.createDogRevele = !this.createDogRevele;
    },
    toggleClose: function() {
      this.createDogRevele = false;
    },
    userModale: function() {
      this.userRevele = !this.userRevele;
    },
    recapitulatif: async function() {
      for (let i = 0; i < this.$store.state.refuges.length; i++) {
        let refuge = new Array();
        let recapchien = await configAxios.get(
          `refuges/${this.$store.state.refuges[i]}`
        );
        //console.log(categorie);
        refuge[i] = this.$store.state.refuges[i]; //(
        refuge[i] = recapchien;

        this.chiens.push(refuge[i]);
      }
      store.dispatch("getRecapChiens", this.chiens);
    },
  },
  computed: {
    setUserLogged() {
      return store.state.userLogged;
    },
    userLoggedIn() {
      return store.state.userLoggedIn;
    },

    setRefuges() {
      return this.$store.state.refuges;
    },
    setChiens() {
      return this.$store.state.chiens;
    },

    setAccueilPage() {
      return this.$store.state.accueilPage;
    },
    /*setNbProducts() {
      return store.state.pageProduits.length;
    },
    setModifs() {
      return store.state.thisSelectedProduct;
    },*/
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin: auto;
  width: 100vh;
}
/********MENU/NAVIGATION ***********/
li {
  list-style: none;
  text-align: center;
}
#nav {
  padding: 5px;
  width: 98%;
  margin: auto;
  background: linear-gradient(rgb(243, 233, 241), #9667da);
  & a,
  span {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    margin: auto 25px;
    padding: 5px;
    &.router-link-exact-active {
      color: white;
    }
  }
  & a:hover,
  span:hover {
    background: #ddd;
  }

  & #mobileMenu {
    display: flex;
    flex-direction: column;
  }
  &#desktopMenu {
    display: none;
  }
}

/************************ */
@media screen and(min-width: 768px) {
  #app {
    width: 100%;
  }
  #burger {
    display: none;
    & #mobileMenu {
      display: none;
    }
  }
}
@media screen and(max-width: 768px) {
  #desktopMenu {
    display: none;
  }
}
/****************** */
</style>
