<template>
  <div class="media-card card card--is-link">
    <div class="card-link">
      <figure @click="select()" class="card-img cursor-pointer">
        <MediaIcon :type="file.extension" :source="file.original_url"/>
        <div class="card-link__icon" aria-hidden="true">
          <svg class="icon" viewBox="0 0 32 32"><g stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" stroke-linejoin="round"><line x1="13" y1="9" x2="13" y2="17"></line><line x1="17" y1="13" x2="9" y2="13"></line><line x1="29" y1="29" x2="24" y2="24"></line><circle cx="13" cy="13" r="11"></circle></g></svg>
        </div>
      </figure>
    </div>
  
    <div class="card-content">
      <div class="card-content__header">
        <p class="text-bold margin-bottom-xxxs">{{ file.name }}</p>
        <p class="text-sm color-contrast-medium margin-bottom-sm">{{ file.extension }}</p>
      </div>
      <div class="flex items-center gap-xxs">
        <a :href="`${baseURL}/media/${file.uuid}`" :download="file.name"  class="btn btn--sm btn--primary">
          <svg class="icon"  height="24" width="24" viewBox="0 0 24 24"><g stroke-linecap="round" stroke-width="2" fill="none" stroke="#fff" stroke-linejoin="round"><line data-cap="butt" x1="12" y1="16" x2="12" y2="3" stroke="#fff"></line><polyline points="17,3 23,3 23,21 1,21 1,3 7,3"></polyline><polyline points=" 17,11 12,16 7,11" stroke="#fff"></polyline></g></svg>
        </a>
        <button v-if="deleteable" @click.stop="destroy()" class="btn btn--sm btn--subtle">
          <svg class="icon" height="24" width="24" viewBox="0 0 24 24"><g stroke-linecap="round" stroke-width="2" fill="none" stroke="#000000" stroke-linejoin="round"><path d="M20,9l-.867,12.142A2,2,0,0,1,17.138,23H6.862a2,2,0,0,1-1.995-1.858L4,9"></path><line x1="1" y1="5" x2="23" y2="5" stroke="#000000"></line><path data-cap="butt" d="M8,5V1h8V5" stroke="#000000"></path></g></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MediaIcon from '@/domain/media/components/media-icon/MediaIcon.vue'

function select() {
    emit('selected', props.file)
}

function destroy() {
    emit('destroyed', props.file)
}

const emit = defineEmits(['selected', 'destroyed'])

const baseURL = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  deleteable: { 
    type: Boolean, 
    default: false,
  },
})
</script>

<style lang="scss">
.media-card {
  padding: 0 !important;
  
  .card-img {
    figure {
      background-color: var(--color-bg-dark);
    }
    
    .media-icon__vector {
      padding: var(--space-md);
    }
    
    .media-icon__other {
      svg {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
