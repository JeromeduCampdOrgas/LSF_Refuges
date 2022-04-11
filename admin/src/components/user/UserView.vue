<template>
  <div id="users">
    <div id="entete">
      <button type="button" class="btn btn-success" @click="toggleForm">
        Créer un nouvel utilisateur
      </button>
      <h1>Utilisateurs</h1>
    </div>
    <table>
      <thead>
        <tr class="libelle">
          <th class="pseudo">Pseudo</th>
          <th class="email">Email</th>
          <th class="isAdmin">Admin</th>
          <th class="actions">Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="elem in this.$store.state.allUsers" :key="elem">
          <td class="pseudo">{{ elem.pseudo }}</td>
          <td class="email">{{ elem.email }}</td>
          <td class="isAdmin">{{ elem.isAdmin }}</td>
          <td class="statut">
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
    <userCreation
      v-bind:formRevele="formRevele"
      v-bind:toggleForm="toggleForm"
    ></userCreation>
  </div>
</template>
<script>
import store from "../../store/index";
import userCreation from "../user/userCreateModal.vue";
import configAxios from "../../axios/configAxios";

export default {
  name: "userModale",
  components: { userCreation },

  data() {
    return {
      users: store.state.allUsers,
      formRevele: false,
      userId: "",
    };
  },
  methods: {
    toggleForm: function() {
      this.formRevele = !this.formRevele;
    },
    supprimer: function(e) {
      console.log("coucou");
      let pseudo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
      let email = e.target.parentNode.parentNode.childNodes[1].innerHTML;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].pseudo == pseudo && this.users[i].email == email) {
          this.userId = this.users[i]._id;
        }
      }
      if (this.userId) {
        configAxios.delete(`user/${this.userId}`).then(() => {
          configAxios.get("user").then((res) => {
            store.dispatch("getAllUsers", res.data);
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#users {
  margin-top: 50px;
  & #entete {
    display: flex;
    width: 98%;
    margin: 20px auto;
    & h1 {
      flex-grow: 2;
    }
  }
}
table {
  width: 98%;
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
