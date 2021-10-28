<template>
  <div class="bloc-modale" v-if="updateDogRevele" data-backdrop="static">
    <div class="overlay" @click="updateClose"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="updateClose">X</div>
      <h1>Modifier</h1>
      {{ this.$store.state.chienToUpdate }}
      <div id="imgChien">
        <img :src="this.$store.state.chienToUpdate.imageUrl" alt="" />
      </div>
      <form action="" enctype="multipart/form-data" id="formulaire">
        <!--        Nom du chien           -->
        <div>
          <label for="name">Nom du chien</label>
          <input
            type="text"
            id="nom"
            name="name"
            :value="this.$store.state.chienToUpdate.name"
            @blur="capitalize"
          />
        </div>
        <!--         N°de puce       -->
        <div>
          <label for="puce">N°de puce</label>
          <input
            type="text"
            id="puce"
            name="puce"
            :value="this.$store.state.chienToUpdate.puce"
          />
        </div>
        <!--         Image           
        <div>
          <label for="image">Photo principale</label>
          <input type="file" name="image" id="image" @change="onFileChange" />
        </div>
        -->
        <!--   Robe           -->
        <div>
          <label for="robe">Robe</label>
          <input
            type="text"
            id="robe"
            :value="this.$store.state.chienToUpdate.robe"
          />
        </div>
        <!--         Sexe           -->
        <div>
          <label for="sexe">Sexe</label>
          <select id="sexe" :value="this.$store.state.chienToUpdate.sexe">
            <option>Mâle</option>
            <option>Femelle</option>
          </select>
        </div>
        <!--         Chat           -->
        <div>
          <label for="chat">Test chat</label>
          <select id="chat" :value="this.$store.state.chienToUpdate.chat">
            <option>OK</option>
            <option>KO</option>
            <option>A faire</option>
          </select>
        </div>
        <!--         Santé           -->
        <div>
          <label for="sante">Santé</label>
          <input
            type="text"
            id="sante"
            :value="this.$store.state.chienToUpdate.sante"
          />
        </div>
        <!--         Age           -->
        <div>
          <label for="age">Age</label>
          <input
            type="text"
            id="age"
            :value="this.$store.state.chienToUpdate.age"
          />
        </div>
        <!--         Emplacement           -->
        <div>
          <label for="emplacement">Emplacement</label>
          <input
            type="text"
            id="emplacement"
            :value="this.$store.state.chienToUpdate.emplacement"
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
            :value="this.$store.state.chienToUpdate.description"
          ></textarea>
        </div>

        <!--------------------------------------------------------------->
        <div v-if="this.$store.state.chienToUpdate.statut == 'Réservé'">
          <div>
            <input
              class="statut"
              type="radio"
              id="reserved"
              name="chien"
              value="Réservé"
              checked
              @click="checkStatut"
            />
            <label for="reserved">Réservé</label>
          </div>
          <div>
            <input
              class="statut"
              type="radio"
              id="optioned"
              name="chien"
              value="Optionné"
              @click="checkStatut"
            />
            <label for="optioned">Optionné</label>
          </div>
        </div>
        <div v-if="this.$store.state.chienToUpdate.statut == 'Optionné'">
          <div>
            <input
              class="statut"
              type="radio"
              id="reserved"
              name="chien"
              value="Réservé"
              @click="checkStatut"
            />
            <label for="reserved">Réservé</label>
          </div>
          <div>
            <input
              class="statut"
              type="radio"
              id="optioned"
              name="chien"
              value="Optionné"
              checked
              @click="checkStatut"
            />
            <label for="optioned">Optionné</label>
          </div>
        </div>
        <!------CAROUSEL--------------------------------------------------->
        <!--<div id="carousel">
          <div class="imgPlus">
            <input id="imgPlus" type="button" value="+" @click="imagesupp" />
          </div>
          <div id="photos">
            <h3>Carousel</h3>
            <div class="photo">
              <input
                class="carousel"
                type="file"
                name="carousel"
                @change="onFileChange"
              />
            </div>
          </div>
        </div>-->
        <!----------------------------------------------------------------------->
        <div id="buttons">
          <button class="btn-success" @click="updateValidation">Valider</button>
          <button class="btn-danger" @click="updateClose, erreur">
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
  name: "updateModale",
  props: ["updateDogRevele", "updateClose"],
  data() {
    return {
      chienToUpdate: this.$store.state.chienToUpdate,
      dataChien: {
        refuge: "",
        name: "",
        puce: "",
        emplacement: "",
        imageUrl: "",
        robe: "",
        sexe: "",
        description: "",
        age: "",
        chat: "",
        sante: "",
        statut: "",
        carousel: [],
      },
      createdStatut: this.$store.state.chienToUpdate.statut,
      refuges: store.state.refuges,
      ajout: false,
      showAlert: false,
      check: "",
    };
  },
  methods: {
    checkStatut(e) {
      this.check = e.target.value;
    },
    updateValidation: function() {
      let id = this.$store.state.chienToUpdate._id;
      let name = document.getElementById("nom").value;
      let puce = document.getElementById("puce").value;
      let robe = document.getElementById("robe").value;
      let sexe = document.getElementById("sexe").value;
      let chat = document.getElementById("chat").value;
      let sante = document.getElementById("sante").value;
      let age = document.getElementById("age").value;
      let emplacement = document.getElementById("emplacement").value;
      let description = document.getElementById("description").value;

      if (this.check == "") {
        this.check = this.$store.state.chienToUpdate.statut;
      }
      let statut = this.check;
      let refuge = this.$store.state.chienToUpdate.refuge;

      configAxios
        .put(`/chien/${id}`, {
          name: name,
          puce: puce,
          robe: robe,
          sexe: sexe,
          chat: chat,
          sante: sante,
          age: age,
          emplacement: emplacement,
          description: description,
          statut: statut,
        })
        .then(() => {
          console.log("modifications Ok");
          configAxios.get(`refuges/${refuge}`).then((res) => {
            store.dispatch("getRecapChiens", res.data);
            this.$router.push(refuge);
          });
        });
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
    & #imgChien {
      width: 100%;

      & img {
        height: 200px;
        object-fit: cover;
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
    & #carousel {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 15px;
      padding: 10px;
      .imgPlus {
        width: 100px;
        & #imgPlus {
          width: 30px;
        }
      }
      & #photos {
        flex-direction: column;
        & .photo {
          margin-bottom: 10px;
        }
      }
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
