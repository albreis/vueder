<template>
  <div>
      <FormBuilder :form="formDados" :model="model" />
      <FormBuilder :form="formEndereco" :model="model" @modified="mod" />
    </div>
</template>

<script>
/* eslint-disable */
import FormBuilder from './Vueder.vue'
import FormDados from './Form.js'
import FormEndereco from './Form.ts'
export default {
    components: {
        FormBuilder,
    },
    data() {
        return {
            formDados: FormDados,
            formEndereco: FormEndereco,
            model: {}
        }
    },
    watch: {
        model() {
            console.log(this.model)
        }
    },
    methods: {
        mod(m) {
            console.log(m)
        }
    }
}
</script>

<style>

</style>