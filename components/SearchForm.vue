<template>
  <div class="search-container">
    <label class="search-container__label" for="doggie-search">Token ID</label>
    <input
      v-model="search"
      class="search-container__input"
      :class="{ 'search-container__input--disabled': isLoading }"
      type="text"
      name="search"
      autocomplete="false"
      :disabled="isLoading"
      required
    />
    <button class="search-container__button" @click="handleOnClick()">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  handleSearch: {
    type: Function,
    required: true,
  },
});

const isLoading = false;
const search = ref('');

const handleOnClick = () => props.handleSearch(search.value);
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
  &__label {
    color: #3a3b3f;
    font-size: 16px;
    line-height: 22px;
  }
  &__input {
    width: 100%;
    height: 36px;
    padding: 0 22px 0 12px;
    outline: none;
    color: #8f8f8f;
    font-size: 12px;
    border: 1px solid #cccccc;
    border-radius: $border-radius;
    background-color: $basic-white;
    &:hover {
      box-shadow: $box-shadow;
    }
    &:focus {
      border: 1px solid #27aae2;
    }
    &--disabled {
      color: #c4cace;
      cursor: not-allowed;
      &:hover {
        box-shadow: none;
      }
    }
  }
  &__button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    color: $basic-white;
    font-size: 12px;
    line-height: 12px;
    border: 1px solid transparent;
    border-radius: $border-radius;
    background-color: $button-color;
    transition: 0.1s linear background-color;
    &:hover {
      background-color: $button-color-hover;
    }
    &:active {
      background-color: $button-color-active;
    }
  }
}
</style>
