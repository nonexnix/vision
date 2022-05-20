import create from 'zustand'
import IUseFieldStore from './interface'
import placeholder from './placeholder'

const useFieldStore = create<IUseFieldStore>((set) => ({
  project: placeholder.project,
  message: placeholder.message,
  task: placeholder.task,
  todo: placeholder.todo,
  suggestion: placeholder.suggestion,
  file: placeholder.file,
  announcement: placeholder.announcement,
  set: {
    project: (payload) => set({ project: payload }),
    message: (payload) => set({ message: payload }),
    task: (payload) => set({ task: payload }),
    todo: (payload) => set({ todo: payload }),
    suggestion: (payload) => set({ suggestion: payload }),
    file: (payload) => set({ file: payload }),
    announcement: (payload) => set({ announcement: payload }),
  },
  clear: {
    project: () => set({ project: placeholder.project }),
    message: () => set({ message: placeholder.message }),
    task: () => set({ task: placeholder.task }),
    todo: () => set({ todo: placeholder.todo }),
    suggestion: () => set({ suggestion: placeholder.suggestion }),
    file: () => set({ file: placeholder.file }),
    announcement: () => set({ announcement: placeholder.announcement }),
  },
}))

export default useFieldStore
