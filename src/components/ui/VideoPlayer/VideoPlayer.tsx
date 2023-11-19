import { useState } from 'react'

import s from './VideoPlayer.module.scss'

type VideoProps = {
  url: string
}

// export const VideoComponent = ({ url }: VideoProps) => {
//   return (
//     <div>
//       <iframe className={s.videoFrame} src={url}></iframe>
//     </div>
//   )
// }

export const VideoComponent = ({ url }: VideoProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={s.videoContainer}>
      {!loaded && <div className={s.loader}></div>}
      <iframe
        className={s.videoFrame}
        src={url}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      ></iframe>
    </div>
  )
}
