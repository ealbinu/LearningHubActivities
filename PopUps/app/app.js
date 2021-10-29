const { ref, nextTick} = Vue

const enterSound = new Howl({ src: ['app/enter.mp3']});
const exitSound = new Howl({ src: ['app/exit.mp3']});

const app = Vue.createApp({
    setup(context ) {

        /*########## startDialog ####*/
        const startDialog = ref(true)
        /*########## startDialog ####*/
        
        const cards = ref([false, false, false, false, false, false, false, false])
        

        return {
            startDialog,
            cards
        }
    },

})



app.component('popup', {
    props: ['button'],
    data () {
        return {
            dialog: false,

        }
    },
    methods: {
        openDialog(){
            this.dialog = true
            enterSound.play()
        },
        closeDialog(){
            this.dialog = false
            exitSound.play()
        }
    },
    template: '#popup'
})

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
