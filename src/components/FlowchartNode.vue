<template>
  <Handle type="target" :position="Position.Left" :on-connect="onConnect" />
  <div class="node">
    <div class="node-header">
      Page title
    </div>
    <div
      class="node-image"
      :style="{backgroundImage: `url('${props.data.image}')`}"
    >
    </div>
    <div class="node-footer">
      <div class="node-footer__left">
        <p>20</p>
        <small>Visits</small>
      </div>
      <div class="node-footer__right">
        <p>8</p>
        <small>Clicks</small>
      </div>
    </div>
  </div>
  <Handle type="source" :position="Position.Right" />
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { Handle, Position, Connection, Edge, NodeProps } from '@braks/vue-flow'

interface ColorSelectorNodeProps extends NodeProps {
  data: {
    color: string,
    image: string,
    onChange: (event: any) => void
  }
}

const props = defineProps<ColorSelectorNodeProps>()
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params)
// const targetHandleStyle: CSSProperties = { background: '#555' }
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style scoped>
.node {
  /* border: 1px black solid; */
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 0.9px 1.5px rgba(0, 0, 0, 0.03),0 3.1px 5.5px rgba(0, 0, 0, 0.08),0 14px 25px rgba(0, 0, 0, 0.12);
}

.node-header {
  padding: 8px;
}

.node-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
}

.node-footer__left,
.node-footer__right {
  padding: 8px;
  flex: 1;
}

.node-footer__left {
  border-right: 1px solid #000;
}

.node-footer p {
  margin: 0;
}

.node-image {
  width: 200px;
  height: 200px;
  background-size: contain;
  /* max-height: 250px; */
}
</style>
