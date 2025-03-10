import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummarryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProducts from "../components/CardProducts";
import { useSelector } from 'react-redux';
import { validURLConvert } from "../utils/validURL.Convert";

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const allSubCategory = useSelector(state => state.products.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory.length - 1).join(" ");
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummarryApi.getProductsByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8
        }
      });
      const { data: responseData } = res;
      if (responseData.success) {
        if (responseData.data) {
          setData(responseData.data);
          setTotalPage(responseData.totalCount);
        } else {
          setData(prevData => [...prevData, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductsData();
  }, [params]);
  useEffect(() => {
    const sub = allSubCategory.filter(s => {
      return s.category.some(el => el._id === categoryId);
    });
    setDisplaySubCategory(sub);
  }, [params, allSubCategory, categoryId]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[80px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[250px,1fr]">
        {/* Sub category */}
        <div className="min-h-[80vh] max-h-[80vh] overflow-y-scroll lg:py-4 grid gap-1 shadow-md scrollbarCustom" >
          {displaySubCategory.map((s, index) => {
            const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s?.name)}-${s?._id}`
            return (
              <Link to={link} key={s._id || index} className={`w-full p-2 grid gap-4 flex items-center lg:w-full 
              hover:bg-blue-300 cursor-pointer
              ${subCategoryId === s._id ? "bg-blue-300" : ""} 
            `}>
                <div className="w-fit mx-auto">
                  <img src={s.image} alt="subCategory"
                    className="w-14 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-2 text-center text-sm lg:text-md lg:mt-0">{s.name}</p>
              </Link>
            )
          })}
        </div>
        {/* Products */}
        <div>
          <div className="bg-white shadow-md p-2">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="grid grid-cols-1 p-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {data.map((p, index) => (
                <CardProducts data={p} key={p._id + "ProductsSubCategory" + index} />
              ))}
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section >
  );
};
export default ProductsList;