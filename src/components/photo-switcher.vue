<template>
    <div class="flex photo-switcher">
        <photo class="flex-1 w-full h-full" :source="current" />
        <aside v-if="images.length > 1" :class="`w-1/5 grid grid-rows-${images.length-1}`">
            <photo v-for="(img, i) in images" @click.native="select(i)" v-show="i != selected" :key="i" class="h-full cursor-pointer" :source="img" />
        </aside>
    </div>
</template>

<script lang="ts">
import photo from "./photo.vue"
import { stored } from "@factor/api";

export default {
    components: {
        photo
    },
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            selected: 0
        }
    },
    computed: {
        current (this: any) {
            return this.images[this.selected] || ""
        }
    },
    methods: {
        select(this: any, i: number) {
            console.log(i)
            this.selected = i
        }
    }
}
</script>

<style lang="postcss">
.photo-switcher {
    aside img:hover {
        filter: brightness(150%)
    }
}
</style>