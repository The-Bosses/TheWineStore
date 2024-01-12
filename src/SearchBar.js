import React,{useState} from "react"


const SearchBar = ({products}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredTerms = products.filter((product) => {
        return product.name.indexOf(searchTerm) !== -1
    })
    
    return(
        <div>
          <label>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => {setSearchTerm(event.target.value)}}
            />
          </label>
          {
            searchTerm.length > 0 ?
            <div>
                <ul>
                    {
                        filteredTerms.map((product) => {
                            return <li>{product.name}</li>
                        })
                    }
                </ul>
            </div> 
            
            : null

          }
      </div>
    )
    
}
export default SearchBar