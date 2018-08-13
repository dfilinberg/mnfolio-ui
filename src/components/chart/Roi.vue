<template>
  <div style="height: 500px;">
    <div class="mt-3" style="height: 120px;">
      <loader v-if="data.loading"></loader>
      <div v-if="!data.loading" class="mb-2">
        <h4>Рентабельность:</h4>
        <line-chart :data="data.profitability" :options="options"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/components/chart/Line.js'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    name: 'Roi',
    props: ['coin'],
    methods: {
      downloadChart: function () {
        // if (this.coin.ticker) {
        //   const self = this
        //   self.data = {
        //     loading: true
        //   }
        // }
      }
    },
    components: {
      'loader': PulseLoader
    },
    created () {
      this.downloadChart()
    },
    data () {
      return {
        avg: 5,
        time: 'lastHour',
        rate: 0.0001,
        hashRate: 1000000000,
        costPrice: 0.3,
        datasets: [],
        data: {
          loading: true
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              display: true,
              scaleLabel: {
                display: false
              },
              ticks: {
                major: {
                  fontStyle: 'bold',
                  fontColor: '#000000'
                }
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: false
              }
            }]
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
