<template>
  <div>  
    <div v-for="(chartDataset, index) in chartDatasets" v-bind:key="index">
      <graphic-result v-bind:chart-dataset="chartDataset" v-bind:position="index"></graphic-result>
    </div>
    <div id="vosr-charts-container">    
    </div>
  </div>
</template>

<script>
// import Chart from 'chart.js';
import GraphicsResultParser from "libs/parsers/GraphicsResultParser";
import GraphicResult from "./GraphicResult.vue";

export default {
  name: "GraphicsResult",  
  props: {
    chartOptions: Array
  },
  components: {
    GraphicResult
  },
  data() {   
    return {      
      chartDatasets: [],
      parser: new GraphicsResultParser(this.normalizePath),
    }
  },
  methods: {
    onResults(payload) {
      console.debug(`**** onGraphics ${payload}`);

      // TODO make sure any resultDto can be used
      const studyResult = payload.response.studyResultDto;
      this.chartOptions.forEach((option) => {
        const aggData = studyResult.aggs.filter((item => item.aggregation === option.agg)).pop();
        const data = this.parser.parse(aggData, option);
        this.chartDatasets.push({data, option});
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