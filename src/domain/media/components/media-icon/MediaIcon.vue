<template>
  <!-- Raster -->
  <figure v-if="type === 'jpg' || type === 'jpeg' || type === 'png'" class="media-icon media-icon__raster">
    <img :src="source">
  </figure>
  
  <!-- Vector -->
  <figure v-else-if="type === 'svg'" class="media-icon media-icon__vector">
    <img :src="source">
  </figure>
  
  <!-- Other -->
  <figure v-else class="media-icon media-icon__other">
    <svg viewBox="0 0 48 48">
      <component :is="dynamicIcon"/>
    </svg>
  </figure>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

import IconNone from '@/domain/media/components/media-icon/icons/icon-none.vue'

const props = defineProps({
    type: { type: String },
    source: { type: String },
})

const filetypes = [
  'ai',
  'css',
  'doc',
  'docx',
  'eot',
  'eps',
  'gif',
  'html',
  'js',
  'mov',
  'mp4',
  'mpg',
  'otf',
  'pdf',
  'sketch',
  'svg',
  'ttc',
  'ttf',
  'txt',
  'woff',
  'woff2',
  'xlsx',
];

const icons = {
  'ai': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-ai.vue')),
  'css': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-css.vue')),
  'doc': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-doc.vue')),
  'docx': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-docx.vue')),
  'eot': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-eot.vue')),
  'eps': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-eps.vue')),
  'gif': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-gif.vue')),
  'html': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-html.vue')),
  'js': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-js.vue')),
  'mov': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-mov.vue')),
  'mp4': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-mp4.vue')),
  'mpg': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-mpg.vue')),
  'otf': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-otf.vue')),
  'pdf': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-pdf.vue')),
  'sketch': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-sketch.vue')),
  'svg': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-svg.vue')),
  'ttc': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-ttc.vue')),
  'ttf': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-ttf.vue')),
  'txt': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-txt.vue')),
  'woff': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-woff.vue')),
  'woff2': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-woff2.vue')),
  'xlsx': defineAsyncComponent(() => import('@/domain/media/components/media-icon/icons/icon-xlsx.vue')),
}

const dynamicIcon = computed(() => {
  let type = props.type.toLowerCase()

  if (filetypes.includes(type)) {
    return icons[type]
  } else {
    return IconNone
  }
})
</script>

<style lang="scss">
.media-icon {
  display: flex;
  justify-content: center; 
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  margin-right: var(--space-xs);
  
  img {
    display: block;
    object-fit: fit;
    width: 100%;
    height: 100%;
  }
}
</style>
