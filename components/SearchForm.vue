<template>
  <div class="search">
    <label for="doggie-search">Token ID</label>

    <input
      v-model="search"
      :class="{ '--disabled': isLoading }"
      type="search"
      name="search"
      :disabled="isLoading"
      required
    />

    <span v-if="error" class="search__error">{{ error }}</span>

    <div class="search__cta">
      <button class="--outlined" :class="{ '--disabled': isLoading }" :disabled="isLoading" @click="handleOnRandom()">
        Random Search
      </button>

      <button
        :class="{ '--disabled': isLoading || !search }"
        :disabled="isLoading || !search"
        @click="handleOnSearch(search)"
      >
        Search
      </button>
    </div>

    <div v-if="isLoading" class="search__loading">Loading...</div>
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
  error: {
    type: String,
    required: false,
    default: '',
  },
});

// 6314
const search = ref('');
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
  margin: 32px 0 40px;
  &__error {
    color: $error;
  }
  &__cta {
    display: flex;
    gap: 16px;
  }
  &__loading {
    text-align: center;
    margin-top: 28px;
  }
}
</style>
