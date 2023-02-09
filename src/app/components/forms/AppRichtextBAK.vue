<template>
  <div class="md-editor margin-bottom-sm js-md-editor ">
    <label v-if="label" class="form-label margin-bottom-xxs" for="md-editor-content">{{ label }}</label>

    <div class="bg-light radius-md inner-glow-top shadow-sm padding-xxxxs margin-bottom-xxxs">
      <menu class="flex flex-wrap js-md-editor__actions">
        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="heading" type="button" title="Heading" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Heading</title>
              <g fill="currentColor">
                <path d="M3 15a1 1 0 0 0 1-1V9h8v5a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0v5H4V2a1 1 0 0 0-2 0v12a1 1 0 0 0 1 1z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="code" type="button" title="Code" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Code</title>
              <g fill="currentColor">
                <path d="M6.707 2.293a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 1 0 1.414-1.414L2.414 8l4.293-4.293a1 1 0 0 0 0-1.414z"></path>
                <path d="M15.707 7.293l-5-5a1 1 0 0 0-1.414 1.414L13.586 8l-4.293 4.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="link" type="button" title="Link" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Link</title>
              <g fill="currentColor">
                <path d="M7.431 12.6l-.566.564a2.92 2.92 0 0 1-4.03 0 2.849 2.849 0 0 1 0-4.03L4.54 7.43a2.92 2.92 0 0 1 4.028 0c.068.067.131.137.191.209A1 1 0 1 0 10.3 6.363a4.63 4.63 0 0 0-.316-.347 4.848 4.848 0 0 0-6.858 0l-1.7 1.705a4.849 4.849 0 1 0 6.852 6.859l.565-.563A1 1 0 1 0 7.431 12.6z"></path>
                <path d="M11.15 0a4.816 4.816 0 0 0-3.429 1.42l-.565.565A1 1 0 1 0 8.57 3.4l.565-.565a2.919 2.919 0 0 1 4.03 0 2.85 2.85 0 0 1 0 4.031L11.46 8.57a2.851 2.851 0 0 1-4.03 0 2.844 2.844 0 0 1-.189-.207A1 1 0 1 0 5.7 9.637a4.688 4.688 0 0 0 .316.347 4.855 4.855 0 0 0 6.858 0l1.705-1.7A4.85 4.85 0 0 0 11.15 0z"></path>
              </g>
            </svg>
          </button>
        </li>
        
        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="blockquote" type="button" title="Blockquote" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Blockquote</title>
              <g fill="currentColor">
                <path d="M6 7H2.016a5.559 5.559 0 0 1 .829-2.464 5.5 5.5 0 0 1 1.694-1.694 1 1 0 1 0-1.078-1.684 7.484 7.484 0 0 0-2.306 2.306A7.739 7.739 0 0 0 0 8.013V14a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"></path>
                <path d="M15 7h-3.984a5.559 5.559 0 0 1 .829-2.464 5.5 5.5 0 0 1 1.694-1.694 1 1 0 1 0-1.078-1.684 7.484 7.484 0 0 0-2.306 2.306A7.739 7.739 0 0 0 9 8.013V14a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li class="md-editor__btn-separator" role="separator"></li>
    
        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="bold" type="button" title="Bold" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Bold</title>
              <g fill="currentColor">
                <path d="M3 15h7a3.988 3.988 0 0 0 2.035-7.425A3.962 3.962 0 0 0 13 5a4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1zm7-2H4V9h6a2 2 0 0 1 0 4zM4 3h5a2 2 0 0 1 0 4H4z"></path>
              </g>
            </svg>
          </button>
        </li>
    
        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="italic" type="button" title="Italic" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Italic</title>
              <g fill="currentColor">
                <path d="M6 15h3a1 1 0 0 0 0-2H7.388l3.333-10H13a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1.612L5.279 13H3a1 1 0 0 0 0 2h3z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li class="md-editor__btn-separator" role="separator"></li>

        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="uList" type="button" title="Unordered list" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Unordered list</title>
              <g fill="currentColor">
                <path d="M14 2H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"></path>
                <circle cx="3" cy="3" r="2"></circle>
                <path d="M14 12H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"></path>
                <circle cx="3" cy="13" r="2"></circle>
                <path d="M14 7H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"></path>
                <circle cx="3" cy="8" r="2"></circle>
              </g>
            </svg>
          </button>
        </li>

        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="oList" type="button" title="Ordered list" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Ordered list</title>
              <g fill="currentColor">
                <path d="M14 2H7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2z"></path>
                <path d="M14 7H7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2z"></path>
                <path d="M14 12H7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2z"></path>
                <path d="M1.854 3.922l.4-.255v2.625a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-1.156-.631l-1.553 1a.75.75 0 0 0 .813 1.261z"></path>
                <path d="M4.177 12.733h-.829a4.857 4.857 0 0 1 .413-.333 2.3 2.3 0 0 0 .977-2.31A1.741 1.741 0 0 0 3.5 8.69a2.093 2.093 0 0 0-2.374 1.391.75.75 0 1 0 1.4.527c.087-.233.37-.514.619-.461a.425.425 0 0 1 .132.3.8.8 0 0 1-.391.731 5.269 5.269 0 0 0-1.751 2 .749.749 0 0 0 .689 1.046h2.353a.75.75 0 0 0 0-1.5z"></path>
              </g>
            </svg>
          </button>
        </li>

        <li>
          <button class="reset md-editor__btn js-tooltip-trigger js-tab-focus" data-md-action="tList" type="button" title="Task list" data-tooltip-class="tooltip--sm">
            <svg class="md-editor__icon icon" viewBox="0 0 16 16">
              <title>Task list</title>
              <g fill="currentColor">
                <path d="M13 0H3a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3zm1 13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z"></path>
                <path d="M10.293 5.293L7 8.586 5.707 7.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414z"></path>
              </g>
            </svg>
          </button>
        </li>
      </menu>
    </div>
    
    <textarea 
      @input="onInput"
      :name="label" 
      :value="modelValue"
      :required="required"
      :rows="rows"
      class="form-control width-100% js-md-editor__content" 
      id="md-editor-content" 
    >
    </textarea>
  </div>
</template>

<script setup>
// Continue building
// https://dev.to/thormeier/build-your-own-wysiwyg-markdown-editor-for-vue-318j

const props = defineProps({
  modelValue: { 
    type: String
  },
  label: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  rows: {
    type: String,
    default: '12'
  }
})

const emit = defineEmits(['update:modelValue'])

function onInput(value) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss">
.md-editor {
  --md-editor-btn-size: 40px;
  --md-editor-btn-icon-size: 16px;
}

.md-editor__btn {
  position: relative;
  display: flex;
  width: var(--md-editor-btn-size);
  height: var(--md-editor-btn-size);
  cursor: pointer;

  transition: transform 0.2s;

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    inset: 0;
    background: alpha(var(--color-contrast-higher), 0.1);
    border-radius: var(--radius-sm);
    transform: scale(0.85);
    opacity: 0;

    transition: 0.2s;
  }

  &:hover {
    &::before {
      transform: scale(1);
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(2px);
  }
}

.md-editor__btn-separator {
  height: calc(var(--md-editor-btn-size)/2);
  width: 1px;
  margin: 0 var(--space-xxs);

  position: relative;
  top: calc(var(--md-editor-btn-size)/4);
  
  background-color: var(--color-contrast-lower);
}

.md-editor__icon {
  position: relative;
  z-index: 2;
  display: block;
  margin: auto;
  --size: var(--md-editor-btn-icon-size);
}
</style>
