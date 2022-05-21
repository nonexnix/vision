import create from 'zustand'
import IUseFieldStore from './interface'
import placeholder from './placeholder'

const useFieldStore = create<IUseFieldStore>((set) => ({
  project: {
    value: placeholder.project,
    set: (payload) => set((state) => ({ project: { ...state.project, value: payload } })),
    clear: () => set((state) => ({ project: { ...state.project, value: placeholder.project } })),
  },
  message: {
    value: placeholder.message,
    set: (payload) => set((state) => ({ message: { ...state.message, value: payload } })),
    clear: () => set((state) => ({ message: { ...state.message, value: placeholder.message } })),
  },
  task: {
    value: placeholder.task,
    set: (payload) => set((state) => ({ task: { ...state.task, value: payload } })),
    clear: () => set((state) => ({ task: { ...state.task, value: placeholder.task } })),
  },
  todo: {
    value: placeholder.todo,
    set: (payload) => set((state) => ({ todo: { ...state.todo, value: payload } })),
    clear: () => set((state) => ({ todo: { ...state.todo, value: placeholder.todo } })),
  },
  suggestion: {
    value: placeholder.suggestion,
    set: (payload) => set((state) => ({ suggestion: { ...state.suggestion, value: payload } })),
    clear: () => set((state) => ({ suggestion: { ...state.suggestion, value: placeholder.suggestion } })),
  },
  file: {
    value: placeholder.file,
    set: (payload) => set((state) => ({ file: { ...state.file, value: payload } })),
    clear: () => set((state) => ({ file: { ...state.file, value: placeholder.file } })),
  },
  announcement: {
    value: placeholder.announcement,
    set: (payload) => set((state) => ({ announcement: { ...state.announcement, value: payload } })),
    clear: () => set((state) => ({ announcement: { ...state.announcement, value: placeholder.announcement } })),
  },
}))

export default useFieldStore
