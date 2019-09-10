<template>
  <div class="cc-login">
    <div class="cc-login-wrapper">
      <div class="cc-login-form" @keyup.enter="doLogin">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>欢迎登陆</span>
          </div>
          <div class="text-c">
            <div v-show="!isScanCodeSuccess">
              <div class="qrcode-wrapper">
                <canvas id="login-can"></canvas>
                <div class="invalid" v-if="isExpire">
                  <p>二维码已失效</p>
                  <p>
                    <el-button
                      @click="refreshQrCode"
                      type="primary"
                      size="small"
                      >刷新</el-button
                    >
                  </p>
                </div>
              </div>
              <p
                style="padding: 10px 0;font-size: 12px;text-align: center;color: #999;"
              >
                打开
                <span style="color: #007fff;">码上面试小程序</span>
                扫一扫进行登录
              </p>
            </div>
            <div class="scan-success-wrapper" v-show="isScanCodeSuccess">
              <cc-svg-icon
                class="icon-scan-success"
                icon-class="icon-scan-success"
              ></cc-svg-icon>
              <p>扫描成功</p>
              <div class="scan-success-tips">
                <span>请勿刷新本页面，按手机提示操作</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { generatorClientId, LocalStorage } from '../../utils'
import socketio from 'socket.io-client'
const unicode = generatorClientId()
const wsUrl = process.env.VUE_APP_SOCKET_URL
// const url = `${wsUrl}/backLoginHandler/unicode=${unicode}`

const io = socketio(location.protocol + wsUrl)
export default {
  name: 'cc-login',

  data () {
    return {
      // socket: new WebSocket(url),
      unicode,
      isScanCodeSuccess: false,
      isExpire: false,
      expireDate: 1000 * 60 * 5, // 过期时间 5 分钟
      timer: null,
      loginToken: generatorClientId()
    }
  },
  created () {
    // this.socket.onopen = this.websocketOnOpen
    // this.socket.onmessage = this.websocketOnMessage

    io.on('connect', () => {
      console.log('connect')
      this.sendRefreshQrCode()
    })
    io.on('message', message => {
      console.log('beforeLogin', message)
      this.websocketOnMessage(message)
    })
  },
  mounted () {
    this.generateQrCode()
  },
  methods: {
    /**
     * @description 生成二维码
     */
    generateQrCode () {
      const canvas = document.getElementById('login-can')
      QRCode.toCanvas(canvas, JSON.stringify({
        type: 'login',
        payload: {
          unicode: this.unicode,
          loginToken: this.loginToken
        }
      }), {
        errorCorrectionLevel: 'H'
      }, function (err) {
        if (err) {
          console.log('error', err)
          return
        }
        console.log('qrcode generate success')
      })
      this.isExpire = false
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isExpire = true
      }, this.expireDate)
    },
    /**
     * @description 刷新二维码
     */
    refreshQrCode () {
      this.loginToken = generatorClientId()
      this.generateQrCode()
      this.sendRefreshQrCode()
    },
    sendRefreshQrCode () {
      // if (this.socket) {
      //   this.socket.send(JSON.stringify({
      //     // 101 表示刷新二维码
      //     status: 101,
      //     loginToken: this.loginToken
      //   }))
      // }
      if (io) {
        io.emit('beforeLogin', JSON.stringify({
          unicode: this.unicode,
          loginToken: this.loginToken,
          status: 101
        }))
      }
    },
    /**
     * @description websocket 链接成功后的回调
     */
    websocketOnOpen () {
      this.sendRefreshQrCode()
    },
    websocketOnMessage (e) {
      console.log('websocketOnMessage', e)
      try {
        const data = JSON.parse(e)
        switch (data.code) {
          case 1000:
            // 已被扫码
            this.isScanCodeSuccess = true
            break
          case 1:
            // 确认登录
            LocalStorage.setItem('token', data.data)
            this.$router.push('/category/index')
            break
          case 101:
            // 取消登录
            this.isScanCodeSuccess = false
            this.isExpire = true
            break
          default:
            break
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    websocketOnSend (e) {
      console.log('websocketOnMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.cc-login {
  #login-can {
    width: 180px !important;
    height: 180px !important;
  }
  &-wrapper {
    height: 100vh;
    background: url("../../assets/images/bg.jpg");
    background-size: cover;
  }
  &-form {
    width: 330px;
    position: absolute;
    right: 250px;
    top: 50%;
    transform: translateY(-60%);
  }
  .invalid {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    @include center(column);
    > p {
      color: #fff;
      padding-top: 10px;
      font-size: 16px;
    }
  }
  .qrcode-wrapper {
    display: inline-block;
    position: relative;
  }
  .scan-success-wrapper {
    height: 220px;
    .icon-scan-success {
      width: 60px;
      height: 60px;
      margin-top: 40px;
    }
    .scan-success-tips {
      color: #ccc;
      font-size: 12px;
      margin-top: 10px;
    }
    > p {
      margin-top: 20px;
      font-size: 18px;
      color: #999;
    }
  }
}
</style>
