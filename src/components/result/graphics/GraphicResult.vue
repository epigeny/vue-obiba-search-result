<template>
  <div v-bind:id="containerId" class="row">
    <div v-bind:id="aggContainerId" class="col-6">
      <canvas v-bind:id="canvasId" class="mb-4"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    position: Number,
    chartDataset: Object
  },
  data: function() {
    return {
      containerId: `vosrs-charts-container-${this.position}`,
      aggContainerId: `vosrs-charts-${this.chartDataset.option.agg}-${this.position}`,
      canvasId: `vosrs-charts-${this.chartDataset.option.agg}-${this.position}-canvas`,
    }
  },
  mounted() {
    const chartCanvas = document.querySelector(`#${this.canvasId}`).getContext('2d');
    new Chart(chartCanvas, this.chartDataset.data);
  }
}
</script>