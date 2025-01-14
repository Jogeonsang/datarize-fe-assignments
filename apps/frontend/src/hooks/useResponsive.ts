import { useMediaQuery } from 'react-responsive'

const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return { isMobile }
}

export default useResponsive
