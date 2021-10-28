<template>
  <div>
    <div id="title">
      <div id="retour">
        <img
          src="https://img.icons8.com/color/48/000000/arrow-pointing-left--v3.png"
          @click="retour"
        />
      </div>
      <h1>Les optionnés de {{ this.refuge }}</h1>
    </div>
    <div id="tableau">
      <table>
        <thead>
          <tr class="libelle">
            <th class="image">Image</th>
            <th class="name">Name</th>
            <th class="robe">Robe</th>
            <th class="sexe">Sexe</th>
            <th class="chat">Test chat</th>
            <th class="sante">Santé</th>
            <th class="age">Age</th>
            <th class="box">Box</th>
            <th class="comment">commentaires</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in this.optionnes" :key="elem">
            <td class="image"><img :src="elem.imageUrl" alt="" /></td>
            <td class="name">{{ elem.name }}</td>
            <td class="robe">{{ elem.robe }}</td>
            <td class="sexe">{{ elem.sexe }}</td>
            <td class="chat">{{ elem.chat }}</td>
            <td class="sante">{{ elem.sante }}</td>
            <td class="age">{{ elem.age }}</td>
            <td class="box">{{ elem.emplacement }}</td>
            <td class="comment">{{ elem.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
      page: store.state.page,
      refuge: store.state.selectedRefuge,
      optionnes: store.state.optionnes,
    };
  },
  methods: {
    retour() {
      this.$router.push(this.page);
    },
  },
};
</script>

<style lang="scss">
#title {
  display: flex;
  width: 98%;
  margin: 20px auto;

  & img {
    height: 30px;
  }
  & img:hover {
    transform: translateX(-3px);
  }
  & h1 {
    margin: auto;
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
