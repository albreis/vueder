# Vueder

Componente para gerar formulários a partir de um objeto Javascript usando VueJS.

## Exemplo de formulário
``` javascript
let Form = {
    // Fieldset
    dados: {
        // Legenda do fieldset
        legend: {
            // Texto do fieldset
            text: 'Fieldset A'
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
            tipo: {
                // Label do campo
                label: {
                    // Texto da label
                    text: 'Tipo',
                    // Atributos da tag label
                    attrs: {
                    }
                },
                // Tipo do input
                type: 'select',
                // Nome do input
                name: 'tipo',
                // Atributos da tag DIV que engloba a label e o input
                attrs: {
                    class: 'col-6'
                },
                // Atributos do container que engloba o input
                container_attrs: {
                    class: '',
                    title: ''
                },
                // Validações do campo usando a lib: validate.js https://validatejs.org/
                validations: {
                    email: true
                },
                // Caso seja um select, checkbox ou radio
                // É necessario usar uma função e retornar um objeto ou array de objetos no formato: [{label: {}, value: ''}]
                options: function(field, form, model)  {
                    return {
                        casa: {
                            label: {
                                text: 'Casa',
                                attrs: {
                                    class: 'col-12'
                                }
                            },
                            value: 'casa'
                        },
                        apartamento: {
                            label: {
                                text: 'Apartamento',
                                attrs: {
                                    class: 'col-12'
                                }
                            },
                            value: 'apartamento'
                        }
                    }
                },
                // Eventos para serem adicionados ao input
                events(field, form, model) {
                    return {
                        change() {
                            alert('hello world!')
                        }
                    }
                }
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
                        estados[i] = {label: {
                            text: res.data[i].nome, value: res.data[i].sigla,
                            attrs: {
                                class: 'col-12'
                            }
                    }}
                    }
                    this.options = (field, form, model) => estados
                },
                events (field, form, model) {
                    return {
                        // No evento 'change' do select de estado ele busca as cidades
                        change: async function(event) {
                            let cidades = {}
                            if(model.estado) {
                                var res = await window.axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${model.estado.toLowerCase()}/municipios?orderBy=nome`)
                                for(let i in res.data) {
                                    cidades[i] = {label: {
                                        text: res.data[i].nome, value: res.data[i].nome,
                                        attrs: {
                                            class: 'col-12'
                                        }
                                }}
                                }
                            }
                            form.endereco.fields.cidade.options = () => cidades
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