<template>
  <div class="bloc-modale" v-if="userRevele" data-backdrop="static">
    <div class="overlay" @click="userModale"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="userModale">X</div>
      <h1>Utilisateurs</h1>
      <table>
        <thead>
          <tr class="libelle">
            <th class="pseudo">Pseudo</th>
            <th class="email">Email</th>
            <th class="isAdmin">Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elem in this.users" :key="elem">
            <td class="pseudo">{{ elem.pseudo }}</td>
            <td class="email">{{ elem.email }}</td>
            <td class="isAdmin">{{ elem.isAdmin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import store from "../../store/index";

export default {
  name: "userModale",
  props: ["userRevele", "userModale"],

  data() {
    return {
      users: store.state.allUsers,
      formRevele: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }
  & .modale {
    background: #f1f1f1;
    color: #333;
    padding: 20px;
    position: fixed;
    width: 100%;
    border-radius: 10px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;

    & .btn-modale {
      position: absolute;
      top: 10px;
      right: 10px;
    }
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

@media screen and (min-width: 768px) {
  .bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & .modale {
      width: 50%;
    }
  }
}
</style>
