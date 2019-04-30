<template>
  <b-container fluid class="toukou">
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
        id="date"
        label="Date"
        label-for="date"
        description="Put date here.">
        <b-form-input
          id="date"
          v-model="form.date"
          required
          placeholder="Put date here."
          type="date"
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
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
          @change="onFilePicked"
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
import firebase from 'firebase'
export default {
  name: 'Main',
  data () {
    return {
      form: {
        title: '',
        date: '',
        description: '',
        point: '0'
      },
      show: true,
      imageName: null,
      imageFile: null,
      imageUrl: null
    }
  },
  methods: {
    onFilePicked (evt) {
      const files = evt.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = null
        this.imageFile = null
        this.imageUrl = null
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      console.log(JSON.stringify(this.form))
      if (this.imageFile !== null) {
        const storageRef = firebase.storage().ref()
        const imageRef = storageRef.child(`images/${this.imageName}`)
        imageRef.put(this.imageFile).then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log(downloadUrl)
            this.imageUrl = downloadUrl
            const db = firebase.firestore()
            const point = Number(this.form.point)
            const color = (point === 0 ? null : (point < 0 ? 'rgba(255,30,60,0.7)' : 'rgba(0,120,255,0.7)'))
            db.collection('spaces').add({
              title: this.form.title,
              date: new Date(this.form.date),
              description: this.form.description,
              image: this.imageUrl,
              point: point,
              color: color
            }).then(() => {
              console.log('Document successfully written!')
              this.$router.push('/')
            }).catch(error => {
              console.error('Error writing document: ', error)
            })
          }).catch(error => {
            console.error('Error getting download url: ', error)
          })
        }).catch(error => {
          console.error('Error putting image: ', error)
        })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.title = ''
      this.form.description = ''
      this.form.date = ''
      this.form.point = '0'
      this.show = false
      this.imageName = null
      this.imageFile = null
      this.imageUrl = null
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.toukou{
  background: #f7f7f7 url("../../assets/maphaikei_toukou.png") center top/cover no-repeat;
}
</style>
