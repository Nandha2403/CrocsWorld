import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/NewProduct/action";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { LoadingCompnonent } from "../Components/Loading";

const Women = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isProdLoaded, setIsProdLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("_page")) || 1
  );
  const location=useLocation()
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector((store) => store.newProdReducer);

  const handlePagination = useCallback((value) => {
    if (value > totalPages) {
      setCurrentPage(totalPages)
    }else if (value<1){
      setCurrentPage(1)
    }else{
      setCurrentPage(value)
    }
  },[totalPages]);

  useEffect(() => {
    const fetchData=async ()=>{
      window.scrollTo(0,0)
      const filterParams={
        params:{
          _limit:6,
          _page:currentPage,
          subCategory:searchParams.getAll("filter"),
          category:"women",
          _sort:"offerPrice",
          _order:searchParams.get("_order"),
          discount_gte: searchParams.get("discount_gte"),
          rating_gte:searchParams.get("rating_gte")
        }
      }
      setIsLoading(true)
      await dispatch(getProducts(filterParams))
      setIsProdLoaded(true)
      setIsLoading(false)
    }
    fetchData()
  }, [searchParams,currentPage,dispatch]);

  useEffect(()=>{
    if(product.totalCount){
      setTotalPages(Math.ceil(product.totalCount / 6));
    }
  },[product.totalCount])

  useEffect(()=>{
    window.scrollTo(0,0)
    const params= new URLSearchParams(location.search)
    params.set("_page",currentPage)
    setSearchParams(params)
  },[location.search,currentPage,setSearchParams])
  return (
    <Box>
      {isLoading ? (
        <LoadingCompnonent />
      ) : (
        <>
        {isProdLoaded &&  <Products {...product} />}
        {isProdLoaded && (
            <Pagination
              totalPages={totalPages}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </Box>
  );
};


export default Women