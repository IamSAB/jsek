<template>
    <time :datetime="iso">{{ formatted }}</time>
</template>
<script lang="ts">
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de-ch";

dayjs.extend(customParseFormat);
dayjs.locale("de-ch");

export default {
    props: {
        datetime: {
            type: String,
            required: true
        },
        parse: {
            type: String
        },
        format: {
            type: String,
            default: () => "DD. MMM YYYY"
        }
    },
    computed: {
        dayjs() {
            return this.parse ? dayjs(this.datetime, this.parse) : dayjs(this.datetime);
        },
        iso() {
            return this.dayjs.format()
        },
        formatted() {
            return this.dayjs.format(this.format)
        }
    }
}
</script>