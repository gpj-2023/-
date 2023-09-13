<template>
  <div class="home-main">
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../assets/login1.jpg" />
          <div>
            <p>{{ authName }}</p>
            <p>{{auth}}</p>
          </div>
        </div>
        <div class="user-info">
          <p>登录时间:<span>{{time}}</span></p>
          <p>登录地点:<span>湖北.武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="bottom-info">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-card shadow="hover">
        <div class="order-info">
          <div
            class="order-info2"
            v-for="cd in countData"
            :key="cd.name"
            shadow="hover"
            :style="{
              display: 'flex',
              width: '200px',
              height: '80px',
              marginBottom: '10px',
            }"
          >
            <i
              :class="`el-icon-${cd.icon}`"
              :style="{
                width: '80px',
                height: '80px',
                backgroundColor: cd.color,
              }"
            ></i>
            <div class="detail">
              <p class="money">￥{{ cd.value }}</p>
              <p>{{ cd.name }}</p>
            </div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover">
        <div ref="echarts1" style="height: 170px"></div>
      </el-card>
      <el-card shadow="hover">
        <div class="echarts-2and3">
          <div ref="echarts2" style="height: 162px;width:500px;"></div>
          <div ref="echarts3" style="height: 162px;width:300px;">
          
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tableData: [
        { name: "oppo", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
        { name: "vivo", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
        { name: "苹果", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
        { name: "小米", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
        { name: "三星", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
        { name: "魅族", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
      ],
      tableLabel: {
        name: "名称",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "今日收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "本月收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  computed:{
    auth(){
      return this.$store.state.tag.auth
    },
    authName(){
      return this.$store.state.tag.authName
    },
    time(){
      let newDate = new Date();
      return newDate.toLocaleString()
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      // console.log(data);
      this.tableData = tableData;
      const { orderData } = data.data;
      const {videoData} = data.data;
      const {userData} = data.data;
      //折线
      const echarts1 = echarts.init(this.$refs.echarts1);
      const ChartOption = {
        xAxis: { data: orderData.date },
        yAxis: {},
        series: [],
        legend: {
          data: Object.keys(orderData.data[0]),
        },
      };
      Object.keys(orderData.data[0]).forEach((key) => {
        ChartOption.series.push({
          name: key,
          type: "line",
          data: orderData.data.map((item) => {
            return item[key];
          }),
        });
      });
      // console.log(orderData.data)
      // console.log(ChartOption.series)
      echarts1.setOption(ChartOption);
      //饼图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const ChartOption3 = {
        legend: {     
          orient: 'vertical',     
          left: 'left'   
        },
        series: [     
          {       
            name: 'Access From',       
            type: 'pie',       
            radius: '50%',       
            data:videoData,       
            emphasis: {         
              itemStyle: {           
                shadowBlur: 10,           
                shadowOffsetX: 0,           
                shadowColor: 'rgba(0, 0, 0, 0.5)'         
              }       
            }     
          }   
        ]
      }
      echarts3.setOption(ChartOption3);
      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const ChartOption2 = {         
        xAxis: { data: userData.map(item=>item.date)},         
        yAxis: {},       
        series: [
          {
            name:'新增用户',
            data:userData.map(item=>item.new),
            type:'bar'

          },
          {
            name:'活跃用户',
            data:userData.map(item=>item.active),
            type:'bar'

          },
        ],         
        legend: {           
          data: ['新增用户','活跃用户'],         
        },       
      };
      echarts2.setOption(ChartOption2);
      // console.log(userData)
    });
  },
    

};
// const sss=[{苹果: 5071, vivo: 5196, oppo: 4046, 魅族: 7305, 三星: 5798}]
// console.log(sss[0]['苹果'])
</script>

<style lang="less" scoped >
.user {
  display: flex;
  align-items: center;
  border-bottom: 2px solid gray;
  padding-bottom: 10px;
  p:nth-of-type(1) {
    margin-bottom: 10px;
    font-size: 30px;
  }
  p:nth-of-type(2) {
    font-size: 14px;
    color: gray;
  }
  img {
    display: inline-block;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-right: 20px;
  }
}
.user-info {
  span {
    padding-left: 25%;
  }
}
.bottom-info {
  height: 400px;
}
.order-info {
  width: 750px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding-left: 30px;
  i {
    display: block;
    text-align: center;
    line-height: 80px;
    color: white;
    font-size: 40px;
  }
  .order-info2 {
    align-items: center;
    margin-bottom: 10px;
    transition: all 0.3s;

    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
.order-info2:hover {
  box-shadow: 0 0 8px rgb(217, 217, 217);
}
.echarts-2and3 {
  display:flex;
  justify-content:space-between;
}
// .home-main{
//   height:600px;
// }
// .echarts2 {
//   width: 500px;
//   background-color: red;
// }
// .echarts3 {
//   width: 200px;
//   background-color: red;
// }
</style>