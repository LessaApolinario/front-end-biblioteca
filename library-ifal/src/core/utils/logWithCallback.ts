type LoggerFunction = (message: string) => void;

function logWithCallback(message: string, loggerFunction: LoggerFunction) {
  loggerFunction(message);
}

export default logWithCallback;
