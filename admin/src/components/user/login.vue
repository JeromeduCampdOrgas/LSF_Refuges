<template>
  <div class="form" id="form">
    <div id="formHeader">
      <h2>Formulaire de connexion</h2>
    </div>
    <form class="signInForm">
      <div class="form-div">
        <label for="email">email: </label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="dataConnexion.email"
        />
      </div>
      <div class="form-div">
        <label for="password">password: </label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="dataConnexion.password"
        />
      </div>
      <p class="alerte" v-show="isVisible">
        L'adresse mail est obligatoire et doit être une adresse valide. <br />
        Le mot de passe est obligatoire et doit comporter entre 4 et 10
        caractères.
      </p>
      <p class="alerte" v-show="idUncorrect">Utilisateur inconnu.</p>
      <div class="form-div">
        <button
          id="validationButton"
          class="submit-button"
          v-on:click.prevent="connexion"
          v-on:keyup.enter="connexion"
        >
          Valider
        </button>
      </div>
    </form>
  </div></template
>

<script>
export default {};
</script>

<style></style>
