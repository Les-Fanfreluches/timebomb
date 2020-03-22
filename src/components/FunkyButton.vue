<template>
  <button class="rainbow rainbow" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
.rainbow {
  text-align: center;
  font-weight: 900;
  outline: none;
  border-style: outset;
  font-size: 20px;
  text-decoration: none;
  border-radius: 4px;
  color: rgb(43, 43, 43);
  cursor: pointer;
  padding: 6px 32px;
  background-image: linear-gradient(
    90deg,
    #00c0ff 0%,
    #ffcf00 49%,
    #fc4f4f 80%,
    #00c0ff 100%
  );
  animation: slidebg 2s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 216px;
  }
}
</style>