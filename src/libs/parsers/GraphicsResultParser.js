import Vue from 'vue';

export default class GraphicsResultParser {
  constructor(normalizePath) {
    this.normalizePath = normalizePath;
  }

  parse(chartData, chartDataset) {
    if (!chartData) {
      return;
    }

    const dataKey = chartDataset.agg.match(/range$/) ? 'obiba.mica.RangeAggregationResultDto.ranges' : 'obiba.mica.TermsAggregationResultDto.terms'; 
    let labels = [];
    let data = [];

    chartData[dataKey]
      .forEach(term => {
        labels.push(term.title);
        data.push(term.count);
      });

    const tr = Vue.filter('translate') || (value => value);

    // console.debug(chartData['obiba.mica.TermsAggregationResultDto.terms']);
    return {
      type: chartDataset.type,
      data: {
        labels: labels,
        datasets: [{
          label: tr['studies'],
          data: data
        }]
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        aspectRatio: 3,
        // maintainAspectRatio: false,
        responsive: true,
        legend: {
          ...{ display: false }, ...(chartDataset.legend || {})
        }
        
      }
    }
  }

}