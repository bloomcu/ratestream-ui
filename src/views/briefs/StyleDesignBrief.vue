<template>
  <div>
    <div class="flex justify-between padding-sm border-bottom">
      <span class="text-sm">Style Design Brief</span>
    </div>
    
    <div class="flex container max-width-xxl">
      <aside class="position-relative z-index-1 width-100% border-right max-width-xxxxs padding-y-sm padding-x-md">
        <nav class="nested-menu margin-bottom-md">
          <ul class="nested-menu__list">
              <li v-for="(step, index) in steps" :key="index" class="nested-menu__item">
                <a @click.prevent="toggle(step.slug)" :class="toggled === step.slug ? 'nested-menu__link--current' : ''" class="nested-menu__link"  href="">
                  <span class="nested-menu__text">{{ step.title }}</span>
                </a>
              </li>
            </ul>
        </nav>
      </aside>
      
      <main class="position-relative z-index-1 flex-grow height-auto padding-y-md padding-x-lg">
        <div class="text-component">
          <component :is="toggled"/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppNestedMenu from '@/app/components/nested-menu/AppNestedMenu.vue'

import useToggle from '@/app/composables/useToggle.js'
const { toggle, toggled } = useToggle()

onMounted(() => {
  toggle('brief-intro')
})

const steps = [
  {
    title: 'Intro',
    slug: 'brief-intro',
  },
  {
    title: 'Step 1 - Tutorial',
    slug: 'brief-tutorial',
  },
  {
    title: 'Step 2 - Brand',
    slug: 'brief-brand',
  },
  {
    title: 'Step 3 - Assets',
    slug: 'brief-assets',
  },
  {
    title: 'Step 4 - Final Instructions',
    slug: 'brief-final-instructions',
  },
  {
    title: 'More info',
    slug: 'brief-more-info',
  },
]
</script>

<script>
import { defineComponent } from 'vue'

// Components
import BriefIntro from '@/views/briefs/components/BriefIntro.vue'
import BriefTutorial from '@/views/briefs/components/BriefTutorial.vue'
import BriefBrand from '@/views/briefs/components/BriefBrand.vue'
import BriefAssets from '@/views/briefs/components/BriefAssets.vue'
import BriefFinalInstructions from '@/views/briefs/components/BriefFinalInstructions.vue'
import BriefMoreInfo from '@/views/briefs/components/BriefMoreInfo.vue'

export default defineComponent({
    components: {
      BriefIntro,
      BriefTutorial,
      BriefBrand,
      BriefAssets,
      BriefFinalInstructions,
      BriefMoreInfo,
    }
})    
</script>
