<template>
    <div class="file-gallery grid gap-xs">
        <div
            v-for="(file, index) in files"
            :key="index"
            @click="select(file)"
            :style="{ backgroundImage: 'url(' + `${file.src}` + ')' }"
            class="file-gallery__item col-4"
        />
    </div>
</template>

<style lang="scss">
.file-gallery {
    &__item {
        height: 160px;
        display: inline-block;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: var(--radius-md);
        transition: box-shadow;
        transition-duration: .4s;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
