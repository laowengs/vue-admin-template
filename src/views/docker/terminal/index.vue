<template>
  <div id="xterm" className="xterm"/>
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: 'ws://localhost:19090/ws/container/exec?width=100&height=50&ip=wengjp.local&containerId=ff396f9afe641aa521ccc93606363d0c60e5019422345653e5ab17cca8b6f4b8'
    }
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('xterm'))
      fitAddon.fit()
      term.focus()
      this.term = term
    },
    initSocket() {
      this.socket = new WebSocket(this.socketURI)
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    }
  }
}
</script>

<style scoped>
#xterm{
  height: 675px;
}
</style>
