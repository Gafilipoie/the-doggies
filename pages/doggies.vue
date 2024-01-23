<template>
  <div class="container">
    <h1>The Doggies Explorer</h1>

    <SearchForm :handle-search="handleSearch" />

    <NuxtPage />
  </div>
</template>

<script setup>
const handleSearch = (event) => {
  console.log(event);
};
</script>

<style lang="scss" scoped></style>
