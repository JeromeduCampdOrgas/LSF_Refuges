<template>
  <div class="bloc-modale" v-if="createDogRevele">
    <div class="overlay" @click="toggleModale"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="toggleModale">X</div>
      <h1>Nouveau chien</h1>

      <form action="">
        <!--         Refuge           -->
        <div class="refuge">
          <label for="refuge">Refuge</label>
          <select id="refuge" v-model="this.dataChien.refuge">
            <option
              v-for="refuge in this.refuges"
              :key="refuge"
              :value="refuge"
              >{{ refuge }}</option
            >
          </select>
        </div>
        <!--        Nom du chien           -->
        <div>
          <label for="name">Nom du chien</label>
          <input type="text" id="nom" v-model="this.dataChien.name" />
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
        <div>
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
            Annuler
          </button>
          <button @click="test">Test</button>
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
        divers: "",
      },
      refuges: store.state.refuges,
    };
  },
  methods: {
    test() {
      console.log("coucou");
      let refuge = this.dataChien.refuge;
      let name = this.dataChien.name;
      let image = this.dataChien.imageUrl;
      let robe = this.dataChien.robe;
      let sexe = this.dataChien.sexe;
      let chat = this.dataChien.chat;
      let sante = this.dataChien.sante;
      let age = this.dataChien.age;
      let emplacement = this.dataChien.emplacement;
      let description = this.dataChien.description;

      const newChien = new FormData();
      newChien.set("refuge", refuge); //this.dataChien.refuge);
      newChien.set("name", name); //this.dataChien.name);
      newChien.set("imageUrl", image);
      newChien.set("robe", robe); //this.dataChien.robe);
      newChien.set("sexe", sexe); // this.dataChien.sexe);
      newChien.set("chat", chat); // this.dataChien.chat);
      newChien.set("sante", sante); //this.dataChien.sante);
      newChien.set("age", age); //this.dataChien.age);
      newChien.set("emplacement", emplacement);
      newChien.set("description", description);

      configAxios.post("chien", newChien).then(() => {
        configAxios.get("chien").then((res) => {
          console.log(res.data);
          store.dispatch("getChiens", res.data);
        });
      });
    },
    onFileChange(e) {
      this.dataChien.imageUrl = e.target.files[0];
      //console.log(this.dataChien.imageUrl);
    },
    createChien: function(e) {
      //accès au dom
      let refuge = this.dataChien.refuge;
      let name = document.getElementById("nom").value;
      let description = document.getElementById("description").value;
      let sexe = document.getElementById("sexe").value;
      let age = document.getElementById("age").value;
      let robe = document.getElementById("robe").value;
      let chat = document.getElementById("chat").value;
      let sante = document.getElementById("sante").value;

      let image = document.getElementById("image").value;
      console.log(refuge);
      console.log(name);
      console.log(description);
      console.log(sexe);
      console.log(age);
      console.log(robe);
      console.log(chat);
      console.log(sante);
      console.log(image);
      //accès catégorie
      //1°partie, on est dans le mode ajoutr de catégorie
      /**--------------------------------------------------------------------------- */
      /*if (this.ajout) {
        let category = document.getElementById("category");
        //si est vide
        if (!category) {
          this.unvalable = !this.unvalable;
          //si la catégorie existe déjà
        } else {
          for (let i = 0; i < this.categories.length; i++) {
            //console.log(category.value);
            if (this.categories[i] == category.value) {
              this.categorieExiste = !this.categorieExiste;
            }
          }
        }
      } else {
        let category = document.getElementById("optionCategory");
        if (!category) {
          this.unvalable = !this.unvalable;
        }
      }*/
      /**--------------------------------------------------------------------------- */
      /*if (!name || !description || !refuge || !stock || !image) {
        this.unvalable = !this.unvalable;
        e.preventDefault();
      } else {
        this.unvalable = false;
        this.categorieExiste = false;
        //recherche des valeurs des options
        let elements = document.getElementsByClassName("optionValue");
        this.colorsArray = [];
        for (let i = 0; i < elements.length; i++) {
          let color = elements[i].value;
          this.colorsArray.push(color);
          this.dataProduct.colors.push(elements[i].value);
        }*/
      /*const newChien = new FormData();
      newChien.set("name", name); //this.dataChien.name);
      newChien.set("refuge", refuge); //this.dataChien.refuge);
      newChien.set("description", description); //this.dataChien.description);
      newChien.set("sexe", sexe); // this.dataChien.sexe);
      newChien.set("age", age); //this.dataChien.age);
      newChien.set("robe", robe); //this.dataChien.robe);
      newChien.set("chat", chat); // this.dataChien.chat);
      newChien.set("sante", sante); //this.dataChien.sante);
      newChien.set("divers", divers); //this.dataChien.divers);
      /*********************************************************************** */

      //newChien.set("imageUrl", image); //this.dataChien.imageUrl);

      //requête Axios
      //configAxios.post("/chien", newChien).then(() =>
      //on récupére tous les produits en base
      //configAxios.get("chien").then((res) => {
      //on met le store à jour
      //store.dispatch("getChiens", res.data);
      /*if (this.ajout) {
              this.categories.push(this.dataProduct.categorie);
              store.dispatch("getCategories", this.categories);
            }*/
      //this.$router.push("/creation");
      //})
      //);
      //}

      e.preventDefault();
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
  border: 1px black solid;

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
        width: 65%;
      }
      & select {
        width: 55%;
      }
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
