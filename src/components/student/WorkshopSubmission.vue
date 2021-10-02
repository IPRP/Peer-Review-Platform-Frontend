<template>
  <div class="p-1 p-md-5">
    <h1 class="pl-1 pl-md-5">
      Abgabe für Workshop {{ $route.params.workshopname }}
    </h1>
    <div class="px-1 px-md-5">
      <div class="pt-3">
        <h3 class="d-flex justify-content-start">Angabe:</h3>
        <p>{{ workshop.content }}</p>
        <md-button class="md-raised md-primary">
          <span>Angabe.pdf</span>
          <md-icon>get_app</md-icon>
        </md-button>
      </div>
      <div class="pt-3">
        <h3>Deadline: {{ workshop.end }}</h3>
      </div>
      <div class="pt-3">
        <h3 class="d-flex justify-content-start">Abgabe Datei</h3>
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
          <md-field>
            <label>Titel</label>
            <md-input v-model="title"></md-input>
          </md-field>
          <md-field>
            <label>Kommentar</label>
            <md-textarea v-model="comment"></md-textarea>
          </md-field>
          <md-field>
            <!--            <label>Abgabe</label>-->
            <!--            <md-file type="file" acccept=".pdf" ref="file" @change="onFileChange"></md-file>-->
            <!--          <label>Upload File</label><br/>-->
            <input type="file" ref="file" @change="onSelect"/>
          </md-field>
          <div
            class="pt-3 d-flex justify-content-center justify-content-md-end"
          >
            <md-button class="md-raised prp-danger" to="/studentdashboard">
              <span class="p-1">Abbrechen</span>
              <md-icon class="prp-danger">delete</md-icon>
            </md-button>
            <md-button class="md-raised prp-success" type="submit">
              <span class="p-1">Speichern</span>
              <md-icon class="prp-success-icon">done_all</md-icon>
            </md-button>
            <div class="message">
              <h5>{{ message }}</h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "WorkshopSubmission",
  data() {
    return {
      workshop: {},
      file: "",
      message: "",
      attachment: {},
      title: "",
      comment: ""
    };
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      // const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      // if(!allowedTypes.includes(file.type)){
      //   this.message = "Filetype is wrong!!"
      // }
      // if (file.size > 500000) {
      //   this.message = "Too large, max size allowed is 500kb";
      // }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await DataService.uploadFile(this.$parent.username, this.$parent.pw, formData)
          .then(res => {
            this.attachment = res.data.attachment;
            this.addSubmission();
          })
          .catch(err => {
            this.message = err.response.data.error;
          });
        this.message = "Uploaded!!";
      } catch (err) {
        console.error(err);
        this.message = err.response.data.error;
      }
    },
    async addSubmission() {
      try {
        await DataService.addSubmission(this.$parent.username, this.$parent.pw, this.attachment, this.title, this.comment, this.$route.params.id)
          .then(res => {
            console.log(res.data.ok);
            this.$router.push("/studentdashboard");
          })
          .catch(err => {
            this.message = err.response.data.error;
          });
      } catch (e) {
        alert(e);
        this.message = e.response.data.error;
      }
    },
    getWorkshop() {
      DataService.getStudentWorkshop(
        this.$parent.username,
        this.$parent.pw,
        this.$route.params.id
      )
        .then(response => {
          this.workshop = response.data.workshop;
        })
        .catch(e => {
          console.log(e);
        });
    },
    downloadSubmission() {
      DataService.downloadSubmission(
        this.$parent.username,
        this.$parent.pw,
        this.submission.attachments[0].title
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fURL = document.createElement("a");

          fURL.href = fileURL;
          fURL.setAttribute("download", "file.pdf");
          document.body.appendChild(fURL);

          fURL.click();
        });
    }
  },
  mounted() {
    if (!this.$parent.authenticated) {
      // this.$router.replace({ name: "Login" });
      window.location.href = "/peer-Review-Platform-Frontend/login";
    } else {
      this.getWorkshop();
    }
  }
};
</script>

<style scoped></style>
