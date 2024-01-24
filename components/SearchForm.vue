<template>
  <div class="search">
    <label class="search__label" for="doggie-search">Token ID</label>
    <input
      v-model="search"
      class="search__input"
      :class="{ 'search__input--disabled': isLoading }"
      type="text"
      name="search"
      autocomplete="false"
      :disabled="isLoading"
      required
    />
    <div class="search__cta">
      <button
        class="search__cta__button search__cta__button--outlined"
        :class="{ 'search__cta__button--disabled': isLoading }"
        @click="handleOnRandom()"
      >
        Random Search
      </button>
      <button
        class="search__cta__button"
        :class="{ 'search__cta__button--disabled': isLoading }"
        @click="handleOnSearch(search)"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  handleOnSearch: {
    type: Function,
    required: true,
  },
  handleOnRandom: {
    type: Function,
    required: true,
  },
});

const search = ref('');
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
  margin: 24px 0;
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
  &__cta {
    display: flex;
    gap: 16px;
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
      &--disabled {
        color: $basic-white;
        background-color: #9fd8f1;
        pointer-events: none;
        cursor: not-allowed;
      }
      &--outlined {
        color: #006aac;
        border-color: #006aac;
        background-color: transparent;
        &:hover {
          color: $basic-white;
          background-color: #006aac;
        }
        &--disabled {
          color: #9fd8f1;
          border: 1px solid #9fd8f1;
        }
      }
    }
  }
}
</style>
