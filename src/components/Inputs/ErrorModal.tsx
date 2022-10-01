import './ErrorModal.css';

interface Props {
    errorTitle: string;
    errorMessage: string;
    onConfirm(): void;
}

const ErrorModal = ({ errorTitle, errorMessage, onConfirm }: Props) => {
  return (
    <div>
      <div className="backdrop" onClick={onConfirm} />
        <div className="modal">
            <header>
                <h2>{errorTitle}</h2>
            </header>
            <div className="content">
                <p>{errorMessage}</p>
            </div>
            <footer>
                <button onClick={onConfirm}>OK, got it</button>
            </footer>
        </div>
    </div>
  );
};

export default ErrorModal;