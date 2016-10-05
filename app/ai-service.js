import AI from './emscripten/AI'

let viewAdapter = new AI.ViewAdapter()

const initialAuxData = () => ({
  hues: {},
  rooms: []
})
let auxData = initialAuxData()

export async function reset () {
  viewAdapter.delete()
  viewAdapter = new AI.ViewAdapter()
  auxData = initialAuxData()
}

export async function loadString (s) {
  await reset()
  let lines = s.split('\n').map(x => x.trim()).filter(x => x.length > 0)

  let courseNames = []

  let roomtoid = new Map()

  let state = null
  lines.forEach((oline, i) => {
    if (oline === 'Ruangan' || oline === 'Jadwal') {
      state = oline
    } else {
      let arr = oline.split(';')
      let origname = arr[0]
      let newname = origname + `-#^-${i}`
      arr[0] = newname
      let line

      switch (state) {
        case 'Ruangan':
          if (!roomtoid.has(origname)) {
            roomtoid.set(origname, [])
          }
          roomtoid.get(origname).push(newname)
          line = arr.join(';')
          viewAdapter.add_room(line)
          auxData.rooms.push(line.split(';')[0])

          break
        case 'Jadwal':
          let origroomref = arr[1]
          let newroomref
          if (origroomref === '-') {
            newroomref = origroomref
          } else {
            newroomref = roomtoid.get(origroomref).join(',')
          }

          arr[1] = newroomref
          line = arr.join(';')

          viewAdapter.add_course(line)
          courseNames.push(line.split(';')[0])
      }

      console.log(line)
    }
  })

  const hueStep = 360.0 / courseNames.length
  courseNames.forEach((name, i) => {
    auxData.hues[name] = i * hueStep
  })

  viewAdapter.randomize_schedule()
}

export async function randomizeSchedule () {
  viewAdapter.randomize_schedule()
}

export async function simulatedAnnealing () {
  viewAdapter.run_simulated_annealing(100, 0.003, 1000)
}

export async function geneticAlgorithm () {
  viewAdapter.run_genetic_algorithm(50, 0.15, 0.1, 10, 1000)
}

export async function hillClimbing () {
  viewAdapter.run_hill_climbing(1000)
}

export async function getRoomPercentage () {
  return viewAdapter.get_room_percentage()
}

export async function getConflicts () {
  return viewAdapter.get_conflicts()
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
        hue: auxData.hues[course_name],
        room: room_name
      }))
    .forEach(s => {
      result[s.name] = s
    })

  return result
}

export async function canMoveCourse (courseName, day, slot, roomName) {
  // cC = courseConstraints
  return viewAdapter.can_move_course(courseName, roomName, day, slot)
}
