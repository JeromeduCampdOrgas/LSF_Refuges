<template>
  <div>
    <h1>Récapitulatif {{ this.selectedRefuge }}</h1>

    <div>
      <!--<p>{{ item.data[0].refuge }}</p>-->
      <table>
        <thead>
          <tr class="libelle">
            <td>Statut</td>
            <td>Image</td>
            <td>Name</td>
            <td>Robe</td>
            <td>Sexe</td>
            <td>Test chat</td>
            <td>Santé</td>
            <td>Age</td>
            <td>Box</td>
            <td>commentaires</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in this.recap" :key="elem">
            <td>{{ elem.statut }}</td>
            <td class="image"><img :src="elem.imageUrl" alt="" /></td>
            <td>{{ elem.name }}</td>
            <td>{{ elem.robe }}</td>
            <td>{{ elem.sexe }}</td>
            <td>{{ elem.chat }}</td>
            <td>{{ elem.sante }}</td>
            <td>{{ elem.age }}</td>
            <td>{{ elem.emplacement }}</td>
            <td>{{ elem.description }}</td>
            <td>
              <img
                class="icons"
                src="../../../public/img/eye.svg"
                alt="see"
                title="Voir"
                width="30"
                @click="voirFiche"
              />
              <img
                class="icons"
                src="../../../public/img/edit.svg"
                alt="edit"
                title="Modifier"
                width="30"
                @click="modifier"
              />
              <img
                class="icons"
                src="../../../public/img/trash.svg"
                alt="trash"
                title="Supprimer"
                width="30"
                @click="supprimer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="test">test</button>
  </div>
</template>
<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

export default {
  data() {
    return {
      chiens: store.state.chiens,
      refuges: store.state.refuges,
      selectedRefuge: store.state.selectedRefuge,
      recap: store.state.recapchiens,
      chienId: "",
      chienImage: "",
      page: "",
    };
  },
  components: {},
  methods: {
    test() {
      const queryString = window.location.pathname;
      console.log(queryString);
      console.log(window.location.pathname);
    },
    supprimer: function(e) {
      let chienToDelete =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      let refuge = this.refuges[0].refuge;

      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToDelete) {
          this.chienId = this.recap[i]._id;
          this.chienImage = this.recap[i].imageUrl;
        }
      }
      configAxios.delete(`chien/${this.chienId}`).then(() =>
        configAxios.get(`chien`).then((res) =>
          store.dispatch("getChiens", res.data).then(() =>
            configAxios.get(`refuges/${refuge}`).then((res) => {
              store.dispatch("getRecapChiens", res.data);
            })
          )
        )
      );

      e.target.parentNode.parentNode.remove();
      if (this.recap.length <= 1) {
        const index = this.refuges.indexOf(this.selectedRefuge);
        if (index > -1) {
          this.refuges.splice(index, 1);
        }
        store.dispatch("getRefuges", this.refuges);
        this.$router.push("/accueil");
      }
    },
    modifier: function(e) {
      let chienToUpdate =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      //let refuge = this.refuges[0].refuge;
      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToUpdate) {
          this.chienId = this.recap[i]._id;
        }
      }
      console.log(this.chienId);
    },
    voirFiche: function(e) {
      let chienToUpdate =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      let page = window.location.pathname;
      store.dispatch("getPage", page);
      //let refuge = this.refuges[0].refuge;
      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToUpdate) {
          this.chienId = this.recap[i]._id;
        }
      }
      configAxios.get(`chien/${this.chienId}`).then((res) => {
        store.dispatch("getOneChiens", res.data);
        this.$router.push("fiche");
      });
    },
  },
};
</script>
<style lang="scss">
table {
  width: 95%;
  margin: auto;
  & thead {
    font-weight: bold;
    background: linear-gradient(rgb(243, 233, 241), #9667da);
  }
  & .icons {
    cursor: pointer;
  }
}
table,
td {
  border: 1px black solid;
  border-collapse: collapse;
}
.image {
  width: 100px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
