import "./NullLayout.css";

function NullLayout({ children }) {
   return (
      <>
         <div className="null-layout-container">{children}</div>
      </>
   );
}

export default NullLayout;
