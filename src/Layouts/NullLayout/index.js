import "./NullLayout.css";

function NullLayout({ children }) {
   return (
      <>
         <div className="content">{children}</div>
      </>
   );
}

export default NullLayout;
