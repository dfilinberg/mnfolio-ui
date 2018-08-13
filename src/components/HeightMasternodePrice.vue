<template>
  <fieldset>
    <legend>Цена мастерноды для блоков {{block.first}} - {{block.last}}</legend>
    <b-form-group
      id="firstLabel"
      label="Начальный блок:"
      label-for="first"
      description="Блок с которого будет действовать данная цена">
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
      description="Блок до которого будет действовать данная цена">
      <b-form-input
        id="last"
        type="number"
        size="sm"
        v-model="block.last">
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="priceLabel"
      label="Цена:"
      label-for="price"
      description="Цена">
      <b-form-input
        id="price"
        type="number"
        size="sm"
        v-model="block.price"
        min="0"
        max="1000000">
      </b-form-input>
    </b-form-group>
    <b-button v-on:click="removeMasternodePrice(block)" variant="danger" class="mb-1" size="sm">Удалить</b-button>
  </fieldset>
</template>

<script>
  export default {
    name: 'HeightMasternodePrice',
    props: ['price', 'block'],
    methods: {
      removeMasternodePrice: function (block) {
        this.price.blocks = this.price.blocks.filter(function ($block) {
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
