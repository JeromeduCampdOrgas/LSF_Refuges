<template>
  <div class="fiche">
    <div id="title">
      <div id="retour">
        <img
          src="https://img.icons8.com/color/48/000000/arrow-pointing-left--v3.png"
          @click="retour"
        />
      </div>
      <h1>
        <!--<input type="button" value="" @click="retour" />-->
        {{ this.fiche.name }}
      </h1>
    </div>
    <p>N° de puce: {{ this.fiche.puce }}</p>
    <div id="image">
      <img :src="this.fiche.imageUrl" alt="this.fiche.name" />
    </div>
    <div class="infos">
      <h2>{{ this.fiche.statut }}</h2>
      <p>
        Box: <span>{{ this.fiche.emplacement }}</span>
      </p>
      <p>
        Sexe: <span>{{ this.fiche.sexe }}</span>
      </p>
      <p>
        Age: <span>{{ this.fiche.age }}</span>
      </p>
      <p>
        Couleur de robe: <span>{{ this.fiche.robe }}</span>
      </p>
      <p>
        Test chat: <span>{{ this.fiche.chat }}</span>
      </p>
      <p>
        Etat de santé: <span>{{ this.fiche.sante }}</span>
      </p>
      <p id="comment">
        Commentaires: <span>{{ this.fiche.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "fiche",
  data() {
    return {
      fiche: store.state.onechien,
    };
  },
  methods: {
    retour() {
      this.$router.push(this.$store.state.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.fiche {
  width: 40%;
  font-weight: bold;
  margin: 20px auto;
  & #title {
    display: flex;

    & img {
      height: 30px;
      left: 0;
    }
    & img:hover {
      transform: translateX(-3px);
    }
    & h1 {
      margin: auto;
    }
  }
  & #image {
    height: 300px;
    margin-bottom: 15px;
    object-fit: cover;
    border-radius: 5px;
    & img {
      border-radius: 5px;
      height: 100%;
    }
  }
  & .infos {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 68%;
    border-radius: 5px;
    background: #eee;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
    & p {
      margin: auto;
      & span {
        font-weight: normal;
      }
    }
    & #comment {
      margin-top: 10px;
      padding: 10px;
      width: 95%;
      background: #fff;
      border-radius: 15px;

      overflow-wrap: break-word;
    }
  }
}
</style>
