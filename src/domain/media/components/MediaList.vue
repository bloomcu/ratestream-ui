<template>
    <ul class="media-list">
      <li v-for="(file, index) in files" :key="index" class="media-list__item cursor-pointer padding-xxs">
        <div @click="select(file)">
          <div class="flex flex-column gap-xs flex-row@xs justify-between@xs items-center@xs">
            <div class="flex items-center">
              <div class="media-list__img">
                <MediaIcon :type="file.extension" :source="file.original_url"/>
              </div>
              
              <!-- file info -->
              <div>
                <span class="text-sm line-height-1 margin-bottom-xxxs">{{ file.name }}</span>
                <ul class="media-list__metadata-list text-sm text-xs@md color-contrast-medium">
                  <li>Type: {{ file.extension }}</li>
                  <li>Size: {{ formatFileSize(file.size) }}</li>
                </ul>
              </div>
            </div>

            <!-- actions -->
            <div class="flex padding-right-xxxxs@xs">
              <button v-if="deleteable" @click.stop="destroy(file)" class="app-action-icon reset margin-right-xs" type="button" name="button">
                <svg class="icon" height="24" width="24" viewBox="0 0 24 24"><title>trash can</title><g stroke-linecap="round" stroke-width="2" fill="none" stroke="#000000" stroke-linejoin="round" class="nc-icon-wrapper"><path d="M20,9l-.867,12.142A2,2,0,0,1,17.138,23H6.862a2,2,0,0,1-1.995-1.858L4,9"></path><line x1="1" y1="5" x2="23" y2="5" stroke="#000000"></line><path data-cap="butt" d="M8,5V1h8V5" stroke="#000000"></path></g></svg>
              </button>
              <a @click.stop="download(file.uuid)" class="app-action-icon reset margin-right-sm">
                <svg class="icon"  height="24" width="24" viewBox="0 0 24 24"><g stroke-linecap="round" stroke-width="2" fill="none" stroke="#000000" stroke-linejoin="round" class="nc-icon-wrapper"><line data-cap="butt" x1="12" y1="16" x2="12" y2="3" stroke="#000000"></line> <polyline points="17,3 23,3 23,21 1,21 1,3 7,3 "></polyline> <polyline points=" 17,11 12,16 7,11 " stroke="#000000"></polyline></g></svg>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
</template>

<script setup>
import MediaIcon from '@/domain/media/components/media-icon/MediaIcon.vue'

const props = defineProps({
    files: { 
      type: Array,
    },
    deleteable: { 
      type: Boolean, 
      default: true,
    },
    loading: { 
      type: Boolean, 
      default: false,
    },
})

function select(file) {
    emit('selected', file)
}

function destroy(file) {
    emit('destroyed', file)
}

function download(uuid) {
  window.open(`${baseURL}/media/${uuid}`)
}

const baseURL = import.meta.env.VITE_API_BASE_URL

const emit = defineEmits(['selected', 'destroyed'])

const formatFileSize = (bites) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  let l = 0, n = parseInt(bites, 10) || 0;

  while(n >= 1024 && ++l){
      n = n/1024;
  }
  
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}
</script>

<style lang="scss">
.media-list {
  display: grid;
  gap: var(--space-xs);
}

.media-list__item {
  border-radius: var(--radius-md);
  background: var(--color-bg);
  box-shadow: var(--inner-glow), var(--shadow-sm);
  list-style: none;
  transition: 0.2s;
  
  &:hover {
    background: var(--color-bg-dark);
  }
}

.media-list__img {

  .media-icon {
    width: 60px;
    height: 60px;
  }
  
  .media-icon__vector {
    padding: 8px;
  }
  
  .media-icon__other {
    padding: 10px;
  }
  
}

.media-list__metadata-list {
  display: flex;
  align-items: center;
  line-height: 1;
  padding: 0 !important;
  
  > * {
    display: flex;
    align-items: center;
  }

  > *:not(:last-child)::after { /* dot separator */
    content: '';
    display: block;
    flex-shrink: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: currentColor;
    margin: 0 var(--space-xxs);
    opacity: 0.5;
  }
}
</style>
