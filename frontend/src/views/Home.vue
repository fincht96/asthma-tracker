<template>
  <div class="flex-container">
    <div class="row">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Simply monitor your peak flow</h1>
            <h2 class="subtitle">A tool to log and monitor your peak expiratory flow (PEF)</h2>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>



<style scoped lang="scss">
.flex-container {
  height: 100%;
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  padding: 30px;
  width: 100%;
  max-width: 1000px;

  text-align: left;
}
</style>