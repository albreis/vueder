/* eslint-disable */
export default {
    events: {
        submit(event) {
            event.preventDefault();
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
                    value: 'apartamento',
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
                    type: 'checkbox',
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
                    events: {
                        click: "alert(1233)"
                    }
                }
            }
        }
    }
}