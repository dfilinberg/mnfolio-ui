import Vue from 'vue'
import {Line} from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Line,
  props: ['data', 'options'],
  watch: {
    data: function () {
      if (this.data && this.data.datasets) {
        if (this.$data._chart) {
          this.$data._chart.destroy()
        }
        this.renderChart(this.data, this.options)
      } else {
        if (this.$data._chart) {
          this.$data._chart.destroy()
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
