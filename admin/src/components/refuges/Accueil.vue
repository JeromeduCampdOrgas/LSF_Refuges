<template>
  <div>
    <div>
      <h1>Tous les Refuges</h1>
    </div>
    <div class="container">
      <!--v-show="isVisible"-->
      <div
        class="product-categorie"
        v-for="item of this.accueilPage"
        v-bind:key="item"
        @click="pageRecap"
      >
        <div class="image">
          <img :src="item.imageUrl" :alt="item.refuge" />
        </div>

        <p>{{ item.refuge }}</p>
      </div>
    </div>
    {{ this.refuges }}
  </div>
</template>

<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

export default {
  data() {
    return {
      accueilPage: [],
      imageUrl: [],
      isVisible: true,
      refuges: store.state.refuges,
      chiens: store.state.chiens,
      //produits: [],
    };
  },
  methods: {
    pageAccueil() {
      for (let refuge of this.refuges) {
        const found = this.chiens.find((element) => element.refuge == refuge);
        this.accueilPage.push(found);
        this.imageUrl.push(found.imageUrl);
        store.dispatch("getAccueilPage", this.accueilPage);
      }
    },
    pageRecap(e) {
      let refuge = e.target.alt;
      configAxios.get(`refuges/${refuge}`).then((res) => {
        store.dispatch("getRecapChiens", res.data);
        this.$router.push(refuge);
      });
    },
  },
  beforeMount() {
    this.pageAccueil();
  },

  computed: {
    userLoggedIn() {
      return store.state.userLoggedIn;
    },

    setRefuges() {
      return this.$store.state.refuges;
    },
    setChiens() {
      return this.$store.state.chiens;
    } /*

    setAccueilPage() {
      return this.$store.state.accueil;
    },
    setNbProducts() {
      return store.state.pageProduits.length;
    },*/,
  },
};
</script>

<style lang="scss">
#test {
  width: 50px;
  height: 50px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.form {
  text-align: center;
}
.product-categorie {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 15px auto;
  width: 80%;

  & .image {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  & p {
    font-weight: bold;
  }
}
.product-categorie:hover {
  cursor: pointer;
}
@media only screen and (min-width: 768px) {
  .container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    width: 100%;
    & .product-categorie {
      width: 30%;
      margin: 15px auto;
      border: 2px lightgray solid;
      box-shadow: 2px 2px #9667da;
    }
  }
}
</style>
