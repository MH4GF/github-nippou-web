export type NippouResult =
  | {
      success: true
      result: string
    }
  | {
      success: false
      error: string
    }
