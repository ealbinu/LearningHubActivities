const { ref, nextTick} = Vue
const flipSound = new Howl({ src: ['app/flip.mp3']});
const changeSound = new Howl({ src: ['app/change.mp3']});
const app = Vue.createApp({
    setup(context ) {

        
        const slide = ref(0)
        const startDialog = ref(true)

        const prevSlide = () => {
            if(slide.value>0){
                slide.value -=1
            }
            changeSound.play()
        }
        const nextSlide = () => {
            if(slide.value<cards.value.length-1){
                slide.value+=1
            }
            changeSound.play()
        }

        const cards = ref([
            {
                view: 'front',
                front: '¿Con que otro nombre se le conoce a la 4ta revolución industrial?',
                back: 'Industria 4.0'
            },
            {
                view: 'front',
                front: 'Son grandes transformaciones sociales debidas a los avances en tecnología, fruto de descubrimientos importantes en el desarrollo científico de la humanidad que impactan directamente en la forma de trabajar de los seres humanos',
                back: 'Revoluciones industriales',
            },
            {
                view: 'front',
                front: 'En que siglo aconteció la primera revolución industrial, la cual se dió gracias a la mecanización y a la introducción de maquinas de vapor',
                back: 'Siglo XVIII',
            },
            {
                view: 'front',
                front: 'Esta revolución industrial se vió marcada por el inicio de la producción en masa, el montaje y la electricidad  y sucedió en el siglo XIX ',
                back: '2da revolución Indistrial ',
            },
            {
                view: 'front',
                front: '¿Que cambio en la industria marcó el inicio de la tercera revolución industrial?',
                back: 'La automatización en las empresas y la introducción de las tecnologías de información y comunicación (TIC’S)',
            },
            {
                view: 'front',
                front: '¿Quién presentó por primera vez el término “4ta revolución industrial” y además es fundador del foro económico mundial y autor del libro con el mismo nombre?',
                back: 'Klaus Schwab',
            },
            {
                view: 'front',
                front: '¿Cuáles son algunas de las tecnologías más representativas que hacen posible la transformación hacia las industrias 4.0?',
                back: 'Internet de las cosas, ciberseguridad, big data, sensores digitales, programación, impresión 3D, cloud computing, inteligencia artificial.',
            },
        ])

        return {
            startDialog,
            cards,
            slide,
            prevSlide,
            nextSlide

        }
    },

})


app.component('flipcard', {
    props: ['fronttext', 'backtext', 'active'],
    data () {
        return {
            isfront: true,
        }
    },
    methods: {
        flip () {
            this.isfront = !this.isfront
            flipSound.play()
        },
    },
    mounted(){

    },
    template: '#flipcard'
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

