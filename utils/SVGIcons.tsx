import { SvgProps } from 'react-native-svg';


const SVGIcons = ({ SvgSrc, fill }: { SvgSrc: React.FC<SvgProps>, fill: string }) => {
    return <SvgSrc fill={fill} color={fill} />;
};

export default SVGIcons