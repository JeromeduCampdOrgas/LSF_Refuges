<template>
  <div class="bloc-modale" v-if="profilRevele" data-backdrop="static">
    <div class="overlay" @click="profilModale"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="profilModale">X</div>
      <h1>Mon profil</h1>
      <form action="" id="userForm">
        <div class="pseudo">
          <label for="pseudo">pseudo</label>
          <input
            type="text"
            id="pseudo"
            :value="this.userLogged.pseudo"
            @click="this.invalid = false"
          />
        </div>
        <div class="email">
          <label for="email">email</label>
          <input type="email" id="email" :value="this.userLogged.email" />
        </div>
        <div class="password" v-if="this.modifMDP">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            :value="this.userLogged.password"
          />
        </div>
        <div class="modif">
          <button
            v-if="!this.modifMDP"
            type="button"
            class="btn btn-success"
            @click="this.modifMDP = true"
          >
            Modifier
          </button>
          <button
            v-if="!this.modifMDP"
            type="button"
            class="btn btn-danger"
            @click="profilModale"
          >
            Annuler
          </button>
        </div>
        <div class="modif">
          <button type="button" class="btn btn-success" v-if="this.modifMDP">
            <!--@click="modifValidation"-->
            Valider
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="this.modifMDP = false"
            v-if="this.modifMDP"
          >
            Annuler
          </button>
          <div id="alerte" v-if="this.invalid">
            <span>Les champs pseudo et email doivent être renseignés</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";
export default {
  name: "profil",

  props: ["profilRevele", "profilModale"],
  data() {
    return {
      userLogged: store.state.userLoggedIn,
      modifMDP: false,
      invalid: false,
    };
  },
  methods: {
    modifValidation() {
      console.log("coucou");
      let pseudo = document.getElementById("pseudo").value;
      let email = document.getElementById("email").value;

      if (pseudo == "" || email == "") {
        this.invalid = true;
      } else {
        configAxios.put(`/user/${this.userLogged.id}`, {
          pseudo: pseudo,
          email: email,
        });
      }
    },
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
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & div {
    text-align: left;
    width: 100%;
    margin: 5px auto;
    & label {
      text-align: left;
      width: 30%;
      margin-right: 15px;
    }
    & input {
      width: 55%;
    }
    & .btn {
      margin: 20px;
    }
  }
  & .isAdmin {
    width: 20%;
    margin-left: 5px;
    padding: 5px;
    border-radius: 5px;
    background: #fff;
  }
  & .modif {
    margin: auto;
    text-align: center;
  }
  & #alerte {
    text-align: center;
  }
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
