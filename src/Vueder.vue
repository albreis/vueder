<template>
    <div class="form-builder">
        <form v-bind="parse(_form.attrs, {_model})" v-on="parse(_form.events, {form: _form, model: _model})">
            <fieldset v-for="(fieldset, key) in parse(_form.fieldsets, {form: _form, model: _model})" :key="key" v-bind="parse(fieldset.attrs, {form: _form, fieldset, model: _model})" v-on="parse(fieldset.events, {form: _form, fieldset, model: _model})">
                <legend v-if="fieldset.legend" v-bind="parse(fieldset.legend.attrs, {form: _form, fieldset, model: _model})" v-on="parse(fieldset.events, {form: _form, fieldset, model: _model})">{{fieldset.legend.text}}</legend>
                <template v-if="fieldset">
                    <div class="fields" v-if="fieldset.fields">
                        <div class="field" :data-error="validate(field)" v-for="(field, key_field) in parse(fieldset.fields, {form: _form, fieldset, model: _model})" :key="key_field" v-bind="parse(field.attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.events, {form: _form, fieldset, field, model: _model})">
                            <label v-bind="parse(field.label.attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.label.events, {form: _form, fieldset, field, model: _model})" v-if="field.label && field.type != 'button'" v-html="field.label.text"></label>
                            <div class="field-container" v-bind="parse(field.container_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.container_attrs, {form: _form, fieldset, field, model: _model})">
                                <template v-if="field.type == 'select'">
                                    <select v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})" :name="field.name || key_field" v-model="field.value" @change="_model[field.name] = field.value">
                                        <template v-if="field.options">
                                            <option v-for="(option, key_option) in parse(field.options, {form: _form, fieldset, field, model: _model})" :key="key_option" :value="option.value">
                                                {{option.label.text}}
                                            </option>
                                        </template>
                                    </select>
                                </template>
                                <template v-if="(field.type == 'radio' || field.type == 'checkbox') && field.options">
                                    <label class="radio-container" v-for="(option, key_option) in parse(field.options, {form: _form, fieldset, field, model: _model})" :key="key_option" :value="option.value" v-bind="parse(option.attrs, {form: _form, fieldset, field, model: _model, option})" v-on="parse(option.events, {form: _form, fieldset, field, model: _model, option})">
                                        <input v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})" :type="field.type" :value="option.value" v-model="field.value" @change="_model[field.name] = field.value" /> <span>{{option.label.text}}</span>
                                    </label>
                                </template>
                                <template v-if="field.type == 'text' || field.type == 'password' || field.type == 'email' || field.type == 'tel' || field.type == 'number'">
                                    <input v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})"  :type="field.type" v-model="field.value" @input="_model[field.name] = field.value" />
                                </template>
                                <template v-if="field.type == 'textarea'">
                                    <textarea v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})" v-model="field.value" @input="_model[field.name] = field.value"></textarea>
                                </template>
                                <template v-if="field.type == 'component'">
                                    <component v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})" :is="field.component" />
                                </template>
                                <template v-if="field.type == 'button'">
                                    <button v-bind="parse(field.input_attrs, {form: _form, fieldset, field, model: _model})" v-on="parse(field.input_events, {form: _form, fieldset, field, model: _model})" v-html="field.label.text"></button>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </fieldset>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import validate from 'validate.js'
export default {
    // Componente para ciar formulários a partir de um objeto
    name: 'Vueder',
    props: {
        // Objeto que será usado para criar o formulário
        // @required
        // @type Object
        form: Object,
        model: Object
    },
    computed: {
        _form: {
            get() {
                return this.form
            },
            set(newValue) {
            }
        },
        _model: {
            get() {
                return this.model
            },
            set(newValue) {
            }
        }
    },
    methods: {
        validate(field) {
            return validate.single(field.value, field.validations)
        },
        parse(input, params) {
            if(typeof input == 'string') {
                input =  eval(input)
            }
            if(typeof input == 'function') {
                return input(params)
            }
            return input
        }
    },
    watch: {
        form: {
            deep: true,
            handler() {
                this.$emit('modified', this._model)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.form-builder
    *
        box-sizing border-box
.row
  display flex
  flex-wrap wrap 
  width 100%
[class*="col-"]
  width 100%
for i in 1..12
  .col-{i}
    max-width unit(100% * (i / 12), '%')
    padding 15px
form
    fieldset
        margin-bottom 15px
        .fields
            width 100%
            display flex
            flex-wrap wrap
            .field
                label
                    display block
                    margin-bottom 5px
                &[data-error]
                    input
                    select
                    textarea
                        background #faa
                    &:after
                        content attr(data-error)
                        color red
            select
            [type="text"]
            [type="password"]
            [type="number"]
            [type="email"]
            [type="tel"]
                height 30px
                width 100%
                border 1px solid #aaa
</style>