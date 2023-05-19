const {writeFileSync} = require('fs');
const autos = require('./autos.json')
const personas = require('./personas.json')
function guardarCambios (autos) {
    writeFileSync('./autos.json',JSON.stringify(autos,null,3),'utf-8')
}

const concesionaria = {
    autos,
    buscarAuto : function(patente){
       return autos.find(auto => auto.patente === patente) || null
    },
    venderAuto : function(patente){
       let auto = this.buscarAuto(patente)
       const autosModificados = this.autos.map(auto =>{
        if(auto.patente === patente){
            auto.vendido = true
        }
        return auto
       })
       guardarCambios(autosModificados)
       return autosModificados.find(auto => auto.patente === patente)
    },
    autosParaLaVenta : function(){
        return this.autos.filter(auto => !auto.vendido)
    },
    autosNuevos : function(){
        return this.autosParaLaVenta().filter(auto => auto.km <100)
    },
    listaDeVenta : function(){
        return this.autos.filter(auto => auto.vendido).map(auto => auto.precio)
    },
    totalDeVentas : function(){
        return this.listaDeVenta().reduce((acum,num) => acum + num,0)
    },
    puedeComprar : function(auto,persona){
        return auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas
    }
}

console.log(concesionaria.puedeComprar(autos[1],personas[2]))