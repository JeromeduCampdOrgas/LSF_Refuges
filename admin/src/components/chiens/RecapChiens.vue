<template>
  <div>
    <h1>Récapitulatif {{ this.selectedRefuge }}</h1>
    <div id="compta">
      <div id="nombres">
        <p>Nombre de chiens: {{ this.recap.length }}</p>
        <p>Réservés: {{ reserves.length }}</p>
        <p>Optionnés: {{ optionnes.length }}</p>
      </div>
      <div id="detail">
        <p>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="lesReserves"
          >
            Les réservés
          </button>
        </p>
        <p>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="lesOptionnes"
          >
            Les optionnés
          </button>
        </p>
      </div>
    </div>
    <div id="tableau">
      <table>
        <thead>
          <tr class="libelle">
            <th class="statut">Statut</th>
            <th class="image">Image</th>
            <th class="name">Name</th>
            <th class="robe">Robe</th>
            <th class="sexe">Sexe</th>
            <th class="chat">Test chat</th>
            <th class="sante">Santé</th>
            <th class="age">Age</th>
            <th class="box">Box</th>
            <th class="comment">commentaires</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in this.recap" :key="elem">
            <td class="statut">{{ elem.statut }}</td>
            <td class="image"><img :src="elem.imageUrl" alt="" /></td>
            <td class="name">{{ elem.name }}</td>
            <td class="robe">{{ elem.robe }}</td>
            <td class="sexe">{{ elem.sexe }}</td>
            <td class="chat">{{ elem.chat }}</td>
            <td class="sante">{{ elem.sante }}</td>
            <td class="age">{{ elem.age }}</td>
            <td class="box">{{ elem.emplacement }}</td>
            <td class="comment">{{ elem.description }}</td>
            <td class="statut">
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
                @click="updateModale"
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

    <updateModal
      v-bind:updateDogRevele="updateDogRevele"
      v-bind:toggleUpdate="toggleUpdate"
      v-bind:updateClose="updateClose"
    ></updateModal>
  </div>
</template>
<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";
import updateModal from "./updateDogModal.vue";
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
      updateDogRevele: false,
      lesreserves: [],
      lesoptionnes: [],
    };
  },
  components: { updateModal },
  methods: {
    lesReserves() {
      let page = window.location.pathname;
      store.dispatch("getPage", page);
      for (let i = 0; i < this.$store.state.recapchiens.length; i++) {
        if (this.$store.state.recapchiens[i].statut == "Réservé") {
          this.lesreserves.push(this.$store.state.recapchiens[i]);
        }
      }
      store.dispatch("getReserves", this.lesreserves);
      this.$router.push("reserves");
    },
    lesOptionnes() {
      let page = window.location.pathname;
      store.dispatch("getPage", page);
      for (let i = 0; i < this.$store.state.recapchiens.length; i++) {
        if (this.$store.state.recapchiens[i].statut == "Optionné") {
          this.lesoptionnes.push(this.$store.state.recapchiens[i]);
        }
      }
      store.dispatch("getOptionnes", this.lesoptionnes);
      this.$router.push("optionnes");
    },
    updateModale: function(e) {
      let chienToUpdate =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;

      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToUpdate) {
          this.chienId = this.recap[i]._id;
        }
      }
      configAxios.get(`chien/${this.chienId}`).then((res) => {
        store.dispatch("getChienToUpdate", res.data);
      });

      this.updateDogRevele = !this.updateDogRevele;
    },
    updateClose: function() {
      this.updateDogRevele = false;
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
      let page = window.location.pathname;
      store.dispatch("getPage", page);
      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToUpdate) {
          this.chienId = this.recap[i]._id;
        }
      }
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
  computed: {
    reserves() {
      return this.recap.filter((item) => item.statut == "Réservé");
    },
    optionnes() {
      return this.recap.filter((item) => item.statut == "Optionné");
    },
  },
};
</script>
<style lang="scss">
h1 {
  margin: 20px;
}
#compta {
  display: flex;
  justify-content: space-between;
  width: 35%;
  margin: auto;
  padding: 5px;
  background: #eee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  border-radius: 5px;

  & p {
    font-weight: bold;
  }
  & #nombres,
  #detail {
    padding: 5px;
  }
  & #nombres {
    flex-grow: 2;
  }
  & #detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
#tableau {
  margin-top: 20px;
  table {
    min-width: 98%;
    margin: auto;
    & thead {
      font-weight: bold;
      background: linear-gradient(rgb(243, 233, 241), #9667da);
    }
    & .icons {
      cursor: pointer;
      margin: 5px;
    }
  }
}
table,
th,
td {
  border: 1px black solid;
  border-collapse: collapse;
  table-layout: fixed;
}
.image {
  width: 100px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.comment {
  max-width: 200px;
  overflow-wrap: break-word;
}
</style>
