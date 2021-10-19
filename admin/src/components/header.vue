<template>
  <header>
    <div id="banniere">
      <img src="../assets/logo.png" alt="logo orinoco" id="logo" />
      <p>Application LSF</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss">
header {
  margin: auto;
  max-width: 100%;
  & #banniere {
    width: 70%;
    margin: auto;
  }
  & img {
    width: 100%;
    height: 150px;
  }
  & p {
    font-size: 1.2em;
    font-weight: bold;
  }
}

/************Media queries**************** */
@media screen and(min-width: 768px) {
  header {
    & #banniere {
      width: 40%;
    }
    & img {
      height: 200px;
    }
  }
}
</style>
