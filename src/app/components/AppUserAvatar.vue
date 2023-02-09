<template>
  <div class="avatar" :class="`avatar--${size}`">
    <figure class="avatar__figure" role="img">
      <img v-if="image" :src="image" class="avatar__img" alt="User avatar" title="User avatar">
      <div v-else class="avatar__initials"><span>{{ createInitials(name) }}</span></div>
    </figure>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { 
    type: String,
  },
  image: { 
    type: String,
  },
  size: {
    type: String,
    default: 'md',
  },
})

function createInitials(name) {
  const names = name.split(' ')
  let initials = names[0].substring(0, 1).toUpperCase()
  
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}
</script>

<style lang="scss">
.avatar {
  font-size: 2em;
  position: relative;
}

.avatar__figure {
  width: 1.2em;
  height: 0;
  padding-bottom: 1.2em;
  border-radius: 50%; // avatar border-radius
  overflow: hidden;
}

.avatar__img, .avatar__placeholder {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 1.2em;
  height: 1.2em;
  border-radius: inherit;
}

.avatar--btn {
  @include reset;
  cursor: pointer;
}

// sizes
.avatar--sm {
  font-size: 1em;
}

.avatar--md {
  font-size: 2em;
}

.avatar--lg {
  font-size: 2em;
}

// status
.avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-block;
  width: 0.2em;
  height: 0.2em;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--color-bg);
  background-color: var(--color-contrast-medium);
}

.avatar__status--active {
  background-color: var(--color-success);
}

.avatar__status--busy {
  background-color: var(--color-error);
}

.avatar__initials, .avatar__users-counter {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.2em;
  height: 1.2em;
  border-radius: inherit;
  border: 1px solid var(--color-bg-darker);
  color: var(--color-contrast-higher);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar__initials { // initials - show letters if you don't have img
  text-align: center;
  background: var(--color-white);

  span {
    font-size: 0.5em;
  }
}

.avatar__users-counter { // tot number of users in a group of avatars
  span {
    font-size: 0.42em;
  }
}

// group
.avatar-group {
  display: flex;
  // font-size: 1.75em; // optional -> edit the size of all the avatars in the group

  .avatar {
    margin-left: -0.1em;
  }

  .avatar__figure {
    box-shadow: 0 0 0 3px var(--color-bg);
  }
}
</style>
