<template>
  <header v-if="auth.user" class="f-header position-relative border-bottom">
    <!-- <div class="f-header__mobile-content container max-width-lg">
      <a href="#0" class="f-header__logo">
        <svg width="104" height="30" viewBox="0 0 104 30"><title>Go to homepage</title><path d="M37.54 24.08V3.72h4.92v16.37h8.47v4zM60.47 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8 8 0 015.64-2.18 8.07 8.07 0 015.68 2.2 8.49 8.49 0 012 5.69 8.63 8.63 0 01-1.78 5.38 7.6 7.6 0 01-5.89 2.49zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.79 3-2.79 4.26.32 4.23 2.82 4.23zM95.49 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8.4 8.4 0 0111.31 0 8.43 8.43 0 012 5.69 8.6 8.6 0 01-1.77 5.38 7.6 7.6 0 01-5.89 2.51zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.8 3-2.8 4.26.31 4.23 2.83 4.23zM77.66 30c-5.74 0-7-3.25-7.23-4.52l4.6-.26c.41.91 1.17 1.41 2.76 1.41a2.45 2.45 0 002.82-2.53v-2.68a7 7 0 01-1.7 1.75 6.12 6.12 0 01-5.85-.08c-2.41-1.37-3-4.25-3-6.66 0-.89.12-3.67 1.45-5.42a5.67 5.67 0 014.64-2.4c1.2 0 3 .25 4.46 2.82V8.81h4.85v15.33a5.2 5.2 0 01-2.12 4.32A9.92 9.92 0 0177.66 30zm.15-9.66c2.53 0 2.81-2.69 2.81-3.91s-.31-4-2.81-4-2.81 2.8-2.81 4 .27 3.91 2.81 3.91zM55.56 3.72h9.81v2.41h-9.81z" fill="var(--color-contrast-higher)"/><circle cx="15" cy="15" r="15" fill="var(--color-primary)"/></svg>
      </a>

      <button class="reset anim-menu-btn f-header__nav-control" aria-label="Toggle menu">
        <i class="anim-menu-btn__icon anim-menu-btn__icon--close" aria-hidden="true"></i>
      </button>
    </div> -->

    <div class="f-header__nav" role="navigation">
      <div class="f-header__nav-grid container">
        
        <!-- <div class="f-header__nav-logo-wrapper margin-right-md">
          <RouterLink :to="{ name: 'organizations' }" class="f-header__logo">
            <UserAvatar name="Yolo Fam"/>
          </RouterLink>
        </div> -->
        
        <ul class="f-header__list">
          <!-- Organization(s) -->
          <!-- <li class="f-header__item border-right padding-right-xs">
            <router-link 
              :to="{ name: 'organizations'}" 
              class="f-header__link"
            >
              Organizations
            </router-link>
          </li> -->
          
          <!-- <li class="f-header__item border-right padding-right-sm">
            <button class="f-header__link reset cursor-pointer">
              <span>BloomCU</span>
              <svg class="f-header__dropdown-icon icon" height="12" width="12" viewBox="0 0 12 12"><g fill="#000000"><path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" fill="#000000"></path></g></svg>
            </button>
            <ul class="f-header__dropdown">
              <li>
                <RouterLink :to="{ name: 'organizations' }" class="f-header__dropdown-link border-bottom">All Organizations</RouterLink>
              </li>
              <li>
                <p class="text-xs text-uppercase letter-spacing-lg color-contrast-low margin-0 padding-top-sm padding-bottom-xxs padding-left-sm">Recent</p>
              </li>
              <li>
                <RouterLink :to="{ name: 'assets', params: { organization: 'bloomcu' }}" class="f-header__dropdown-link">BloomCU</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'assets', params: { organization: 'socal' }}" class="f-header__dropdown-link">SoCal</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'assets', params: { organization: 'tfcu' }}" class="f-header__dropdown-link">TFCU</RouterLink>
              </li>
            </ul>
          </li> -->
          
          <!-- <li class="f-header__item">
            <router-link 
              :to="{ name: 'sites', params: { organization: auth.organization}}" 
              class="f-header__link"
            >
              Sites
            </router-link>
          </li> -->
          
          <li class="f-header__item">
            <router-link 
              :to="{ name: 'rates', params: { organization: auth.organization} }" 
              class="f-header__link"
            >
              Rates
            </router-link>
          </li>
          
          <!-- <li class="f-header__item">
            <router-link 
              :to="{ name: 'rates-import', params: { organization: auth.organization} }" 
              class="f-header__link"
            >
              Import
            </router-link>
          </li> -->
        </ul>
        
        <!-- Search -->
        <!-- <div class="f-header__search margin-right-md"> -->
          <!-- <AppNavigationSearch/> -->
        <!-- </div> -->
        
        <!-- Settings -->
        <ul class="f-header__list">
          <!-- <li v-if="!auth.user.organization.subscribed" class="f-header__item">
            <RouterLink :to="{ name: 'subscription-plans' }" class="f-header__link reset cursor-pointer">
              Upgrade ✨
            </RouterLink>
          </li> -->
          
          <li class="f-header__item">
            <button class="f-header__link reset cursor-pointer">
              <span>{{ auth.user.name }}</span>
              <svg class="f-header__dropdown-icon icon" height="12" width="12" viewBox="0 0 12 12"><g fill="#000000"><path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" fill="#000000"></path></g></svg>
            </button>
            <ul class="f-header__dropdown f-header__dropdown--on-right">
              <li class="f-header__dropdown-container">
                <RouterLink :to="{ name: 'users' }" class="f-header__dropdown-link">People</RouterLink>
                <RouterLink :to="{ name: 'settings' }" class="f-header__dropdown-link">Settings</RouterLink>
                <RouterLink :to="{ name: 'logout' }" class="f-header__dropdown-link">Log out</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/domain/base/auth/store/useAuthStore'
