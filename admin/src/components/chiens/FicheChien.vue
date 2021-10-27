<template>
  <div class="fiche">
    <input type="button" value="Retour" @click="retour" />
    <h1>{{ this.fiche.name }}</h1>
    <p>N° de puce: {{ this.fiche.puce }}</p>
    <div id="image">
      <img :src="this.fiche.imageUrl" alt="this.fiche.name" />
    </div>
    <div class="infos">
      <h2>{{ this.fiche.statut }}</h2>
      <p>Box: {{ this.fiche.emplacement }}</p>
      <p>Sexe: {{ this.fiche.sexe }}</p>
      <p>Age: {{ this.fiche.age }}</p>
      <p>Couleur de robe: {{ this.fiche.robe }}</p>
      <p>Test chat: {{ this.fiche.chat }}</p>
      <p>Etat de santé: {{ this.fiche.sante }}</p>
      <p>Commentaires: {{ this.fiche.description }}</p>
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
  width: 80%;
  font-weight: bold;
  margin: auto;
  & #image {
    height: 300px;
    margin: auto;
    object-fit: cover;
    & img {
      height: 100%;
    }
  }
  & .infos {
    display: flex;
    flex-direction: column;

    & p {
      margin: auto;
    }
  }
}
</style>
