// resources/assets/js/components/App.vue

<template>
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">
          <drawing-toolbar></drawing-toolbar>
        </div>
        <div class="panel-body">
          <drawing-canvas></drawing-canvas>
        </div>
        <div class="panel-footer">

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.panel-heading {
  padding: 0 15px;
}
</style>

<script>
export default {

  name: 'app',

  props: {},

  mounted() {

  },

  methods: {

  }
}
</script>
