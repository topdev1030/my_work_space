import { usePDF } from "react-to-pdf";

interface PDFComponentProps {
	component: React.ComponentType;
}

const PDFRenderer: React.FC<PDFComponentProps> = ({ component: Component }) => {
	const { targetRef } = usePDF({ filename: "page.pdf" });
	return (
		<div ref={targetRef}>
			<Component />
		</div>
	);
};

export { PDFRenderer };
