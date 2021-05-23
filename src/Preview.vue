<template>
  <div>
      <FormBuilder :form="form" :model="{}" />
      lsjsld
    </div>
</template>

<script>
/* eslint-disable */
import FormBuilder from './Vueder.vue'
import Form from './Form'
export default {
    components: {
        FormBuilder,
    },
    data() {
        return {
            form: Form
        }
    }
}
</script>

<style>

</style>