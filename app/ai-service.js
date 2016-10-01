import AI from './emscripten/AI'

let viewAdapter = new AI.ViewAdapter()

const initialAuxData = () => ({
  rooms: []
})
let auxData = initialAuxData()

export async function reset () {
  viewAdapter.delete()
  viewAdapter = new AI.ViewAdapter()
  auxData = initialAuxData()
}

export async function loadString (s) {
  let lines = s.split('\n').map(x => x.trim()).filter(x => x.length > 0)

  let state = null
  lines.forEach(line => {
    if (line === 'Ruangan' || line === 'Jadwal') {
      state = line
    } else {
      switch (state) {
        case 'Ruangan':
          viewAdapter.add_room(line)
          auxData.rooms.push(line.split(';')[0])

          break
        case 'Jadwal':
          viewAdapter.add_course(line)
      }
    }
  })

  viewAdapter.randomize_schedule()
}

export async function moveCourse (courseName, day, slot, roomName) {
  console.log(`Moving ${courseName} to ${day}, ${slot}, ${roomName}...`)
  const result = viewAdapter.move_course(courseName, roomName, day, slot)

  if (result) {
    console.log('Success!')
  } else {
    console.log('Rejected.')
  }

  return result
}

export async function getRooms () {
  return auxData.rooms
}

export async function getLatestState () {
  let CSVector = viewAdapter.get_course_results()

  let CSArray = []
  const size = CSVector.size()
  for (let i = 0; i < size; i++) {
    CSArray.push(CSVector.get(i))
  }
  CSVector.delete()

  let result = {}

  CSArray
    .map(
      ({course_name, day, duration, time, room_name}) => ({
        name: course_name,
        time: {
          day: day,
          slot: time
        },
        duration: duration,
        room: room_name
      }))
    .forEach(s => {
      result[s.name] = s
    })

  return result
}
