<template>
    <div class="loading_box">
        <span class="loading" :class="{hide : !visible}">
            <i class="icon_load"></i>
            加载中......
        </span>
        <slot></slot>
    </div>
</template>

<script>
    import './loading.css';

    export default {
        name: "loading",
        props: {
            "visible": {
                type: Boolean,
                required: true
            }
        }
    }
</script>