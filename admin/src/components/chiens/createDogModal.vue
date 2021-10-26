<template>
  <div class="bloc-modale" v-if="createDogRevele" data-backdrop="static">
    <div class="overlay" @click="toggleModale"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="toggleModale">X</div>
      <h1>Nouveau chien</h1>

      <form action="" enctype="multipart/form-data" id="formulaire">
        <!--         Refuge           -->
        <div class="refuge">
          <label for="refuge">Refuge</label>
          <select id="refuge" v-model="this.dataChien.refuge" v-if="!ajout">
            <option
              v-for="refuge in this.refuges"
              :key="refuge"
              :value="refuge"
              >{{ refuge }}</option
            >
          </select>

          <input
            v-if="ajout"
            type="text"
            name="refuge"
            v-model="this.dataChien.refuge"
            @blur="capitalize"
          />
          <button
            class="buttonOption ajoutSuppr"
            id="new-refuge"
            v-if="!ajout"
            @click="clickAjout"
          >
            +
          </button>
          <button
            class="buttonOption ajoutSuppr"
            id="escape-newrefuge"
            v-if="ajout"
            @click="clickAjout"
          >
            -
          </button>
        </div>
        <!--        Nom du chien           -->
        <div>
          <label for="name">Nom du chien</label>
          <input
            type="text"
            id="nom"
            name="name"
            v-model="this.dataChien.name"
            @blur="capitalize"
          />
        </div>
        <!--         Image           -->
        <div>
          <label for="image">Photo principale</label>
          <input type="file" name="image" id="image" @change="onFileChange" />
        </div>
        <!--         Robe           -->
        <div>
          <label for="robe">Robe</label>
          <input type="text" id="robe" v-model="this.dataChien.robe" />
        </div>
        <!--         Sexe           -->
        <div>
          <label for="sexe">Sexe</label>
          <select id="sexe" v-model="this.dataChien.sexe">
            <option>Mâle</option>
            <option>Femelle</option>
          </select>
        </div>
        <!--         Chat           -->
        <div>
          <label for="chat">Test chat</label>
          <select id="chat" v-model="this.dataChien.chat">
            <option>OK</option>
            <option>KO</option>
            <option>A faire</option>
          </select>
        </div>
        <!--         Santé           -->
        <div>
          <label for="sante">Santé</label>
          <input type="text" id="sante" v-model="this.dataChien.sante" />
        </div>
        <!--         Age           -->
        <div>
          <label for="age">Age</label>
          <input type="text" id="age" v-model="this.dataChien.age" />
        </div>
        <!--         Emplacement           -->
        <div>
          <label for="emplacement">Emplacement</label>
          <input
            type="text"
            id="emplacement"
            v-model="this.dataChien.emplacement"
          />
        </div>
        <!--         Description           -->
        <div id="areaDescription">
          <label for="description">Description / Commentaires</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            v-model="this.dataChien.description"
          ></textarea>
        </div>

        <div id="buttons">
          <button class="btn-success" @click="createChien">Valider</button>
          <button class="btn-danger" @click="toggleModale, erreur">
            Fermer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import configAxios from "../../axios/configAxios";

export default {
  name: "dogModale",

  props: ["createDogRevele", "toggleModale"],
  data() {
    return {
      dataChien: {
        refuge: "",
        name: "",
        imageUrl: "",
        robe: "",
        sexe: "",
        description: "",
        age: "",
        chat: "",
        sante: "",
      },
      refuges: store.state.refuges,
      ajout: false,
      showAlert: false,
    };
  },
  components: {},
  methods: {
    capitalize(e) {
      let string = e.target.value;
      let String = string.toUpperCase();
      e.target.value = String;
      switch (e.target.name) {
        case "refuge":
          if (this.refuges.indexOf(this.dataChien.refuge) !== -1) {
            alert("Le refuge existe déjà!");
            e.target.value = "";
            this.ajout = false;
          } else {
            this.refuges.push(String);
            this.dataChien.refuge = String;
          }

          break;
        case "name":
          this.dataChien.name = String;
          break;
      }
      console.log(this.dataChien.refuge);
      console.log(this.dataChien.name);
    },
    onFileChange(e) {
      this.dataChien.imageUrl = e.target.files[0];
    },
    clickAjout(e) {
      this.ajout = !this.ajout;
      e.preventDefault();
    },
    createChien: function() {
      //accès au dom
      let refuge = this.dataChien.refuge;
      const newChien = new FormData();
      newChien.set("name", this.dataChien.name);
      newChien.set("refuge", this.dataChien.refuge);
      newChien.set("description", this.dataChien.description);
      newChien.set("sexe", this.dataChien.sexe);
      newChien.set("age", this.dataChien.age);
      newChien.set("robe", this.dataChien.robe);
      newChien.set("chat", this.dataChien.chat);
      newChien.set("sante", this.dataChien.sante);
      newChien.set("imageUrl", this.dataChien.imageUrl);

      //requête Axios
      configAxios.post("/chien", newChien).then(() =>
        //on récupére tous les produits en base
        configAxios
          .get("chien")
          .then((res) => {
            store.dispatch("getChiens", res.data);
          })
          .then(() => {
            configAxios.get(`refuges/${refuge}`).then((res) => {
              store.dispatch("getRecapChiens", res.data);
            });
          })
      );

      location.replace(refuge);
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

      & select {
        width: 55%;
      }
      & .buttonOption {
        margin-left: 5px;
        width: 30px;
        text-align: center;
        border-radius: 5px;
        font-weight: bold;
      }
      & #new-refuge {
        background-color: greenyellow;
      }
      & #escape-newrefuge {
        background-color: red;
      }
    }
    & #areaDescription {
      display: flex;
    }
    & #admin {
      background: #fff;
      width: 75%;
    }
    & .btn-success {
      margin-top: 35px;
      border-radius: 5px;
    }
    & #buttons {
      margin: auto;
      text-align: center;
      & .btn-success,
      .btn-danger {
        border-radius: 5px;

        margin: 30px;
      }
    }
    & .alert {
      color: red;
      font-weight: bold;
    }
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
