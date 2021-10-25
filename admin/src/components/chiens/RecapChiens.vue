<template>
  <div>
    <h1>Récapitulatif</h1>
    {{ this.refuges }}

    <div v-for="item in this.refuges" :key="item">
      <!--<p>{{ item.data[0].refuge }}</p>-->
      <table>
        <thead>
          <tr class="libelle">
            <td>Image</td>
            <td>Name</td>
            <td>Robe</td>
            <td>Sexe</td>
            <td>Test chat</td>
            <td>santé</td>
            <td>Age</td>
            <td>Emplacement</td>
            <td>commentaires</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in this.recap" :key="elem">
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
                @click="trash"
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

export default {
  data() {
    return {
      chiens: store.state.chiens,
      refuges: store.state.refuges,
      recap: store.state.recapchiens,
    };
  },
  components: {},
};
</script>
<style scoped></style>
