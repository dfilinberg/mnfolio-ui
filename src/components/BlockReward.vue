<template>
  <div>
    <b-form-group
      id="rewardTypeLabel"
      label="Тип вознаграждения:"
      label-for="rewardType">
      <b-form-select
        id="rewardType"
        size="sm"
        v-model="coin.reward.type"
        :options="rewardTypes"
        required/>
    </b-form-group>
    <div v-if="coin.reward.type === 'fixed'">
      <b-form-group
        id="powLabel"
        label="POW:"
        label-for="pow"
        description="Награда майнеру">
        <b-form-input
          id="pow"
          type="number"
          size="sm"
          v-model="coin.reward.pow"
          min="0"
          max="1000000"
          step="0.001">
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="posLabel"
        label="POS:"
        label-for="pow"
        description="Награда стейкеру">
        <b-form-input
          id="pos"
          type="number"
          size="sm"
          v-model="coin.reward.pos"
          min="0"
          max="1000000"
          step="0.001">
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="masternodeLabel"
        label="Мастернода:"
        label-for="masternode"
        description="Награда мастерноде">
        <b-form-input
          id="masternode"
          type="number"
          size="sm"
          v-model="coin.reward.masternode"
          min="0"
          max="1000000"
          step="0.001">
        </b-form-input>
      </b-form-group>
    </div>
    <div v-if="coin.reward.type === 'height'">
      <b-button v-on:click="addBlockReward()" class="mb-3" size="sm">Добавить</b-button>
      <height-block-reward
        v-for="block in coin.reward.blocks"
        :key="block.id"
        :reward="reward"
        :block="block"></height-block-reward>
    </div>
    <div v-if="coin.reward.type === 'difficulty'">
      <b-form-group
        id="expressionLabel"
        label="Формула:"
        label-for="expression"
        description="Функция от сложности">
        <b-form-input
          id="pow"
          size="sm"
          v-model="coin.reward.expression"
          placeholder=" 2222222/(((Difficulty+2600)/9)^2)">
        </b-form-input>
      </b-form-group>
    </div>
  </div>
</template>

<script>
  import HeightBlockReward from '@/components/HeightBlockReward'

  export default {
    name: 'BlockReward',
    props: ['coin', 'reward'],
    data () {
      return {
        rewardTypes: [
          {text: 'Фиксированное', value: 'fixed'},
          {text: 'Функция от высоты блока', value: 'height'},
          {text: 'Функция от сложности', value: 'difficulty'}
        ]
      }
    },
    components: {
      'height-block-reward': HeightBlockReward
    },
    methods: {
      addBlockReward () {
        if (!this.coin.reward.blocks) {
          this.coin.reward.blocks = []
        }
        this.coin.reward.blocks.push({
          first: 0,
          last: 0,
          pow: 0,
          pos: 0,
          masternode: 0,
          id: '_' + new Date().getTime()
        })
      }
    }
  }
</script>

<style scoped>

</style>
