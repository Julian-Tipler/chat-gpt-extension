import "./Error.css";

export const Error = ({ message }: { message: string }) => {
  console.log(window.location.href);

  return <div>{message}</div>;
};
