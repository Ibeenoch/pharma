interface TextBetweenProps {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}
const TextBetween: React.FC<TextBetweenProps> = ({ leftChild, rightChild }) => {
  return (
    <div className={`flex justify-between items-center my-2`}>
      {leftChild}
      {rightChild}
    </div>
  );
};

export default TextBetween;
