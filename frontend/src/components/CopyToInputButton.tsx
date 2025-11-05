interface CopyToInputProps {
    outputCode: string;
    onCopy: (code: string) => void;
  }

  export const CopyToInputButton = ({ outputCode, onCopy }: CopyToInputProps) => {
    return (
      <button
        className="button"
        onClick={() => onCopy(outputCode)}
        disabled={!outputCode}
      >
        Copy to Input
      </button>
    );
  };