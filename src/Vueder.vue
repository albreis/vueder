<template>
    <div class="form-builder">
        <form :method="method" :action="action" :enctype="enctype">
            <fieldset v-for="(fieldset, key) in fieldsets" :key="key" v-bind="fieldset.attrs">
                <legend v-if="fieldset.legend" v-bind="fieldset.legend.attrs">{{fieldset.legend.text}}</legend>
                <template v-if="fieldset && fieldset.fields">
                    <div class="fields">
                        <div class="field" :data-error="validate(field)" v-for="(field, key_field) in fieldset.fields" :key="key_field" v-bind="field.attrs">
                            <label v-bind="field.label.attrs" v-if="field.label && field.type != 'button'" v-html="field.label.text"></label>
                            <div v-bind="field.container_attrs">
                                <template v-if="field.type == 'select'">
                                    <select v-bind="field.input_attrs" v-on="field.events ? field.events(field, fieldsets, model) : {}" :name="field.name" v-model="field.value" @change="model[field.name] = field.value">
                                        <template v-if="field.options">
                                            <option v-for="(option, key_option) in field.options(field, fieldsets, model)" :key="key_option" :value="option.value">
                                                {{option.label.text}}
                                            </option>
                                        </template>
                                    </select>
                                </template>
                                <template v-if="field.type == 'radio' && field.options">
                                    <label v-for="(option, key_option) in field.options(field, fieldsets, model)" :key="key_option" :value="option.value" v-bind="option.attrs">
                                        <input v-bind="field.input_attrs" v-on="field.events ? field.events(field, fieldsets, model) : {}" type="radio" :value="option.value" v-model="field.value" @input="model[field.name] = field.value" /> <span>{{option.label.text}}</span>
                                    </label>
                                </template>
                                <template v-if="field.type == 'text' || field.type == 'password' || field.type == 'email' || field.type == 'tel' || field.type == 'number'">
                                    <input v-bind="field.input_attrs" v-on="field.events ? field.events(field, fieldsets, model) : {}"  :type="field.type" v-model="field.value" @input="model[field.name] = field.value" />
                                </template>
                                <template v-if="field.type == 'textarea'">
                                    <textarea v-bind="field.input_attrs" v-on="field.events ? field.events(field, fieldsets, model) : {}" v-model="field.value" @input="model[field.name] = field.value"></textarea>
                                </template>
                                <template v-if="field.type == 'component'">
                                    <component v-bind="field.input_attrs" :is="field.component" />
                                </template>
                                <template v-if="field.type == 'button'">
                                    <button v-bind="field.input_attrs" v-on="field.events ? field.events(field, fieldsets, model) : {}" v-html="field.label.text"></button>
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
        method: 'post',
        action: '',
        enctype: '',
        form: {},
        model: {}
    },
    computed: {
        fieldsets: {
            get() {
                return this.form
            },
            set(newValue) {
            } 
        }
    },
    mounted() {
        if(sessionStorage.fieldsets) {
            this.fieldsets = JSON.parse(sessionStorage.fieldsets)
        }
    },
    methods: {
        validate(field) {
            return validate.single(field.value, field.validations)
        }
    },
    watch: {
        fieldsets: {
            deep: true,
            handler() {
                sessionStorage.fieldsets = JSON.stringify(this.fieldsets)
                this.$emit('modified', model)
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