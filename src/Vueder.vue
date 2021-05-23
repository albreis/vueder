<template>
    <div class="form-builder">
        <form v-bind="parse(form.attrs, {model})" v-on="parse(form.events, {form, model})">
            <fieldset v-for="(fieldset, key) in parse(form.fieldsets, {form, model})" :key="key" v-bind="parse(fieldset.attrs, {form, fieldset, model})" v-on="parse(fieldset.events, {form, fieldset, model})">
                <legend v-if="fieldset.legend" v-bind="parse(fieldset.legend.attrs, {form, fieldset, model})" v-on="parse(fieldset.events, {form, fieldset, model})">{{fieldset.legend.text}}</legend>
                <template v-if="fieldset && fieldset.fields">
                    <div class="fields">
                        <div class="field" :data-error="validate(field)" v-for="(field, key_field) in parse(fieldset.fields, {form, fieldset, model})" :key="key_field" v-bind="parse(field.attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})">
                            <label v-bind="parse(field.attrs, {form, fieldset, field, model})" v-on="parse(field.label.events, {form, fieldset, field, model})" v-if="field.label && field.type != 'button'" v-html="field.label.text"></label>
                            <div v-bind="parse(field.container_attrs, {form, fieldset, field, model})" v-on="parse(field.container_attrs, {form, fieldset, field, model})">
                                <template v-if="field.type == 'select'">
                                    <select v-bind="field.input_attrs" v-on="parse(field.events, {form, fieldset, field, model})" :name="field.name || key_field" v-model="field.value" @change="model[field.name] = field.value">
                                        <template v-if="field.options">
                                            <option v-for="(option, key_option) in parse(field.options, {form, fieldset, field, model})" :key="key_option" :value="option.value">
                                                {{option.label.text}}
                                            </option>
                                        </template>
                                    </select>
                                </template>
                                <template v-if="field.type == 'radio' && field.options">
                                    <label v-for="(option, key_option) in parse(field.options, {form, fieldset, field, model})" :key="key_option" :value="option.value" v-bind="parse(option.attrs, {form, fieldset, field, model, option})" v-on="parse(option.events, {form, fieldset, field, model, option})">
                                        <input v-bind="parse(field.input_attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})" type="radio" :value="option.value" v-model="field.value" @input="model[field.name] = field.value" /> <span>{{option.label.text}}</span>
                                    </label>
                                </template>
                                <template v-if="field.type == 'text' || field.type == 'password' || field.type == 'email' || field.type == 'tel' || field.type == 'number'">
                                    <input v-bind="parse(field.input_attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})"  :type="field.type" v-model="field.value" @input="model[field.name] = field.value" />
                                </template>
                                <template v-if="field.type == 'textarea'">
                                    <textarea v-bind="parse(field.input_attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})" v-model="field.value" @input="model[field.name] = field.value"></textarea>
                                </template>
                                <template v-if="field.type == 'component'">
                                    <component v-bind="parse(field.input_attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})" :is="field.component" />
                                </template>
                                <template v-if="field.type == 'button'">
                                    <button v-bind="parse(field.input_attrs, {form, fieldset, field, model})" v-on="parse(field.events, {form, fieldset, field, model})" v-html="field.label.text"></button>
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
    props: {
        form: {}
    },
    data() {
        return {
            model: {}
        }
    },
    mounted() {
        if(sessionStorage.form) {
            this.form = JSON.parse(sessionStorage.form)
        }
    },
    methods: {
        validate(field) {
            return validate.single(field.value, field.validations)
        },
        parse(input, params) {
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
                sessionStorage.form = JSON.stringify(this.form)
                this.$emit('modified', this.model)
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