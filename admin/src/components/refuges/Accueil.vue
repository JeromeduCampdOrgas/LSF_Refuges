<template>
  <div>
    <div>
      <h1>Tous les Refuges</h1>
      <!--{{ this.accueilPage }}
      {{ this.accueilPage }}
      
      {{ this.setChiens }}-->
      <button @click="test">test</button>
    </div>
    <div class="container">
      <!--v-show="isVisible"-->
      <div
        class="product-categorie"
        v-for="item of this.accueilPage"
        v-bind:key="item"
        @click="pageProduits"
      >
        <div class="image">
          <img :src="item.imageUrl" :alt="item.refuge" />
        </div>
        <p>{{ item.refuge }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
//import configAxios from "../../axios/configAxios";

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
    test() {
      for (let refuge of this.$store.state.chiens) {
        const found = this.setChiens.find((element) => element == refuge);
        this.accueilPage.push(found);
        this.imageUrl.push(found.imageUrl);
        store.dispatch("getAccueilPage", this.accueilPage);
      }
      console.log(this.accueilPage);
    },
    /*pageProduits(e) {
      //this.isVisible = !this.isVisible;
      let categorie = e.target.alt;
      configAxios
        .get(`categories/${categorie}`)
        .then((res) => {
          console.log(res.data);
          store.dispatch("getPageProduits", res.data);
          store.dispatch("getSelectedCategorie", categorie);
          this.$router.push(categorie);
          //return store.state.selectedCategorie;
        })
        .catch((err) => err);
    },*/
    pageAccueil() {
      for (let refuge of this.setRefuges) {
        const found = this.setChiens.find(
          (element) => element.refuge == refuge
        );
        this.accueilPage.push(found);
        this.imageUrl.push(found.imageUrl);
        store.dispatch("getAccueilPage", this.accueilPage);
      }
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
