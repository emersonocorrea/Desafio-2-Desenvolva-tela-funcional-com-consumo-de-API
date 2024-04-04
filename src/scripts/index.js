


async function getAddressByCep(){

    const cepArea = document.querySelector('.cepArea')
    cepArea.innerHTML = ''

    

    const cep = document.querySelector('#cep').value

    const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
    const json = await response.json()    
    
    if(json.length !== 0){
        cepArea.innerHTML = ''   
        
        
        
        for(const i in json){
            if(i === 'logradouro' ){
                const logra = document.createElement('p')
                logra.innerText = json[i]
                cepArea.appendChild(logra)              

            }
            if( i === 'bairro'){
                const bairro = document.createElement('p')
                bairro.innerText = json[i]
                cepArea.appendChild(bairro)
                
            }
            if(i === 'uf'){
                
                const uf = document.createElement('p')                
                uf.innerText = json[i]
                cepArea.appendChild(uf)
            }

            
        }


    }else{
        cepArea.innerHTML = 'nenhum endereço encontrado'
    }

       

}

async function getTemperature(){
    const lat = document.querySelector('.lat').value
    const long = document.querySelector('.long').value

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
    const json = await response.json()

    if(json.hourly.temperature_2m !== 0){
        
        const temp = document.querySelector('.temp')
        temp.innerText = `Previsão de tempo de acordo com a região: ${json.hourly.temperature_2m[0]}° C`

    }else{
        alert('flaha na conexao')
    }
    
}




const btn = document.querySelector('#submit')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    
    if(document.querySelector('#cep').value.length === 8){
        getAddressByCep()
        
        
    }else{
        alert('preencha corretamente o cep')
    }
    getTemperature()
    
    document.querySelector('.lat').value = ''
    document.querySelector('.long').value = ''
    document.querySelector('#cep').value = ''
})

