import { useThemeMode } from "@/hooks/useThemeMode"
const DarkModeSwitcher = () => {
  const { isDarkMode, _toogleDarkMode } = useThemeMode()
  return (
    <>
      <button type='button'
        className={`relative h-12 w-12 rounded-full ${isDarkMode ? "bg-yellow-400 text-slate-900" : "bg-slate-900 text-neutral-100"}`}
        onClick={(e) => _toogleDarkMode()}
      >
        {isDarkMode && <i className="fa-solid fa-cloud-sun text-2xl"></i>}
        {!isDarkMode && <i className="fa-solid fa-moon text-2xl"></i>}
      </button>
    </>
  )
}

export default DarkModeSwitcher
