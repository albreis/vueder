# Vueder

Componente para gerar formulários a partir de um objeto Javascript usando VueJS.

## Exemplo de formulário
``` javascript
let Form = {
    // Fieldset
    dados: {
        // Legenda do fieldset
        legend: {
            text: 'Dados pessoais',
            // Atributos da tag fieldset
            attrs: {
                class: 'classe-a',
                title: 'Título'
            }
        },
        // Atributos da tag fieldset
        attrs: {
        },
        // Campos do fieldset
        fields: {
            // Campo
            nome: {
                label: {
                    // Label do campo
                    text: 'Nome',
                    // Atributos da tag label
                    attrs: {
                        style: {
                            fontSize: '30px'
                        },
                    }
                },
                container_attrs: {
                    class: 'row'
                },
                // Atributos da tag fieldset
                attrs: {
                    class: 'col-6'
                },
                // Atributos do input
                input_attrs: {
                    style: {
                        padding: '5px 15px'
                    },
                    placeholder: 'Digite seu nome aqui...'
                },
                // Tipo do input
                type: 'text',
                // Nome no input
                name: 'nome'
            },
            sobrenome: {
                label: {
                    text: 'Sobrenome',
                    attrs: {
                        style: {
                            fontSize: '30px'
                        },
                    }
                },
                container_attrs: {
                    class: 'row'
                },
                attrs: {
                    class: 'col-6'
                },
                input_attrs: {
                    style: {
                        padding: '5px 15px'
                    },
                    placeholder: 'Digite seu nome aqui...'
                },
                type: 'text'
            },
            estado: {
                type: 'select',
                label: {
                    text: 'Estado',
                    attrs: {
                    }
                },
                name: 'estado',
                value: '',
                container: {
                },
                attrs: {
                    class: 'row'
                },
                options: async function(field, form, model) { 
                    // Retorna opções de forma sincrona usando axios
                    // Deve ser usado dessa forma para chamada de recursos externos
                    var res = await window.axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
                    let estados = {}
                    for(let i in res.data) {
                        estados[i] = {label: {text: res.data[i].nome}, value: res.data[i].sigla}
                    }
                    this.options = (field, form, model) => estados
                },
                events (field, form, model) {
                    return {
                        change: async function(event) {
                            // Ao alterar o input de estado ele busca as cidades
                            let cidades = {}
                            if(model.estado) {
                                var res = await window.axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${model.estado.toLowerCase()}/municipios?orderBy=nome`)
                                for(let i in res.data) {
                                    cidades[i] = {label: {text: res.data[i].nome}, value: res.data[i].nome}
                                }
                            }
                            console.log(form)
                            form.dados.fields.cidade.options = (field, form, model) => cidades;
                        }
                    }
                }
            },
            cidade: {
                type: 'select',
                name: 'cidade',
                label: {
                    text: 'Cidade',
                    attrs: {
                    }
                },
                value: '',
                container: {
                },
                attrs: {
                    class: 'row'
                },
                options: async function(field, form, model) { // eslint-disable-line
                    return {}
                },
                events(field, form, model) {}
            }
        }
    }
}
```

Para endetender como as validações funcionam veja: https://validatejs.org/

## Sistema de grid

O Vueder possui um grid system interno bem simples baseado em 12 colunas.

.col-[1-12] para desktop

.col-m-[1-12] para mobile (abaixo de 800px)

As col-* precisam estar abaixo de uma .row para funcionar