<template>
  <b-container>
    <h1>登録画面</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group
        id="title"
        label="Title"
        label-for="title"
        description="Put title here.">
        <b-form-input
          id="title"
          v-model="form.title"
          required
          placeholder="Put title here."
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="description"
        label="Description"
        label-for="description"
        description="Put description here.">
        <b-form-textarea
          id="description"
          v-model="form.description"
          placeholder="Put description here."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="image"
        label="Image"
        label-for="image"
        description="Put image here.">
        <b-form-file
          id="image"
          v-model="form.file"
          v-bind:state="Boolean(form.file)"
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>

      <b-form-group
        id="point"
        label="Point"
        label-for="point"
        description="Put point here.">
        <b-form-input
          id="title"
          v-model="form.point"
          required
          placeholder="Put point here. ([-100, 100])"
          type="number"
          min="-100"
          max="100"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">確認</b-button>
      <b-button type="reset" variant="danger">リセット</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      form: {
        title: '',
        description: '',
        file: null,
        point: '0'
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.title = ''
      this.form.description = ''
      this.form.point = '0'
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

</style>
