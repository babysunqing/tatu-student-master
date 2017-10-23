<template>
    <el-upload
            action=""
            :http-request="upload"
            :show-file-list="false">
        <input type="hidden" class="picUrl"  >
        <img v-if="url" :src="url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    upload (request) {
      let self = this.$el
      self.childNodes[0].childNodes[0].name = self.id
      this.cos.uploadFile(cosSuccess => {
        alert('上传成功')
        this.url = cosSuccess.data.source_url
        self.childNodes[0].childNodes[0].value = cosSuccess.data.source_url
      },
      error => alert(error.msg),
      process => console.log(process),
      this.cos.bucket, 'TaTuEdu/Index/' + request.file.name, request.file, 0)
    }
  }
}
</script>

<style>
.box{
    width: 1.9rem;
    height: 1.9rem;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    margin-left: 36%;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1.9rem;
    line-height: 1.9rem;
    text-align: center;
}
.avatar {
    width: 1.9rem;
    height: 1.9rem;
    display: block;
}
</style>