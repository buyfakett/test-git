<template>
  <div>
    <div class="add">
      <el-button type="primary" @click="add_rss()">新增</el-button>
      <el-button type="warning" @click="refresh_push()">刷新push</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="60px"/>
      <el-table-column prop="rss_uri" label="rss地址" width="center"/>
      <el-table-column prop="timestamp_text" label="最后更新时间" width="center"/>
      <el-table-column prop="detection_time_text" label="检查时间" width="center"/>
      <el-table-column width="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit_rss(scope.row)">修改rss地址</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="is_delete_rss(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit_push(scope.row)">修改推送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizeList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="rss_title_state ? '添加rss地址' : '修改rss地址'" :visible.sync="rssFormVisible">
      <el-form :model="rssForm">
        <el-form-item label="rss地址：" label-width="80px">
          <el-input v-model="rssForm.rss_uri" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rss_button(rssForm)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改推送方式" :visible.sync="pushFormVisible">
      <el-form :model="pushForm">
        <el-form-item label="推送方式：" label-width="200px">
        <el-select v-model="pushForm.push_type" placeholder="请选择" class="choosePushType">
          <el-option
              v-for="item in options"
              :key="item.push_type"
              :label="item.label"
              :value="item.push_type"
              >
          </el-option>
        </el-select>
          </el-form-item>
        <el-form-item label="微信模板id：" label-width="200px" v-if="shouWX">
          <el-input v-model="pushForm.wechat_template_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信appId：" label-width="200px" v-if="shouWX">
          <el-input v-model="pushForm.wechat_app_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推送给的用户们：" label-width="200px" v-if="shouWX">
          <el-input v-model="pushForm.wechat_to_user_ids" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钉钉access_token：" label-width="200px" v-if="shouDing">
          <el-input v-model="pushForm.ding_access_token" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="钉钉推送关键字：" label-width="200px" v-if="shouDing">
          <el-input v-model="pushForm.ding_keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="检测间隔时间：" label-width="200px">
          <el-input v-model="pushForm.detection_time" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="push_button(pushForm)">确 定</el-button>
      </div>
    </el-dialog>
      <el-dialog
          title="确定删除吗？"
          :visible.sync="deleteVisible"
          width="30%">
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="delete_rss()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { rss, delete_rss, rss_list } from "@/api/rss";
import { format_date } from "@/common/util/utils";
import { add_push, change_push, get_push, refresh_push } from "@/api/push";
import { Message } from "element-ui";

