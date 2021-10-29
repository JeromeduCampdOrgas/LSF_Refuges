<template>
  <div class="bloc-modale" v-if="userRevele" data-backdrop="static">
    <div class="overlay" @click="userModale"></div>
    <div class="modale ">
      <div class="btn-modale btn btn-danger" @click="userModale">X</div>
      <h1>Utilisateur</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "userModale",

  props: ["userRevele", "userModale"],
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
</style>
