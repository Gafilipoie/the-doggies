<template>
  <div class="container">
    <h1 class="container__title">The Doggies Explorer</h1>

    <SearchForm
      :is-loading="isLoading"
      :handle-on-search="handleOnSearch"
      :handle-on-random="handleOnRandom"
      :error="error"
    />

    <DoggieDetails v-if="tokenUri" :token-uri="tokenUri" :token-owner="tokenOwner" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Web3 from 'web3';
import theDoggies from '../assets/json/the-doggies.json';

const isLoading = ref(false);
const tokenUri = ref('');
const tokenOwner = ref('');
const error = ref('');

let contract = null;

onMounted(() => {
  const web3 = new Web3(window.ethereum);
  const contractAddress = theDoggies.address;
  const abi = theDoggies.abi;
  contract = new web3.eth.Contract(abi, contractAddress);
});

const handleOnSearch = async (value) => {
  try {
    isLoading.value = true;
    tokenUri.value = '';

    const tokenUriResult = await callTokenURI(value);
    const tokenOwnerResult = await callTokenOwner(value);

    isLoading.value = false;
    tokenUri.value = tokenUriResult;
    tokenOwner.value = tokenOwnerResult;
  } catch (error) {
    isLoading.value = false;
    error.value = error.message;
  }
};

const handleOnRandom = async () => {
  try {
    isLoading.value = true;
    tokenUri.value = '';

    const events = await callGetPastEvents();
    const tokenIDList = getTokens(events);
    const tokenID = getRandomToken(tokenIDList);

    const tokenUriResult = await callTokenURI(tokenID);
    const tokenOwnerResult = await callTokenOwner(tokenID);

    isLoading.value = false;
    tokenUri.value = tokenUriResult;
    tokenOwner.value = tokenOwnerResult;
  } catch (error) {
    isLoading.value = false;
    error.value = error.message;
  }
};

const callGetPastEvents = async () => {
  return await contract.getPastEvents('Transfer', {
    fromBlock: '0xD90C71',
    toBlock: '0xD9950F',
  });
};

const callTokenURI = async (tokenID) => {
  return await contract.methods.tokenURI(tokenID).call();
};

const callTokenOwner = async (tokenID) => {
  return await contract.methods.ownerOf(tokenID).call();
};

const getTokens = (events) =>
  events.reduce((acc, { returnValues }) => {
    acc.push(returnValues.tokenId);
    return acc;
  }, []);

const getRandomToken = (tokenIDList) => tokenIDList[Math.floor(Math.random() * tokenIDList.length)];
</script>

<style lang="scss" scoped>
.container {
  &__title {
    margin: 0;
  }
}
</style>
