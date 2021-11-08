const { ref, nextTick} = Vue

const enterSound = new Howl({ src: ['app/enter.mp3']});
const exitSound = new Howl({ src: ['app/exit.mp3']});

const app = Vue.createApp({
    setup(context ) {

        /*########## startDialog ####*/
        const startDialog = ref(true)
        /*########## startDialog ####*/
        
        const cards = ref([false, false, false, false, false, false, false, false])
        
        const videoplayer = ref()


        const closeDialog = () => {

            startDialog.value = false
            videoplayer.value.play()
            
        }

        return {
            startDialog,
            closeDialog,
            videoplayer
        }
    },
    mounted (){
        
    }

})


//const player = new Plyr('#player')


app.component('dialogo', {
    data () {
        return {
            dialog: true,
            dialogContent: true
        }
    },
    methods: {
        openDialog(){
            this.dialogContent = true
        },
        closeDialog(){
            this.dialogContent = false
        }
    },
    template: '#dialog'
})


app.mount('#app')
