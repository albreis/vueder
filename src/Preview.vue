<template>
  <div>
      <FormBuilder :form="form" :model="{}" />
      lsjsld
    </div>
</template>

<script>
/* eslint-disable */
import FormBuilder from './Vueder.vue'
export default {
    components: {
        FormBuilder,
    },
    data() {
        return {
            form: {
                dados: {
                    legend: {
                        text: 'Dados'
                    },
                    fields: {
                        nome: {
                            type: 'text',
                            label: 'Nome',
                            events(params) {
                                return {
                                    click(event) {
                                        console.log(params)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>