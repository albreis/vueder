/* eslint-disable */
import axios from 'axios'
class EstadoCidadeForm {
    estado: any = {
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
        options: function(params: any) { // eslint-disable-line
            var res = axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(res => {
                let estados = new Array
                let i;
                for(i in res.data) {
                    estados.push({label: {text: res.data[i].nome}, value: res.data[i].sigla})
                }
                params.field.options = (params: any) => estados
            })
        },
        events (params: any) { // eslint-disable-line
            return {
                change: async function(event: Event) {
                    console.log(params)
                    let cidades = new Array
                    let i;
                    if(params.field.value) {
                        var res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${params.field.value.toLowerCase()}/municipios?orderBy=nome`)
                        for(i in res.data) {
                            cidades.push({label: {text: res.data[i].nome}, value: res.data[i].nome})
                        }
                    }
                    params.fieldset.fields.cidade.options = () => cidades
                }
            }
        }
    }

    cidade: any = {
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
        options: async function(params: any) { // eslint-disable-line
            return {}
        },
        events(params: any) {}
    }
}

export default new EstadoCidadeForm