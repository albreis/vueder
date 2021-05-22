<template>
    <div id="form-builder">
        <form :method="method" :action="action" :enctype="enctype">
            <fieldset v-for="(fieldset, key) in fieldsets" :key="key" class="row">
                <legend v-if="fieldset.legend" class="col-12">{{fieldset.legend}}</legend>
                <div class="fields">
                    <div class="field" :data-error="validate(field)" v-for="(field, key_field) in fieldset.fields" :key="key_field" :class="`col-${field.size.desktop} col-m-${field.size.mobile}`">
                        <label v-if="field.label" v-html="field.label"></label>
                        <template v-if="field.type == 'select'">
                            <select v-on="field.events ? field.events(field, fieldsets, model) : {}" :name="field.name" v-model="field.value" @input="model[field.name] = field.value">
                                <template v-if="field.options">
                                    <option v-for="(option, key_option) in field.options(field, fieldsets, model)" :key="key_option" :value="option.value">
                                        {{option.label}}
                                    </option>
                                </template>
                            </select>
                        </template>
                        <template v-if="field.type == 'radio'">
                            <div class="row" v-if="field.options">
                                <label v-for="(option, key_option) in field.options(field, fieldsets, model)" :key="key_option" :value="option.value">
                                    <input v-on="field.events ? field.events(field, fieldsets, model) : {}" type="radio" :value="option.value" v-model="field.value" @input="model[field.name] = field.value" /> <span>{{option.label}}</span>
                                </label>
                            </div>
                        </template>
                        <template v-if="field.type == 'text' || field.type == 'password' || field.type == 'email' || field.type == 'tel' || field.type == 'number'">
                            <input v-on="field.events ? field.events(field, fieldsets, model) : {}"  :type="field.type" v-model="field.value" @input="model[field.name] = field.value" />
                        </template>
                        <template v-if="field.type == 'textarea'">
                            <textarea v-on="field.events ? field.events(field, fieldsets, model) : {}" v-model="field.value" @input="model[field.name] = field.value"></textarea>
                        </template>
                        <template v-if="field.type == 'component'">
                            <component :is="field.component" />
                        </template>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
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
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
form
    fieldset
        margin-bottom 15px
        .fields
            display flex
            width 100%
            .field
                width 100%
                padding 15px
                label
                    display block
                &[data-error]
                    input
                    select
                    textarea
                        background #faa
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