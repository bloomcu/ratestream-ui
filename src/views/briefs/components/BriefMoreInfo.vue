<template>
  <div>
    <p class="text-xs text-uppercase letter-spacing-lg color-primary">More info</p>
    <h1>More Do’s and Dont's</h1>
    <p>More things you should do, things you shouldn’t do, and things you might do.</p>

    <div class="max-width-sm">
      <h4 class="padding-top-sm">Do's</h4>
      <p>Things you should do.</p>
      <p class="text-sm"><strong>DO stay within the brand guidelines.</strong> Make sure to stay within the brand guidelines, but get creative with how you use them.</p>
      
      <h4 class="padding-top-sm">Don'ts</h4>
      <p>Things you shouldn't do.</p>
      <p class="text-sm"><strong>DON’T delete or reorder blocks. </strong>During the project, you can change block layouts, backgrounds and images. However, please don’t delete or reorder any of them.</p>
      <p class="text-sm"><strong>DON’T share the assets or your work anywhere—not even in your portfolio.</strong> You signed an NDA before viewing this project because it is Private and strictly confidential. Make sure to not share any of the assets in this brief or the work you produce for this project because we don’t want you to experience any legal consequences. Thanks!</p>
      <p class="text-sm"><strong>DON’T create the style concept outside of our design tool.</strong> The style concept must be completed using our design tool. Please do not create the style concept in any other application such as Illustrator, Photoshop, etc. (Also see <a href="#maybes">“MAYBE use other applications for images and graphics</a>.”)</p>
      
      <h4 class="padding-top-sm" id="maybes">Maybes</h4>
      <p>Things you might do.</p>
      <p class="text-sm"><strong>MAYBE use other applications for images and graphics.</strong> The style concept must be completed in our design tool. That said, some brand assets may be provided in other file formats (e.g., .jpg, .png, .svg). It’s ok to use other applications to create and manipulate graphics and images; just upload those assets in WordPress as seen in the introduction video.</p>
      <p class="text-sm"><strong>MAYBE source new images.</strong> If there are image files included with the brand assets, then please use those images primarily. However, if there are no image files included (or not enough), then you may source new images. Just make sure images consistently follow the brand guidelines. (If you need to source new images, we recommend <a href="https://elements.envato.com/photos" target="_blank">Envato</a>, <a href="https://unsplash.com/" target="_blank">Unsplash</a>, <a href="https://www.vecteezy.com/free-photos" target="_blank">Vecteezy</a> and <a href="https://www.stocksy.com/" target="_blank">Stocksy</a>. In your style concepts, you can use free downloadable previews so you don’t have to purchase any images. If we want to use the images you select, then we’ll buy them later.)</p>
      <p class="text-sm"><strong>MAYBE explore more than one style concept.</strong> You are welcome to submit more than one concept. Just click the "Copy" icon next to your style concept in the design tool. Of course, in the end, we will choose only one of your concepts to move forward with.</p>
    </div>

    <div class="flex gap-xs margin-top-md padding-y-md border-top">
      <button @click="toggle('brief-final-instructions')" class="btn btn--subtle">Back</button>
    </div>
  </div>
</template>

<script setup>
import useToggle from '@/app/composables/useToggle.js'
const { toggle } = useToggle()
</script>