export default {

  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pageSizeList: [5, 10, 20, 30, 40],
      total: 0,
      params: {},
      rssFormVisible: false,
      pushFormVisible: false,
      rssForm: {
        rss_uri: "",
      },
      pushForm: {
        push_type: "",
        ding_access_token: "",
        ding_keyword: "",
        wechat_app_id: "",
        wechat_template_id: "",
        wechat_to_user_ids: "",
        detection_time: "",
      },
      rss_title_state: true,
      options: [{
        push_type: 'wechat',
        label: '微信测试号'
      }, {
        push_type: 'ding',
        label: '钉钉'
      }],
      push_type: '',
      shouWX: false,
      shouDing: false,
      push_id: '',
      rss_id: '',
      detection_push: false,
      deleteVisible: false,
      delete_id: '',
    }
  },
  watch:{
    "pushForm.push_type"(value){
      if(value === "wechat"){
        this.shouWX = true
        this.shouDing = false
      }else if(value === "ding"){
        this.shouDing = true
        this.shouWX = false
      }
    }
  },
  methods: {
    is_delete_rss(id){
      this.deleteVisible = true
      this.delete_id = id
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.params.pageSize = val
      this.getList(this.params)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.params.page = val
      this.getList(this.params)
    },
    getList(params) {
      rss_list(params)
          .then(res => {
                if (res.code === 0) {
                  this.total = res.count
                  this.tableData = res.data
                  this.tableData.forEach((item) => {
                    item.detection_time === null ? item.detection_time_text = '' : item.detection_time_text = item.detection_time + "m"
                    item.timestamp === null ? item.timestamp_text = '' : item.timestamp_text = format_date(item.timestamp, 'Y-m-d H:i:s')
                  })
                }
          })
    },
    refresh_push(){
      refresh_push()
          .then(res => {
            if (res.code === 0) {
              this.getList(this.params)
            }
          })
    },
    delete_rss(){
      let data = {id: this.delete_id}
      delete_rss(data)
          .then(res => {
            if (res.code === 0) {
              this.getList(this.params)
              this.deleteVisible = false
              this.delete_id = ''
            }
          })
    },
    edit_rss(row){
      this.rss_title_state = false
      this.rssForm = {...row}
      this.rssFormVisible = true
    },
    add_rss(){
      this.rss_title_state = true
      this.rssForm.rss_uri = ""
      this.rssFormVisible = true
    },
    rss_button(rssForm){
        rss(this.rss_title_state ? 'POST' : 'PUT', rssForm)
            .then(res => {
              if (res.code === 0){
                this.rssFormVisible = false
                this.getList(this.params)
              }
            })
    },
    push_button(pushForm){
      this.detection = false
      pushForm.id = ''
      if(pushForm.push_type === '') {
        Message.error({message: '参数缺少', type: 'error'})
      }else if(pushForm.push_type === 'ding'){
          if (pushForm.ding_access_token === '' || pushForm.ding_keyword ===''){
            Message.error({message: '参数缺少', type: 'error'})
          }else {
            this.detection = true
          }
        }else if(pushForm.push_type === 'wechat'){
        if (pushForm.wechat_app_id === '' || pushForm.wechat_template_id ==='' || pushForm.wechat_to_user_ids ===''){
          Message.error({message: '参数缺少', type: 'error'})
        }else {
          this.detection = true
        }
      }
      if(this.detection) {
        if (this.push_id !== '') {
          pushForm.id = this.push_id
          change_push(pushForm)
              .then(res => {
                if (res.code === 0) {
                  this.pushFormVisible = false
                  this.getList(this.params)
                }
              })
        } else {
          pushForm.rss_id = this.rss_id
          add_push(pushForm)
              .then(res => {
                if (res.code === 0) {
                  this.pushFormVisible = false
                  this.getList(this.params)
                }
              })
        }
      }
    },
    edit_push(row){
      this.push_id = ''
      this.pushForm.wechat_app_id = ''
      this.pushForm.push_type = ''
      this.pushForm.wechat_template_id = ''
      this.pushForm.wechat_to_user_ids = ''
      this.pushForm.ding_access_token = ''
      this.pushForm.ding_keyword = ''
      this.shouDing = false
      this.shouWX = false
      this.pushFormVisible = true
      this.rss_id = row.id
      if (row.push_id !== null || row.push_id !== '') {
        let params = {rss_id: row.id}
        get_push(params)
            .then(res => {
              if (res.code === 0){
                if(res.data.push_type === "wechat"){
                  this.shouWX = true
                  this.pushForm.push_type = res.data.push_type
                  this.pushForm.wechat_app_id = res.data.wechat_app_id
                  this.pushForm.wechat_template_id = res.data.wechat_template_id
                  this.pushForm.wechat_to_user_ids = res.data.wechat_to_user_ids
                }else if(res.data.push_type === "ding"){
                  this.shouDing = true
                  this.pushForm.push_type = res.data.push_type
                  this.pushForm.ding_access_token = res.data.ding_access_token
                  this.pushForm.ding_keyword = res.data.ding_keyword
                }
                this.pushForm.detection_time = res.data.detection_time
                this.push_id = res.data.id
              }
            })
      }
    },
  },
  created() {
    this.params.pageSize = this.pageSize
    this.params.page = this.currentPage
    this.getList(this.params)
  }
}
</script>
<style lang="scss">
.el-pagination{
  margin-top: 30px;
  text-align: right;
}
.add{
  margin: 10px 10px;
  text-align: left;
}
.choosePushType{
  width: 700px;
  //margin-bottom: 20px;
  //margin-left: 10px;
}

</style>