<template>
  <div class="status">
    <button
      class="status__button --link"
      :class="{ '--disabled': isLoading || connected }"
      :disabled="isLoading || connected"
      @click="connect"
    >
      {{ connected ? 'Connected' : 'Connect' }}
    </button>

    <div class="status__icon" :class="{ 'status__icon--connected': connected }" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);
const connected = ref(false);

async function connect() {
  // this connects to the wallet
  if (window.ethereum) {
    isLoading.value = true;
    // first we check if metamask is installed
    await window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
      isLoading.value = false;
      connected.value = true;
    });
  }
}
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  &__button {
    flex: 1;
  }
  &__icon {
    flex: 1;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $error;
    &--connected {
      background-color: $valid;
    }
  }
}
</style>
