<template>
  <div>  
    <div v-for="(chartDataset, index) in chartDatasets" v-bind:key="index">
      <graphic-result v-bind:agg-id="chartDataset.agg" v-bind:position="index"></graphic-result>
    </div>
    <div id="vosr-charts-container">    
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import GraphicsResultParser from "libs/parsers/GraphicsResultParser";
import GraphicResult from "./GraphicResult.vue";
import $ from 'jquery';

export default {
  name: "GraphicsResult",  
  props: {
    chartDatasets: Array
  },
  components: {
    GraphicResult
  },
  data() {   
    return {      
      parser: new GraphicsResultParser(this.normalizePath),
    }
  },
  methods: {
    onResults(payload) {
      console.debug(`**** onGraphics ${payload}`);

      const studyResult = payload.response.studyResultDto;
      this.count = this.chartDatasets.length;

      // Rendering
      // TODO replace jQuery code with the GraphicResult component

      const chartsElem = $('#vosr-charts-container');
      chartsElem.children().remove();

      this.chartDatasets.forEach((chartDataset, index) => {
        const data = studyResult.aggs.filter((item => item.aggregation === chartDataset.agg)).pop();
        const chartData = this.parser.parse(data, chartDataset);
        console.debug(`chartData ${chartData}`);
        const aggContainerId = `charts-agg-${chartDataset.agg}-${index}`;        

        chartsElem.append(`<div id="charts-container${index}" class="row"></div>`);
        $(`#charts-container${index}`).append(`<div id="${aggContainerId}" class="col-6"></div>`);
        $(`#${aggContainerId}`).append('<canvas class="mb-4"></canvas>');
        const chartCanvas = $(`#${aggContainerId} canvas:last-child`).get(0).getContext('2d');
        new Chart(chartCanvas, chartData);
      });

    }
  },
  mounted() {
    console.debug(`Prop ${this.options} AGGS ${this.aggs}`);
    this.getEventBus().register('query-type-graphics-results',this.onResults.bind(this));



  },
  beforeDestroy() {
    this.getEventBus().unregister('query-type-graphics-results', this.onResults);
  }
}

</script>