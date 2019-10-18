<template>
    <!--<transition name="toast-fade" @after-leave="afterLeave">-->
        <!--<div v-show="visible" class="kfz-toast" :class="customClass">-->
            <!--{{text}}-->
        <!--</div>-->
    <!--</transition>-->
    <transition name="toast-fade">
        <div v-show="visible" class="kfz-toast" :class="customClass">
            {{text}}
        </div>
    </transition>
    
</template>

<script>
    import './toast.css';

    export default {
        name: 'toast',
        data () {
            return {
                visible: false
            }
        },
        props: {
            text: String,
            position: {
                type: String,
                default: 'middle'
            }
        },
        computed: {
            customClass() {
                return `toast-in-${this.position}`
            }
        },
        methods: {
            // afterLeave() {
            //     document.getElementById('app').removeChild(this.$el);
            // }
        }
    }
</script>