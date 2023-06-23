<template>
    <VMenu placement="top" :delay="{
        hide: 50
    }">
        <span>
            {{ row.data[column] }}
        </span>
        <template #popper>
            <div @click.prevent="copy(row.uid, column)" class="table-cell-inner text-center">
                <template v-if="!isCopied">
                    <IconEmbed size="md" />
                    <p>Embed</p>
                </template>
                <span v-else>Copied!</span>
            </div>
        </template>
    </VMenu>
</template>

<script setup>
defineProps({
    row: Object,
    column: String
})

import IconEmbed from '@/app/components/base/icons/IconEmbed.vue'
import useClipboard from '@/app/composables/base/useClipboard'
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const { copyToClipboard } = useClipboard()
const isCopied = ref(false)
const copy = (uid, column) => {
    copyToClipboard(`<stream-cell uid="${uid}" col="${column}"></stream-cell>`)
    isCopied.value = true
    toast.success("Copied!", {
        autoClose: 2500,
        position: 'top-center'
    });
}
</script>