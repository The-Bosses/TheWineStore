// import React, { useState, useEffect } from "react";
// import { Link, useSearchParams } from "react-router-dom";

// const SearchBar = ({ products }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialSearchTerm = searchParams.get("search") || "";
//   const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

//   useEffect(() => {
//     if (searchTerm.trim() !== "") {
//       searchParams.set("search", searchTerm.trim());
//     } else {
//       searchParams.delete("search");
//     }
//   }, [searchTerm, searchParams]);

//   return (
//     <div>
//       <label>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(event) => {
//             setSearchTerm(event.target.value);
//           }}
//         />
//       </label>
//       {searchTerm.length > 0 && (
//         <div>
//           <ul>
//             {products.map((product) => (
//               <li key={product.id}>
//                 <Link to={`/product/${product.id}`}>{product.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
