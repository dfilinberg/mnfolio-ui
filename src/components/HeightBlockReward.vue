<template>
  <fieldset>
    <legend>Вознаграждения для блоков {{block.first}} - {{block.last}}</legend>
    <b-form-group
      id="firstLabel"
      label="Начальный блок:"
      label-for="first"
      description="Блок с которого будет действовать данное вознаграждение">
      <b-form-input
        id="first"
        type="number"
        size="sm"
        v-model="block.first">
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="lastLabel"
      label="Последний блок:"
      label-for="last"
      description="Блок до которого будет действовать данное вознаграждение">
      <b-form-input
        id="last"
        type="number"
        size="sm"
        v-model="block.last">
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="powLabel"
      label="POW:"
      label-for="pow"
      description="Награда майнеру">
      <b-form-input
        id="pow"
        type="number"
        size="sm"
        v-model="block.pow"
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
        v-model="block.pos"
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
        v-model="block.masternode"
        min="0"
        max="1000000"
        step="0.001">
      </b-form-input>
    </b-form-group>
    <b-button v-on:click="removeBlockReward(block)" variant="danger" class="mb-1" size="sm">Удалить</b-button>
  </fieldset>
</template>

<script>
  export default {
    name: 'HeightBlockReward',
    props: ['reward', 'block'],
    methods: {
      removeBlockReward: function (block) {
        this.reward.blocks = this.reward.blocks.filter(function ($block) {
          return $block.id !== block.id
        })
      }
    }
  }
</script>

<style scoped>
  fieldset {
    border: solid 1px #aaa !important;
    padding: 10px 20px 10px 20px;
    border-bottom: none;
    border-radius: 6px;
    margin-bottom: 20px;
  }

  legend {
    width: auto !important;
    border: none;
    font-size: 14px;
  }
</style>
