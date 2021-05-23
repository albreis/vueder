/* eslint-disable */
import axios from 'axios'
export default {
    events: {
        'submit': function(event) {
            event.preventDefault()
            alert(123)
        }
    },
    fieldsets: {
        dados: {
            legend: {
                text: 'Dados do Imóvel'
            },
            attrs: {
            },
            fields: {
                tipo: {
                    label: {
                        text: 'Tipo',
                        attrs: {
                        }
                    },
                    type: 'select',
                    name: 'tipo',
                    attrs: {
                        class: 'col-6'
                    },
                    container_attrs: {
                    },
                    options: function(params)  {
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
                    events(params) {}
                },
                finalidade: {
                    type: 'radio',
                    name: 'finalidade',
                    label: {
                        text: 'Este imóvel está disponível para?',
                        attrs: {
                        }
                    },
                    value: '',
                    container_attrs: {
                    },
                    attrs: {
                        class: 'col-6'
                    },
                    options: function(params) {
                        var options = {
                            venda: {
                                label: {
                                    text: 'Vender',
                                    attrs: {
                                        class: 'col-12'
                                    }
                                },
                                value: 'venda'
                            },
                            aluguel: {
                                label: {
                                    text: 'Alugar',
                                    attrs: {
                                        class: 'col-12'
                                    }
                                },
                                value: 'locacao'
                            }
                        }
                        params.field.options = (params) => options
                    },
                    events(params) {}
                }
            }
        },
        endereco: {
            legend: {
                text: 'Endeço do Imóvel'
            },
            fields: {
                estado: {
                    type: 'select',
                    label: {
                        text: 'Estado',
                        attrs: {
                        }
                    },
                    name: 'estado',
                    value: '',
                    container_attrs: {
                    },
                    attrs: {
                        class: 'col-4'
                    },
                    options: async function(params) { // eslint-disable-line
                        var res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
                        let estados = {}
                        for(let i in res.data) {
                            estados[i] = {label: {text: res.data[i].nome}, value: res.data[i].sigla}
                        }
                        params.field.options = (params) => estados
                    },
                    events (params) { // eslint-disable-line
                        return {
                            change: async function(event) {
                                console.log(params)
                                let cidades = {}
                                if(params.field.value) {
                                    var res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${params.field.value.toLowerCase()}/municipios?orderBy=nome`)
                                    for(let i in res.data) {
                                        cidades[i] = {label: {text: res.data[i].nome}, value: res.data[i].nome}
                                    }
                                }
                                params.fieldset.fields.cidade.options = () => cidades
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
                    container_attrs: {
                    },
                    attrs: {
                        class: 'col-4'
                    },
                    options: async function(params) { // eslint-disable-line
                        return {}
                    },
                    events(params) {}
                },
                bairro: {
                    container_attrs: {
                    },
                    label: {
                        text: 'Bairro',
                        attrs: {
                        }
                    },
                    attrs: {
                        class: 'col-4'
                    },
                    type: 'text',
                    name: 'bairro',
                    value: '',
                    validations: {
                        length: {
                            minimum: 3,
                            message: 'Este campo é obrigatório'
                        }
                    },
                    events(params) {}
                },
                button: {
                    type: 'button',
                    label: {
                        text: 'ENVIAR'
                    },
                    attrs: {
                        class: 'col-12'
                    },
                    input_attrs: {
                        type: 'submit',
                        value: 'Enviar'
                    },
                    validations: {},
                    events(params) {
                        return {
                            click() {
                            }
                        }
                    }
                }
            }
        }
    }
}