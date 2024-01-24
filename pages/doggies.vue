<template>
  <div class="container">
    <h1>The Doggies Explorer</h1>
    <p>Contract Result: {{ contractResult }}</p>

    <SearchForm
      :is-loading="isLoading"
      :handle-on-search="handleOnSearch"
      :handle-on-random="handleOnRandom"
      :error="error"
    />

    <NuxtPage />
  </div>
</template>

<script>
import Web3 from 'web3';
import theDoggies from '../assets/json/the-doggies.json';

export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
      contract: null,
      connected: false,
      contractResult: '',
      error: '',
    };
  },
  mounted() {
    const web3 = new Web3(window.ethereum);
    const contractAddress = theDoggies.address;
    const abi = theDoggies.abi;
    this.contract = new web3.eth.Contract(abi, contractAddress);
  },
  methods: {
    handleOnSearch: async function (value) {
      try {
        this.isLoading = true;
        this.contractResult = '';

        const result = await this.callTokenURI(value);

        this.isLoading = false;
        this.contractResult = result;
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
      }
    },
    handleOnRandom: async function () {
      try {
        this.isLoading = true;
        this.contractResult = '';

        const events = await this.callGetPastEvents();
        const tokenIDList = this.getTokens(events);
        const tokenID = this.getRandomToken(tokenIDList);
        const result = await this.callTokenURI(tokenID);

        this.isLoading = false;
        this.contractResult = result;
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
      }
    },
    callGetPastEvents: async function () {
      return await this.contract.getPastEvents('Transfer', {
        fromBlock: '0xD90C71',
        toBlock: '0xD9950F',
      });
    },
    callTokenURI: async function (tokenID) {
      return await this.contract.methods.tokenURI(tokenID).call();
    },
    getTokens: (events) =>
      events.reduce((acc, { returnValues }) => {
        acc.push(returnValues.tokenId);
        return acc;
      }, []),
    getRandomToken: (tokenIDList) => tokenIDList[Math.floor(Math.random() * tokenIDList.length)],
  },
};
</script>

<style lang="scss" scoped></style>
