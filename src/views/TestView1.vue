<template>
  <VForm ref="form" @submit="onSubmit" v-slot="{ errors }">
    <VField name="custom" rules="required|min:1">
      <CustomInput :class="{ 'is-invalid': errors['custom'] }" v-model="form.custom" />
    </VField>
    <ErrorMessage name="custom" class="invalid-feedback"/>

    <button type="submit" class="btn btn-primary">提交表單</button>
  </VForm>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      form: {
        custom: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('表單提交成功', this.form.custom);
    },
  },
};
</script>
