const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:3000')

ws.on('open', function open() {
  console.log('open')
});

ws.on('message', function incoming(data) {
  let robot = JSON.parse(data)
  console.log(JSON.stringify(robot, null, 2))
});

const sit = [
  { PWMChannelState: { channel: 0, position: 0.1 } },
  { PWMChannelState: { channel: 2, position: 0.1 } },
  { PWMChannelState: { channel: 1, position: 0.6 } },
  { PWMChannelState: { channel: 3, position: 0.6 } }
]

const lay = [
  { PWMChannelState: { channel: 0, position: 0.0 } },
  { PWMChannelState: { channel: 2, position: 0.0 } },
  { PWMChannelState: { channel: 1, position: 0.3 } },
  { PWMChannelState: { channel: 3, position: 0.3 } }
]

const stand = [
  { PWMChannelState: { channel: 0, position: 0.4 } },
  { PWMChannelState: { channel: 2, position: 0.4 } },
  { PWMChannelState: { channel: 1, position: 0.45 } },
  { PWMChannelState: { channel: 3, position: 0.45 } }
]

process.stdin.on('data', (data) => {
  console.log(`Got: ${data}`)

  //const parts = data.toString().split(/\s+/)
  //console.log(parts)
  //ws.send(JSON.stringify({ PWMChannelState: { channel: parseInt(parts[0]), position: parseFloat(parts[1]) } }))

  if (data.toString().match(/sit/)) {
    sit.forEach((s) => ws.send(JSON.stringify(s)))
  } else if (data.toString().match(/stand/)) {
    stand.forEach((s) => ws.send(JSON.stringify(s)))
  } else if (data.toString().match(/lay/)) {
    lay.forEach((s) => ws.send(JSON.stringify(s)))
  }
});

