"use client"
import { useEffect, useState } from "react"

type SetValue<T> = T | ((val: T) => T)

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      if (typeof window !== "undefined") {
        // browser code
        const item = window.localStorage.getItem(key)
        if (item == null) {
          return initialValue
        }

        try {
          const result = JSON.parse(item)
          return result
        } catch (err: any) {
          return item
        }
        // return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue
      // Save state
      if (typeof window !== "undefined") {
        if (typeof valueToStore == 'string') {
          window.localStorage.setItem(key, valueToStore)
        } else if (typeof valueToStore == 'number' || typeof valueToStore == 'boolean') {
          window.localStorage.setItem(key, valueToStore.toString())
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
