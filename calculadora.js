// https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

function ajustaPontoPlaceholder() {

    document.querySelector('#visor').value;

    const ponto = 10 - parseFloat(document.querySelector('#visor').value).countDecimals();
    document.querySelector('#placeholder').value = '';
    for (let i = 0; i < 10; i++) {
        if (i === ponto) {
            document.querySelector('#placeholder').value += '.';
        }
        document.querySelector('#placeholder').value += '8';

    }

}


ajustaPontoPlaceholder();


function getVisor() {

    return document.querySelector('#visor');

}

addEventListener('click', e => {

    if (e.target.classList.contains('entrada')) {

        if (Boolean(localStorage.getItem('novoValor'))) {
            getVisor().value = '';
            localStorage.removeItem('novoValor');
        }

        if (parseInt(visor.value) === 0) {
            visor.value = ''
        }

        getVisor().value += e.target.innerHTML;

    }

    ajustaPontoPlaceholder();

});


function botaoC() {

    getVisor().value = 0;

}


function botaoCE() {

    botaoC();

    localStorage.removeItem('regX');
    localStorage.removeItem('regY');
    localStorage.removeItem('operacao');
    localStorage.removeItem('novaOperacao');
    localStorage.removeItem('novoValor');
}


function erro() {

    getVisor().value = 'Erro';
    localStorage.setItem('novoValor', true);
}


function mudaSinal() {
    getVisor().value = -parseFloat(getVisor().value);
}


function inverso() {
    getVisor().value = 1 / parseFloat(getVisor().value);
}


function quadrado() {
    getVisor().value = parseFloat(getVisor().value) ** 2;
}


function raizQuadrada() {
    getVisor().value = Math.sqrt(parseFloat(getVisor().value));
}


function setRegY(operacao) {
    localStorage.setItem('operacao', operacao);
    localStorage.setItem('regY', getVisor().value);
    localStorage.setItem('novaOperacao', true);
    localStorage.setItem('novoValor', true);
}

function calcula() {

    if (Boolean(localStorage.getItem('novaOperacao'))) {
        localStorage.setItem('regX', getVisor().value);
    }

    const x = parseFloat(localStorage.getItem('regX'));
    const y = parseFloat(localStorage.getItem('regY'));
    const operacao = localStorage.getItem('operacao');

    switch (operacao) {
        case 'soma':
            getVisor().value = y + x;
            break;

        case 'subtracao':
            getVisor().value = y - x;
            break;

        case 'multiplicacao':
            getVisor().value = y * x;
            break;

        case 'divisao':
            getVisor().value = y / x;
            break;

        default:
            break;
    }

    setRegY(operacao);
    localStorage.removeItem('novaOperacao');
    ajustaPontoPlaceholder();

}


// Botão MC
function cancelaMemoria() {
    localStorage.removeItem('regM');
}

// Botão MS
function registraMemoria() {
    localStorage.setItem('regM', getVisor().value);
    localStorage.setItem('novoValor', true);
}

// Botão RM
function recuperaMemoria() {
    if (Boolean(localStorage.getItem('regM'))) {
        getVisor().value = localStorage.getItem('regM');
    }
}

// Botão M+
function somaMemoria() {
    const regM = Boolean(localStorage.getItem('regM')) ? parseFloat(localStorage.getItem('regM')) : 0;
    localStorage.setItem('regM', regM + parseFloat(getVisor().value));
}

// Botão M-
function subtraiMemoria() {
    const regM = Boolean(localStorage.getItem('regM')) ? parseFloat(localStorage.getItem('regM')) : 0;
    localStorage.setItem('regM', regM - parseFloat(getVisor().value));
}
