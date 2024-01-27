<template>
  <div class="status">
    <button
      class="status__button --link"
      :class="{ '--disabled': isLoading || connected }"
      :disabled="isLoading || connected"
      @click="connect()"
      data-testid="connect-button"
    >
      {{ connected ? 'Connected' : 'Connect' }}
    </button>

    <div class="status__icon" :class="{ 'status__icon--connected': connected }" data-testid="connect-icon" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(false);
const connected = ref(false);

onMounted(() => {
  checkConnection();
});

async function checkConnection() {
  try {
    if (window.ethereum) {
      isLoading.value = true;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      isLoading.value = false;
      connected.value = accounts.length > 0;
    }
  } catch (error) {
    isLoading.value = false;
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

async function connect() {
  try {
    // this connects to the wallet
    if (window.ethereum) {
      isLoading.value = true;

      // first we check if metamask is installed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      isLoading.value = false;
      connected.value = true;
    }
  } catch (error) {
    isLoading.value = false;
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}
</script>

<style lang="scss" scoped>
.status {
  position: absolute;
  top: 18px;
  right: 16px;
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
