import {Composition} from 'remotion';
import {MyComposition, calcMyCompMetadata} from './Composition';

export const RemotionRoot: React.FC = () => {
	const fps = 30;
	const numberOfPaintings = 60;
	const paintingDurationInSeconds = 3;
	const transitionDurationInSeconds = 1;

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={600}
				fps={fps}
				width={1280}
				height={720}
				defaultProps={{
					fps: fps,
					numberOfPaintings: numberOfPaintings,
					paintingDurationInSeconds: paintingDurationInSeconds,
					transitionDurationInSeconds: transitionDurationInSeconds,
					paintings: [],
				}}
				calculateMetadata={calcMyCompMetadata}
			/>
		</>
	);
};
