const compareState = (previous: any, current: any): boolean => {
  return JSON.stringify(previous) === JSON.stringify(current)
}

export default compareState
