<template>
  <div v-if="isLoading">Loading...</div>

  <div v-if="!isLoading" class="details">
    <div class="details__bio">
      <div class="details__bio__avatar">
        <NuxtLink :to="data.animation_url" target="_blank"><img :src="data.image_url" /></NuxtLink>
      </div>
      <div class="details__bio__info">
        <h2 class="details__bio__info__name">
          {{ data.name }}
          <small class="details__bio__info__name__owner">Owner: {{ tokenOwner }}</small>
        </h2>

        <p class="details__bio__info__description">
          {{ data.description }}
        </p>
      </div>
    </div>

    <div class="details__traits">
      <table>
        <thead>
          <tr>
            <th>Trait</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(attribute, index) in data.attributes" :key="index">
            <td>{{ attribute.trait_type }}</td>
            <td>{{ attribute.value || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  tokenUri: {
    type: String,
    required: true,
    default: '',
  },
  tokenOwner: {
    type: String,
    required: true,
    default: '',
  },
});

const isLoading = ref(false);
const data = ref({});

onMounted(async () => {
  try {
    isLoading.value = true;

    const {
      data: { _rawValue },
    } = await useFetch(props.tokenUri);
    data.value = _rawValue;

    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    error.value = error.message;
  }
});
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  padding: 14px 32px;
  box-shadow: 1px 1px 4px rgba(2, 2, 2, 0.2);
  border-radius: $border-radius;
  &__bio {
    display: flex;
    flex-direction: row;
    gap: 40px;
    padding-top: 24px;
    margin-bottom: 32px;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 1;
      &__name,
      &__description {
        margin: 0;
        white-space: pre-line;
      }
      &__name {
        &__owner {
          display: block;
          margin-top: 6px;
        }
      }
    }
    &__avatar {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      img {
        width: 200px;
        height: auto;
        margin-bottom: 8px;
        border-radius: 50%;
        box-shadow: 1px 1px 8px rgba(2, 2, 2, 0.2);
      }
    }
  }
}
</style>
