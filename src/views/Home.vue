<template>
  <div class="home">
    <nav>
      <div>
        <button data-type="col" @click="createElement">COL</button>
        <select ref="col">
          <option :value="i + 1" v-for="(c, i) in col" :key="i" v-text="c"></option>
        </select>
        <button @click="generarHTML">GENERAR HTML</button>
      </div>
    </nav>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="70"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :prevent-collision="false"
    >
      <grid-item v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="item-div"
        :maxH="1"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
      >
      {{item.label}}
      </grid-item>
    </grid-layout>
    <!-- {{layout}} -->
    <pre v-text="result"></pre>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

export default {
  name: 'home',
  data() {
    return {
      layout: [],
      col: [],
      result: '',
    };
  },
  methods: {
    createElement(e) {
      debugger;
      const type = e.target.getAttribute('data-type');
      if (type === 'col') {
        const size = this.layout.length;
        const val = parseInt(this.$refs.col.value, 10);
        const value = `col-${val}`;
        const item = {
          x: 0, y: 0, w: val, h: 1, i: size, label: value,
        };
        this.layout.push(item);
      }
    },
    columns() {
      for (let cont = 1; cont <= 12; cont += 1) {
        this.col.push(`col-${cont}`);
      }
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log('1', i, newH, newW, newHPx, newWPx);
    },
    moveEvent(i, newX, newY) {
      console.log('2', i, newX, newY);
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log('3', i, newH, newW, newHPx, newWPx);
      this.layout[i].label = `col-${newW}`;
    },
    containerResizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log('4', i, newH, newW, newHPx, newWPx);
    },
    movedEvent(i, newX, newY) {
      console.log('5', i, newX, newY);
    },
    generarHTML() {
      const size = this.layout.length;
      let html = '';
      if (size > 0) {
        html += '<div class="q-pa-md">';
        const yMin = Math.min(...this.layout.map(d => d.y));
        const yMax = Math.max(...this.layout.map(d => d.y));
        let arrTemp = [];
        for (let y = yMin; y <= yMax; y += 1) {
          html += '<div class="row">';
          arrTemp = this.layout.filter(d => d.y === y).sort((a, b) => (a.x > b.x ? 1 : -1));
          const xMin = Math.min(...arrTemp.map(d => d.x));
          const xMax = Math.max(...arrTemp.map(d => d.x));
          for (let x = 0; x < arrTemp.length; x += 1) {
            const arrCurr = arrTemp[x];
            const arrNext = arrTemp[x + 1] || arrTemp[x];
            let offset = 0;
            let renderOffset = '';
            if (arrCurr.i !== arrNext.i) {
              const calcOffset = (arrCurr.x + arrCurr.w) - arrNext.x;
              offset = calcOffset < 0 ? calcOffset * -1 : calcOffset * 1;
              renderOffset = offset === 0 ? '' : ` offset-${offset}`;
              html += `<div class="col-${arrCurr.w}${renderOffset}"></div>`;
            } else {
              offset = 12 - (arrCurr.x + arrCurr.w);
              renderOffset = offset === 0 ? '' : ` offset-${offset}`;
              html += `<div class="col-${arrCurr.w}${renderOffset}"></div>`;
            }
          }
          console.log(xMax);
          console.log(xMin);
          html += '</div>';
        }
        html += '</div>';
        this.result = html;
      }
    },
  },
  created() {
    this.columns();
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
};
</script>

<style lang="scss" scoped>
.item-div {
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
}
.vue-grid-layout {
  background: #eeeeee;
}
pre {
  white-space: pre-wrap;
  width: calc(100% - 20px);
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  padding: 10px;
 }
</style>
