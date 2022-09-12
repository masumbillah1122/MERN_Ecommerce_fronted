import React, { useEffect, useState } from "react";
import axios from "axios";
import { products } from "../data.js";
import "../styles/productsShop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProductShop from "./ProductShop";
import ReactPaginate from "react-paginate";

const ProductsShop = () => {
  //For filter category and all products
  const [data, setData] = useState(products);

  //For Category
  const [category, setCategory] = useState([]);

  //For Paginate.
  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 3;

  const pagesVisited = pageNumber * productPerPage;

  const displayProducts = data
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((item) => <ProductShop item={item} key={item._id} />);

  const pageCount = Math.ceil(data.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Filter and all products.
  const filterResult = (cartItem) => {
    const result = products.filter((curDate) => {
      return curDate.category === cartItem;
    });
    setData(result);
  };

  //For show all category.
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/category");
      setCategory(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-row">
        <div className="shop-col">
          <h2>Category</h2>
          <button className="shop-btn" onclick={() => setData(products)}>
            All <FontAwesomeIcon icon={faChevronRight} />
          </button>
          {category.map((item) => (
            <button
              className="shop-btn"
              onClick={() => filterResult(item.title)}
            >
              {item.title} <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ))}
        </div>
        <div className="shop-col">
          <div className="shop-products">
            {displayProducts}
            {data.map((item) => (
              <ProductShop item={item} key={item._id} />
            ))}
          </div>
          <div className="shop-pagination">
            <ReactPaginate
              previousLabel={"<<"} //for previous
              nextLabel={">>"} //for next
              pageCount={pageCount} //for page number
              onPageChange={changePage} //for selected page, current page
              containerClassName={"paginationBttns"} //class for style
              previousLinkClassName={"previousBttn"} //class for style
              nextLinkClassName={"nextBttn"} //class for style
              disabledClassName={"paginationDisabled"} //class for style
              activeClassName={"paginationActive"} //class for style
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;
