<template>
  <div v-bind:id="containerId" class="row">
    <div v-bind:id="aggContainerId" class="col-6">
      <canvas v-bind:id="canvasId" class="mb-4"></canvas>
    </div>
  </div>
</template>

<script>
// import Chart from 'chart.js';
// import $ from 'jquery';

export default {
  props: {
    position: Number,
    aggId: String
  },
  data: function() {
    return {
      containerId: `vosrs-charts-container-${this.position}`,
      aggContainerId: `vosrs-charts-${this.aggId}-${this.position}`,
      canvasId: `vosrs-charts-${this.aggId}-${this.position}-canvas`,
    }
  }
}
</script>