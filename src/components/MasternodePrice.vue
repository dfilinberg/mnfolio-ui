<template>
  <div>
    <b-form-group
      id="masternodeLabel"
      label="Поддержка технологии мастернод:"
      label-for="masternode">
      <b-form-checkbox
        v-model="coin.masternode"
        size="sm"
        value="true">Есть
      </b-form-checkbox>
    </b-form-group>
    <div v-if="coin.masternode">
      <b-form-group
        id="masternodePriceTypeLabel"
        label="Тип вознаграждения:"
        label-for="masternodePriceType">
        <b-form-select
          id="masternodePriceType"
          size="sm"
          v-model="coin.masternodePrice.type"
          :options="masternodePriceTypes"
          required/>
      </b-form-group>
      <div v-if="coin.masternodePrice.type === 'fixed'">
        <b-form-group
          id="priceLabel"
          label="Цена:"
          label-for="price"
          description="Стоимость мастерноды">
          <b-form-input
            id="price"
            type="number"
            size="sm"
            v-model="coin.masternodePrice.price"
            min="0"
            max="1000000">
          </b-form-input>
        </b-form-group>
      </div>
      <div v-if="coin.masternodePrice.type === 'height'">
        <b-button v-on:click="addMasternodePrice()" class="mb-3">Добавить</b-button>
        <height-masternode-price
          v-for="block in coin.masternodePrice.blocks"
          :key="block.id"
          :price="coin.masternodePrice"
          :block="block"></height-masternode-price>
      </div>
    </div>
  </div>
</template>

<script>
  import HeightMasternodePrice from '@/components/HeightMasternodePrice'

  export default {
    name: 'MasternodePrice',
    props: ['coin'],
    data () {
      return {
        masternodePriceTypes: [
          {text: 'Фиксированное', value: 'fixed'},
          {text: 'Функция от высоты блока', value: 'height'}
        ]
      }
    },
    components: {
      'height-masternode-price': HeightMasternodePrice
    },
    methods: {
      addMasternodePrice () {
        if (!this.coin.masternodePrice.blocks) {
          this.coin.masternodePrice.blocks = []
        }
        this.coin.masternodePrice.blocks.push({
          first: 0,
          last: 0,
          price: 1000,
          id: '_' + new Date().getTime()
        })
      }
    }
  }
</script>

<style scoped>

</style>
