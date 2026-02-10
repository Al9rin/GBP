import { Composition } from 'remotion';
import { SetupCompleteRemotion } from '../components/animated/SetupCompleteRemotion';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SetupComplete"
        component={SetupCompleteRemotion}
        durationInFrames={180} // 6 seconds at 30fps
        fps={30}
        width={1200}
        height={800}
        defaultProps={{}}
      />
    </>
  );
};
