/* eslint-disable */
import axios from 'axios'
import EstadoCidadeForm from './EstadoCidadeForm'
class Form {
    events: any = {
        submit: (event: Event) => {
            event.preventDefault();
        }
    };

    fieldsets: any = {
        endereco: {
            legend: {
                text: 'Endeço do Imóvel'
            },
            fields: {
                estado: EstadoCidadeForm.estado,
                cidade: EstadoCidadeForm.cidade,
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
                    },
                    events(params: any) {}
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
                    events(params: any) {
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

export default new Form