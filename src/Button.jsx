import "./App.css";

export default function Button({ title, onClick, children, className }) {
  return (
    <button onClick={onClick} title={title} className={className} >
      {children}
    </button>
  );
}
