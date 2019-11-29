<template>
  <div>
    <div class="row">
      <div class="col-4 offset-2">col-4</div>
      <div class="col-4 offset-1">col-4</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'generate-template',
};
</script>
<style>
.row div {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
  height: 70px;
}
</style>
