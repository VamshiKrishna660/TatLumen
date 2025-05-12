import { TypeAnimation } from 'react-type-animation';

function RotatingText() {
    return (
        <TypeAnimation
          className='font-extrabold bg-gradient-to-t from-neutral-900 to-yellow-200 text-transparent bg-clip-text  text-4xl md:text-5xl'
            sequence={[
                ' WebPages',
                1000,
                ' Documents',
                1000,
                ' Internet',
                1000,
            ]}
            repeat={Infinity}
        />
    );
}

export default RotatingText;