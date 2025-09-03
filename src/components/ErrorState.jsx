import { FiAlertTriangle } from 'react-icons/fi';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="flex justify-center text-destructive mb-6">
        <div className="p-4 bg-destructive/10 rounded-full">
          <FiAlertTriangle className="w-8 h-8" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        Something went wrong
      </h3>
      <p className="text-muted-foreground mb-8 text-base">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
