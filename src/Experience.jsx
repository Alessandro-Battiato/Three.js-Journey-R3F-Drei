import { 
    Html,
    TransformControls, 
    OrbitControls,
    PivotControls,
    Text 
} from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cubeRef = useRef(null);
    const sphereRef = useRef(null);

    return <>
        <OrbitControls makeDefault /> 
        {/* 
            The prop enabledDumping is enabled by default to make the animation of the camera movement smooth
            The prop makeDefault solves the issue regarding the TransformControls where dragging the object around caused the camera to move as well    
        */}

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        {/* 
            The prop anchor sets the anchor's position, which is relative to the object's position 
            The prop depthTest set to false forces the anchor on top of the scene
            The prop fixed set to true fixes the size of the anchor to the provided value of the scale
        */}
        <PivotControls 
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={100}
            fixed
        >
            <mesh ref={sphereRef} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                {/* The prop occlude hides the injected HTML whenever the html is hidden while moving the camera around the objects */}
                <Html 
                    position={[1, 1, 0]}
                    wrapperClass='label'
                    center
                    distanceFactor={8}
                    occlude={[sphereRef, cubeRef]}
                >Inject Html into the 3D Object
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={cubeRef} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} mode='translate' />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* Easily add 3D Text */}
        <Text
            font='./bangers-v20-latin-regular.woff'
            fontSize={1}
            color={"salmon"}
            position-y={2}
            maxWidth={2}
            textAlign='center'
        >
            I LOVE R3F
            {/* 
                Adding a mesh Normal Material like this, provides a nice feature to the 3d text just rendered,
                in fact, based on the orientation towards the light, the color of the text changes 
             */}
            <meshNormalMaterial />
        </Text>

    </>
}