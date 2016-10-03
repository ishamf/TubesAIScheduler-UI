/* eslint-env browser */

import { createAction } from 'redux-actions'
import * as AI from './ai-service'

import {DAYS, SLOTS, DAY_OFFSET, SLOT_OFFSET} from './values'

const moveCourseInUI = createAction('MOVE_COURSE',
  (name, day, slot, room) => ({
    name,
    destination: {
      time: {
        day,
        slot
      },
      room
    }}))

const replaceSchedule = createAction('REPLACE_SCHEDULE')
const replaceRooms = createAction('REPLACE_ROOMS')

const updateState = () => async (dispatch) => {
  const newSchedule = await AI.getLatestState()
  const newRooms = await AI.getRooms()

  dispatch(updateScores())
  dispatch(replaceRooms(newRooms))
  dispatch(replaceSchedule(newSchedule))
  dispatch(changeRoom(newRooms[0]))
}

const setRoomPercentage = createAction('SET_ROOM_PERCENTAGE')
const setConflictCount = createAction('SET_CONFLICT_COUNT')

const updateScores = () => async (dispatch) => {
  dispatch(setRoomPercentage(await AI.getRoomPercentage()))
  dispatch(setConflictCount(await AI.getConflicts()))
}

export function moveCourse (name, day, slot, room) {
  return async (dispatch) => {
    if (await AI.moveCourse(name, day, slot, room)) {
      dispatch(moveCourseInUI(name, day, slot, room))
      dispatch(updateScores())
    }
  }
}

export function loadString (s) {
  return async (dispatch) => {
    await AI.loadString(s)

    dispatch(updateState())
  }
}

export const loadFile = (f) => async (dispatch) => {
  const fr = new FileReader()
  fr.onload = () => {
    dispatch(loadString(fr.result))
  }
  fr.readAsText(f)
}

export const randomizeSchedule = () => async (dispatch) => {
  await AI.randomizeSchedule()
  dispatch(updateState())
}

export const runSimulatedAnnealing = () => async (dispatch) => {
  await AI.simulatedAnnealing()
  dispatch(updateState())
}

export const runGeneticAlgorithm = () => async (dispatch) => {
  await AI.geneticAlgorithm()
  dispatch(updateState())
}

export const runHillClimbing = () => async (dispatch) => {
  await AI.hillClimbing()
  dispatch(updateState())
}

const addDropTarget = createAction('ADD_DROP_TARGET') // {day, slot}
const addDropTargetPadding = createAction('ADD_DROP_TARGET_PADDING') // {day, slot}
const clearDropTargets = createAction('CLEAR_DROP_TARGETS')
const changeRoomUI = createAction('CHANGE_ROOM') // (room)
const setDragged = createAction('SET_DRAGGED') // (name)
const clearDragged = createAction('CLEAR_DRAGGED') // (name)

const buildRoomTargets = () => async (dispatch, getState) => {
  dispatch(clearDropTargets())

  const state = getState()
  const name = state.getIn(['drag', 'name'])
  const duration = state.getIn(['schedule', name, 'duration'])
  const room = state.get('currentRoom')

  for (let day = DAY_OFFSET; day < DAYS + DAY_OFFSET; day++) {
    let latestSlot = -1
    for (let slot = SLOT_OFFSET; slot < SLOTS + SLOT_OFFSET; slot++) {
      if (await AI.canMoveCourse(name, day, slot, room)) {
        dispatch(addDropTarget({day, slot}))
        latestSlot = slot
      }
    }
    if (latestSlot >= 0) {
      for (let slot = latestSlot + 1; slot < SLOTS + SLOT_OFFSET && slot < latestSlot + duration; slot++) {
        dispatch(addDropTargetPadding({day, slot}))
      }
    }
  }
}

export const changeRoom = (room) => async (dispatch, getState) => {
  dispatch(changeRoomUI(room))
  const state = getState()
  if (state.getIn(['drag', 'isDragging'])) {
    dispatch(buildRoomTargets(room, state.getIn(['drag', 'name'])))
  }
}

export const beginDrag = (dragItem) => async (dispatch) => {
  const name = dragItem.name
  dispatch(setDragged(name))

  // The delay is needed to work around a quirk in Chrome
  // regarding HTML5 drag and drop.
  setTimeout(() => { dispatch(buildRoomTargets()) }, 10)
}

export const endDrag = (dragItem) => async (dispatch) => {
  dispatch(clearDragged())
}

export const hoveredOver = createAction('HOVERED_OVER') // {day, slot, room}
