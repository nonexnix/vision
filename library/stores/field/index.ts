import create from 'zustand'
import IUseFieldStore from './interface'
import placeholder from './placeholder'

const useFieldStore = create<IUseFieldStore>((set) => ({
  project: placeholder.project,
  message: placeholder.message,
  set: {
    project: (payload) => set({ project: payload }),
    message: (payload) => set({ message: payload }),
  },
  clear: {
    project: () => set({ project: placeholder.project }),
    message: () => set({ message: placeholder.message }),
  },
}))

export default useFieldStore