// import UserAvatar from '@/domain/base/users/components/UserAvatar.vue'
// import AppNavigationSearch from '@/app/components/navigation/AppNavigationSearch.vue'

const auth = useAuthStore()
</script>

<style lang="scss">
:root {
  --f-header-height: 50px;
  --f-header-logo-width: 100%;

  @include breakpoint(md) {
    --f-header-height: 60px;
  }
}

.f-header {
  height: var(--f-header-height);
  width: 100%;
  z-index: var(--z-index-header, 3); 

  &::before { /* used in JS to detect menu style */
    display: none;
    content: 'mobile';
  }
}

.f-header--expanded {
  /* class added when navigation is visible - small devices only */
}

.f-header__mobile-content { /* logo + menu button on small devices */
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.f-header__logo {
  display: block;
  width: var(--f-header-logo-width);
  flex-shrink: 0;
  text-decoration: none;

  svg, img {
    display: block;
  }
}

.f-header__nav-control { /* menu button */
  --anim-menu-btn-size: 40px;
  --anim-menu-btn-icon-size: 12px;
  --anim-menu-btn-icon-stroke: 2px;
}

.f-header__nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(100vh - var(--f-header-offset, 0px));
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 0 0 var(--space-md);
  background-color: var(--color-bg);
  box-shadow: var(--shadow-md);
  z-index: 1;

  visibility: hidden;
  opacity: 0;
  transform: translateY(-1em);

  &::before { /* top header bg + border */
    content: '';
    display: block;
    position: sticky;
    top: 0;
    height: var(--f-header-height);
    background-color: inherit;
    border-bottom: 1px solid var(--color-contrast-lower);
  }
}

.f-header__nav--is-visible {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition: visibility 0s, opacity .3s, transform .3s;
}

.f-header__nav-logo-wrapper {
  display: none; /* hide logo nav on small devices */
}

.f-header__item {
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-contrast-lower);
}

.f-header__dropdown-icon {
  --size: 16px;
  flex-shrink: 0;
  margin: 0 10px 0 auto;
  display: none; /* hide on mobile if link */

  .f-header__dropdown-control & {
    display: block;
  }
}

