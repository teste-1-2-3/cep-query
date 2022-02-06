const emitter = document.querySelector('p');
const receiver = document.querySelector('input');
const panel = document.querySelector('span');

const input = {

    all: function(key, element, subElement){
        if(this.notNumber(key)) this.erase(key, element);
        if(this.goal(element)) this.showWarning(subElement); else this.hiddenWarning(subElement);
    },

    notNumber: key => !Number.isInteger(Number.parseInt(key)),

    goal: element => element.value.length === 8,

    erase: (key, element) => element.value = element.value.replace(key, ''),

    showWarning: subElement => subElement.innerHTML = 'Precione Enter para fazer a consulta !',

    hiddenWarning: subElement => subElement.innerHTML = '',
}

const request = async cep => {
    const path = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(path);
    const data = await response.json();

    if(!data.erro){
        emitter.innerHTML = '';
        Object.entries(data).forEach(info => emitter.innerHTML += `${info[0]}: ${info[1]}<br/>`)
    }else{
        emitter.innerHTML = 'CEP Inexístente !';
    }
}

receiver.addEventListener('keyup', e => {
    input.all(e.key, receiver, panel);
    if(e.key === 'Enter') if(input.goal(receiver)) request(receiver.value); else emitter.innerHTML = 'CEP Inválido !';
});