<template>
  <div class="home">
    <nav>
      <div>
        <button data-type="col" @click="createElement">COL</button>
        <select ref="col">
          <option :value="i + 1" v-for="(c, i) in col" :key="i" v-text="c"></option>
        </select>
        <button @click="createHTML">GENERAR HTML</button>
      </div>
    </nav>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="70"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="false"
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
        @click.native="evt => selectedItem(evt, item)"
      >
        {{item.label}}
      </grid-item>
    </grid-layout>
    <router-link to="/template" target='_blank'>Template</router-link>
    <pre v-text="html"></pre>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

export default {
  name: 'home',
  data() {
    return {
      html: '',
      layout: [],
      col: [],
    };
  },
  methods: {
    resetSelected() {
      Object.values(document.querySelectorAll('.vue-grid-item')).forEach(data => data.classList.remove('item-selected'));
    },
    selectedItem(evt, item) {
      console.log(item);
      if (!evt.target.classList.value.includes('item-selected')) {
        if (document.querySelectorAll('.item-selected').length > 1) {
          this.resetSelected();
        }
        evt.target.classList.add('item-selected');
      } else {
        if (document.querySelectorAll('.item-selected').length === 1) {
          this.resetSelected();
        }
        evt.target.classList.remove('item-selected');
      }
    },
    createElement(e) {
      const type = e.target.getAttribute('data-type');
      if (type === 'col') {
        const size = this.layout.length;
        const val = parseInt(this.$refs.col.value, 10);
        const value = `col-${val}`;
        let yMin = 0;
        let yMax = 0;
        let xMin = 0;
        let xMax = 0;
        if (size > 0) {
          yMin = Math.min(...this.layout.map(d => d.y));
          yMax = Math.max(...this.layout.map(d => d.y + yMax));
          xMin = Math.min(...this.layout.map(d => d.x));
          xMax = Math.max(...this.layout.map(d => d.x + d.w));
        }
        console.log(yMin, yMax, xMin, xMax);
        if (xMax > 11) {
          xMax = 0;
          yMax += 1;
        }
        const item = {
          x: size > 0 ? xMax : 0,
          y: size > 0 ? yMax : 0,
          w: val,
          h: 1,
          i: size,
          label: value,
        };
        this.layout.push(item);
      }
    },
    columns() {
      for (let cont = 1; cont <= 12; cont += 1) {
        this.col.push(`col-${cont}`);
      }
    },
    resizeEvent() {
      // resizeEvent(i, newH, newW, newHPx, newWPx)
      // console.log('1', i, newH, newW, newHPx, newWPx);
    },
    moveEvent() {
      // moveEvent(i, newX, newY)
      // console.log('2', i, newX, newY);
    },
    resizedEvent(i, newH, newW) {
      // resizedEvent(i, newH, newW, newHPx, newWPx)
      // console.log('3', i, newH, newW, newHPx, newWPx);
      this.layout[i].label = `col-${newW}`;
    },
    containerResizedEvent() {
      // containerResizedEvent(i, newH, newW, newHPx, newWPx)
      // console.log('4', i, newH, newW, newHPx, newWPx);
    },
    movedEvent() {
      // movedEvent(i, newX, newY)
      // console.log('5', i, newX, newY);
    },
    createHTML() {
      debugger;
      const yMax = Math.max(...this.layout.map(d => d.y));
      const ordenado = this.layout.sort((a, b) => (a.y > b.y ? 1 : -1));
      const arrTemporal = [];
      for (let cont = 0; cont <= yMax; cont += 1) {
        const orden = ordenado.filter(data => data.y === cont).sort((a, b) => (a.x > b.x ? 1 : -1));
        arrTemporal.push(orden);
      }
      let html = '<div>';
      arrTemporal.forEach((row) => {
        html += '<div class="row">';
        row.forEach((col, index, array) => {
          debugger;
          console.log(index, array);
          let offset = '';
          if (index === 0) {
            if (col.x > 0) {
              offset += ` offset-${col.x}`;
            }
          } else {
            const { x: xPrev, w: wPrev } = array[index - 1];
            const { x: xCurr } = array[index];
            const renderOffset = xCurr - (xPrev + wPrev);
            debugger;
            offset += renderOffset === 0 ? '' : ` offset-${renderOffset}`;
          }
          html += `<div class="col-${col.w}${offset}">${col.label}</div>`;
          // const { x, w } = col;
        });
        html += '</div>';
      });
      html += '</div>';
      this.html = html;
      fetch(`http://localhost:3000?html=${JSON.stringify(html)}`).then(() => console.log('OK'))
        .catch(error => console.error('ERROR:', error))
        .then(() => {
          debugger;
          console.log('Fichero creado y/o actualizado');
        });
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

<style lang="scss">
.item-div {
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
}
.vue-grid-layout {
  background: #eeeeee;
  margin: 10px 0;
}
pre, iframe {
  width: 100%;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  margin: 10px 0;
  padding: 10px;
}
pre {
  white-space: pre-wrap;
}
iframe {
  border: 0;
}
.vue-grid-item {
  font-size: 12px;
}
.vue-grid-item.item-selected {
  background: #1d87d2;
  color: #ffffff;
}

</style>
