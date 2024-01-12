import { useState, useRef, ReactNode, MouseEvent } from "react";
import { MotionStyle, motion } from "framer-motion";

export default function AnimateMouseMovement({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div
			style={{
				minHeight: "100%",
				minWidth: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box>{children}</Box>
		</div>
	);
}

type cssType = {
	box: MotionStyle;
	fly: MotionStyle;
};

const css: cssType = {
	box: {
		position: "relative",
		minWidth: "95%",
		minHeight: "95%",
		background: "transparent",
		cursor: "inherit",
	},
	fly: {
		position: "absolute",
		width: "20px",
		height: "20px",
		margin: "-10px",
		borderRadius: "50%",
		zIndex: 100,
	},
};

function getRelativeCoordinates(
	event: MouseEvent,
	referenceElement: HTMLDivElement | null
) {
	const position = {
		x: event.pageX,
		y: event.pageY,
	};

	const offset = {
		left: referenceElement!.offsetLeft,
		top: referenceElement!.offsetTop,
		width: referenceElement!.clientWidth,
		height: referenceElement!.clientHeight,
	};

	let reference = referenceElement!.offsetParent as HTMLDivElement;

	while (reference) {
		offset.left += reference.offsetLeft;
		offset.top += reference.offsetTop;
		reference = reference.offsetParent as HTMLDivElement;
	}

	return {
		x: position.x - offset.left,
		y: position.y - offset.top,
		width: offset.width,
		height: offset.height,
		centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
		centerY:
			(position.y - offset.top - offset.height / 2) / (offset.height / 2),
	};
}

const Box = ({ children }: { children: ReactNode }) => {
	type mousePositionType = {
		x: number | null;
		y: number | null;
	};

	const [mousePosition, setMousePosition] = useState<mousePositionType>({
		x: null,
		y: null,
	});
	const boxRef = useRef<HTMLDivElement>(null);
	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		setMousePosition(getRelativeCoordinates(e, boxRef.current));
	};
	const [isClicked, setIsClicked] = useState(false);
	setTimeout(() => {
		if (isClicked) {
			setIsClicked(false);
		}
	}, 500);
	return (
		<motion.div
			ref={boxRef}
			onTapStart={() => {
				setIsClicked(true);
			}}
			onTap={() => {
				setIsClicked(false);
			}}
			style={css.box}
			onMouseMove={handleMouseMove}
		>
			<motion.div
				style={{
					...css.fly,
					background: "tranparent",
					outline: "2px solid",
					outlineColor: "invert",
					cursor: "inherit",
					pointerEvents: "none",
				}}
				initial={{
					scale: 1,
				}}
				animate={{
					x: mousePosition.x as number,
					y: mousePosition.y as number,
					scale: isClicked ? 2 : 1,
				}}
				transition={{ type: "spring" }}
			/>

			{children}
		</motion.div>
	);
};