.f-header__link,
.f-header__dropdown-control,
.f-header__dropdown-link,
.f-header__btn,
.f-header__form-control {
  font-size: var(--text-md);
}

.f-header__link,
.f-header__dropdown-control,
.f-header__dropdown-link {
  display: flex;
  align-items: center;
  color: var(--color-contrast-high);
  text-decoration: none;
  padding: var(--space-xs) 0;

  &:hover,
  &[aria-current="page"] {
    color: var(--color-primary);
  }
}

.f-header__btn,
.f-header__form-control {
  width: 100%;
  margin: var(--space-xs) 0;
}

.f-header__dropdown-control {
  width: 100%;
}

.f-header__dropdown-control {
  + .f-header__dropdown {
    display: none;
  }

  &[aria-expanded="true"] + .f-header__dropdown {
    display: block;
  }
}

@include breakpoint(md) {
  .f-header::before {
    content: 'desktop';
  }

  .f-header__mobile-content {
    display: none; /* hide logo + menu (mobile content) */
  }

  .f-header__nav {
    /* reset */
    position: static;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition: none;
    max-height: none;
    overflow: visible;
    overscroll-behavior: auto;
    height: var(--f-header-height);

    &::before { /* reset */
      display: none;
    }
  }

  .f-header__nav-logo-wrapper {
    display: flex;
  }

  .f-header__nav-grid,
  .f-header__list {
    display: flex;
    align-items: center;
  }

  .f-header__nav-grid {
    height: 100%;
    justify-content: space-between;
  }
  
  .f-header__search {
    width: 100%;
  }

  .f-header__item {
    position: relative;
    border-bottom: none;
    margin-right: var(--space-sm); /* margin between nav items */
    
    &:first-child {
      .f-header__link {
        padding-left: 0px;
      }
    }
    
    &:last-child {
      margin-right: 0px;
    }
  }

  .f-header__dropdown-icon {
    --size: 12px !important;
    display: block;
    margin: 0 0 0 var(--space-xxs);
  }

  .f-header__link,
  .f-header__dropdown-control,
  .f-header__dropdown-link,
  .f-header__btn,
  .f-header__form-control {
    font-size: 1.125rem;
  }

  .f-header__link {
    padding: var(--space-xxxs) var(--space-xxs);
    
    &:first-child {
      padding-left: none;
    }
  }

  .f-header__link--icon {
    span {
      display: none; /* hide icon label */
    }
  }

  .f-header__btn,
  .f-header__form-control {
    margin: 0; /* reset */
  }

  .f-header__dropdown {
    position: absolute;
    top: 100%;
    width: 220px;
    padding: var(--space-xs) 0 0;
    z-index: var(--z-index-popover, 5); 

    /* hide */
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.2s 0.2s, opacity 0.2s 0s;
    
    &--on-right {
      left: calc(50% - 150px);
    }
    
    .f-header__dropdown-container {
      background-color: var(--color-bg-light);
      border-radius: var(--radius-md);
      box-shadow: var(--inner-glow), var(--shadow-md);
    }

    .f-header__dropdown-control + & {
      display: block; /* reset style */
    }

    .f-header__item:hover &,
    .f-header__dropdown-control[aria-expanded="true"] + & {
      pointer-events: auto;
      visibility: visible;
      opacity: 1;
      transition: visibility 0.2s 0s, opacity 0.2s 0s;
    }
  }

  .f-header__dropdown-link {
    color: var(--color-contrast-high);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
    transition: .2s;

    &:hover {
      background-color: alpha(var(--color-contrast-higher), 0.075);
      color: var(--color-contrast-higher);
    }
  }
}

// html:not(.js) {
//   .f-header {
//     height: auto;
//   }
// 
//   .f-header__nav-control {
//     display: none;
//   }
// 
//   .f-header__nav {
//     position: static;
//     padding: var(--space-xxs) 0 var(--space-md);
//     box-shadow: none;
//     visibility: visible;
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
</style>
