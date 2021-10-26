<template>
  <div>
    <h1>Récapitulatif</h1>

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
            <td>santé</td>
            <td>Age</td>
            <td>Emplacement</td>
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
                @click="edit"
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
      recap: store.state.recapchiens,
      chienId: "",
    };
  },
  components: {},
  methods: {
    supprimer: function(e) {
      let chienToDelete =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      let refuge = this.refuges[0].refuge;
      for (let i = 0; i < this.recap.length; i++) {
        if (this.recap[i].name == chienToDelete) {
          this.chienId = this.recap[i]._id;
        }
      }
      configAxios
        .delete(`chien/${this.chienId}`)
        .then(() =>
          configAxios
            .get(`chien`)
            .then((res) =>
              store
                .dispatch("getChiens", res.data)
                .then(() =>
                  configAxios
                    .get(`refuges/${refuge}`)
                    .then((res) => store.dispatch("getRecapChiens", res.data))
                )
            )
        );
      e.target.parentNode.parentNode.remove();
    },
  },
};
</script>
<style lang="scss">
table {
  width: 95%;
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
