

const { ref, nextTick} = Vue

const enterSound = new Howl({ src: ['app/enter.mp3']});
const exitSound = new Howl({ src: ['app/exit.mp3']});
const winSound = new Howl({ src: ['app/win.mp3']});

const app = Vue.createApp({
    components:{simplebar:'simplebar-vue'},
    setup(context ) {

        /*########## startDialog ####*/
        const startDialog = ref(true)
        const instructions = ref(true)
        /*########## startDialog ####*/

        const dragging = ref(false)
        const slide = ref(0)

        const oks = ref(0)

        
        const quest = ref([
            {id:2, t:'La maquina de inyección de plástico se descompuso ya que una de las piezas se sobrecalentó y durante el tiempo que se tardaron en repararla se paró completamente la producción.'},
            {id:1, t:'La materia prima que tenían en almacen no fue suficiente para la producción y el personal se dió cuenta muy tarde, lo cual retrasó la producción..'},
            {id:3, t:'El gasto de energía electrica se elevó bastante durante los últimos 3 meses, lo cual causó falta de flujo en efectivo para resurtir materiales.'},
            {id:4, t:'La camioneta en la que se repartían los juguetes sufrió una avería en el motor a la mitad del camino.'},
            {id:0, t:'Durante el último mes el personal estuvo llegando tarde, saliendo temprano y tomando más tiempo de lo debido para la comida lo que retrasó notablemente la producción.'},
        ])
        
        
        const items = ref([
            {id:0, t: 'Instalar control de acceso mediante reconocimiento facial o huella dactilar y enlazar la información a una base de datos que notifique las irregularidades en tiempo real.'},
            {id:1, t: 'Implementar un sistema de monitoreo de niveles de inventario mediante sensores y utlizar un sistema predictivo basado en datos de consumo para hacer solictudes antes del desabasto.'},
            {id:2, t: 'Utilizar sensores en las maquinas que arrojen información importante como temperatura o nivel de desgaste para controlar su uso y programar el mantenimiento preventivo.'},
            {id:3, t: 'Instalar luminaria conectada a internet que permita controlar y monitorear su uso, así como sensores de temperatura que permitan controlar y monitorear el uso de aires acondicionados.'},
            {id:4, t: 'Instalar sistema de control y seguimiento a la flotilla de automóviles para controlar el desgaste de autopartes, monitorear el uso de gasolina y rutas de manejo en tiempo real.'}
        ])

        
        const hideInstructions = () => {
            instructions.value = false
            setTimeout(function () {
                startDraggable()
            }, 500)
        }
        //hideInstructions()

        const startDraggable = () => {
            
            const droppable = new Draggable.Droppable(document.querySelectorAll('.droparea'), {
                draggable: ".drag",
                dropzone: ".draggables",
                collidables: '.q',
                plugins: [Draggable.Plugins.Collidable]
            })
            
            droppable.on('droppable:start', function (event) {
                dragging.value = true
            });
            droppable.on('droppable:stop', function (event) {
                dragging.value = false

                if(event.data.dropzone.classList.contains('dropzone')){                    
                    event.data.dropzone.classList.add('animate__animated','animate__heartBeat')
                    //console.log('aprobado')
                    enterSound.play()
                    oks.value++;
                    if(oks.value==5){
                        console.log('FIN')
                        setTimeout(function () {
                            winSound.play()
                        },1000)
                    }
                } else {
                    //console.log('cancelado')


                }
                
            });
            droppable.on('droppable:dropped', function (event) {
                if(event.data.dropzone.classList.contains('dropzone')){
                    let att = event.data.dropzone.getAttribute('data')
                    let dragAtt = event.data.dragEvent.data.source.getAttribute('data')
                    if(att != dragAtt){
                        event.cancel()
                        event.data.dropzone.classList.add('animate__animated','animate__swing')
                        if(!exitSound.playing()){
                            exitSound.play()
                        }
                        setTimeout(function () {
                            event.data.dropzone.classList.remove('animate__animated','animate__swing')
                        }, 1000)
                    }
                }
            });
        }

        const move = (dir) => {
            if(dir=='l' && slide.value>0){
                slide.value--;
            } else if (dir=='r' && slide.value<4){
                slide.value++;
            }
        }

        return {
            startDialog,
            instructions,
            hideInstructions,
            items,
            quest,
            move,
            slide,
            dragging,
            oks
        }
    },

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