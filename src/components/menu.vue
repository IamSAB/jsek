<template>
    <ul>
        <li v-for="(item, index) in links" :key="index" class="mx-2">
            <factor-link
                :key="index"
                :path="item.path"
                :event="item.event"
                :target="item.target"
                class="text-white hover:border-b-2 border-blue-100 hover:text-blue-100 uppercase font-semibold tracking-wide text-sm"
            >
            <span v-if="item.name" v-formatted-text="item.name" />
            </factor-link>
        </li>
    </ul>
</template>

<script>
import { factorLink } from "@factor/ui"

export default {
    components: {
        factorLink

    },
    props: {
        links: Array
    }
}
</script>