import { Category } from "@mui/icons-material";

export   function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data });
  });
}

export   function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+id);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsByFilters(filter,sort,pagination) {
  let queryString ='';
  for(let key in filter){
    const categoryValues=filter[key]
    if(categoryValues.length>0){
      const lastCategoryValue= categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
  }
 
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`

  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`

  }

 return new Promise(async (resolve) => {
    try {
      const response = await fetch(`http://localhost:8080/products?${queryString}`);
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error('Error fetching products:', error);
      resolve({ data: [] }); // Return an empty array or handle the error as needed
    }
  });
}