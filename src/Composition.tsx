import {Img,CalculateMetadataFunction} from 'remotion';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {type Painting, fetchPaintings} from './metmuseumApi'


export type MyCompProps = {
	fps: number;
	numberOfPaintings: number;
	paintingDurationInSeconds: number;
	transitionDurationInSeconds: number;
  paintings: Painting[];
};

export const calcMyCompMetadata: CalculateMetadataFunction<MyCompProps> = async ({
  props,
}) => {
  const paintings = await fetchPaintings(props.numberOfPaintings);
  const durationInSeconds = (props.paintingDurationInSeconds-props.transitionDurationInSeconds) * paintings.length;
 
  return {
		durationInFrames: durationInSeconds * props.fps,
    props: {
      ...props,
      paintings: paintings,
    },
  };
};

export const MyComposition:React.FC<MyCompProps> = (props) => {
	return (
		<TransitionSeries>
			{props.paintings.map((painting) => {
				return (
					<>
						<TransitionSeries.Sequence durationInFrames={props.paintingDurationInSeconds*props.fps}>
							<Img style={{margin:'auto',width:'100%',height:'100%', objectFit:'contain', backgroundColor:'black'}} src={painting.primaryImage} />
						</TransitionSeries.Sequence>
						<TransitionSeries.Transition
							presentation={fade()}
							timing={linearTiming({durationInFrames: props.transitionDurationInSeconds*props.fps})}
						/>
					</>
				);
			})}
		</TransitionSeries>
	);
};
