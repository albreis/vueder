# Vueder

Componente para gerar formulários a partir de um objeto Javascript usando VueJS.

## Exemplo de formulário
``` javascript
let Form = {
    attrs: function(params){
        return {
            method: 'POST'
        }
    },
    events: {
        'submit': (event) => {
        alert(9999)
        }
    },
    fieldsets: {
        dadosPessoais: {
        attrs: {},
        eventos: {},
        legend: {
            text: 'Dados Pessoais'
        },
        fields: {
            nome: {
                            type: 'text',
            name: 'nome',
            attrs: {
                class: 'col-6'
            },
            label: {
                text: 'Nome'
            }
            },
            estado: {
            type: 'select',
            name: 'estado',
            label: {
                text: 'Estado'
            },
            attrs: {
                class: 'col-6'
            },
            options: async function(params) {
                var res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                var estados = new Array
                for(let i in res.data) {
                    estados.push({label: {text: res.data[i].nome}, value: res.data[i].sigla})
                }
                params.field.options = (params) => estados
            }
            },
            button: {
            type: 'button',
            attrs: {
                class: "col-12"
            },
            input_attrs: {
                style: {
                backgroundColor: 'red',
                width: '100px',
                height: '30px',
                padding: 0,
                margin: 0
                }
            },
            label: {
                text: 	'ENVIAR'
            },
            events: {
                click() {
                }
            }
            }
        }
        }
    }
    }
```

Exemplo:

http://jsfiddle.net/ersolucoesweb/f15kqacv

Para endetender como as validações funcionam veja: https://validatejs.org/

## Sistema de grid

O Vueder possui um grid system interno bem simples baseado em 12 colunas.

.col-[1-12] para desktop

.col-m-[1-12] para mobile (abaixo de 800px)