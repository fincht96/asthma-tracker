<template>
  <div class="flex-container">


    <br>
    <br><br>
    <div class="row">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-3">Simply monitor your peak flow</h1>
            <h2 class="subtitle is-5">
              A web tool to log and monitor your peak expiratory flow (PEF)
            </h2>
          </div>
        </div>
      </section>
    </div>



    <!-- <div class="marketing">
      <div class="container">
        <div class="item">
          <img src="../assets/cloud-black-48dp.svg" />

          <div style="height:30px;" />

          <h1 class="title is-5">Connect everywhere</h1>

          <h2 class="subtitle is-6">Manage your data from anywhere</h2>
        </div>

        <div class="item">
          <img src="../assets/design_services-black-48dp.svg" />

          <div style="height:30px;" />

          <h1 class="title is-5">Intuitive design</h1>

          <h2 class="subtitle is-6">
            Simple page layout makes navigation a breeze
          </h2>
        </div>

        <div class="item">
          <img src="../assets/attach_money-black-48dp.svg" />

          <div style="height:30px;" />

          <h1 class="title is-5">Free (with ads)</h1>

          <h2 class="subtitle is-6">Someone has to pay for the servers</h2>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style scoped lang="scss">
.flex-container {
  // background:#e6e6e6;

  color: #666;
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
  flex-direction: column;
}

.row {
  padding: 50px 0px;
  width: 100%;
  max-width: 1000px;

  text-align: left;
}

.marketing {
  width: 100%;
  background: #f3f3f3;
}

@media only screen and (max-width: 999px) {
  .marketing .container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1500px;
    padding: 20px 0;

  }

  .marketing .container .item {
    color: #666;
    text-align: center;
    font-size: 15px;

    flex-grow: 1;
    flex-basis: 0;
    margin: 20px 30px;
  }
}

@media only screen and (min-width: 1000px) {
  .marketing .container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1500px;
    padding: 30px 0;
  }

  .marketing .container .item {
    color: #666;
    text-align: center;
    font-size: 15px;
 
    flex-grow: 1;
    flex-basis: 0;
    margin: 40px 50px;
  }
}

img {
  width: 55px;
  height: 55px;
}
</style>
