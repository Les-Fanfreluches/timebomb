<template>
  <div class="card-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card-container {
  width: 400px;
  background-color: #fff8f0;
  padding: 0px 50px 50px 50px;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.29);
}
</style>