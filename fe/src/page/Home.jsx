import { useSelector } from "react-redux";
import banner from "../assets/banner 3.png";
import { validURLConvert } from "../utils/validURL.Convert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductsDisplay from "../components/CategoryWiseProductsDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.products.loadingCategory);
  const categoryData = useSelector((state) => state.products.allCategory);
  const subCategoryData = useSelector((state) => state.products.allSubCategory);
  const navigate = useNavigate()

  const handleRedicrectToProductsList = (id, cat) => {
    const subCategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subCategory.name)}-${subCategory._id}`

    navigate(url)
  }


  return (
    <section className="bg-white rounded">
      <div className="container mx-auto">
        <div className={`w-full h-full ${!banner && "animate-pulse"} rounded my-4 py-4`}>
          <img
            src={banner}
            className="w-full h-full lg:h-[300px] overflow-hidden rounded"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {!loadingCategory ? (
          new Array(12).fill(null).map((c, index) => {
            return (
              <div
                key={index + "loadingCategory"}
                className="bg-white grid gap-2 p-4 rounded min-h-[9rem] shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-[5rem] rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            );
          })
        ) : (
          categoryData.map((cat, index) => {
            return (
              <div onClick={() => handleRedicrectToProductsList(cat._id, cat.name)} key={index || cat._id + "displayCategory"} className="rounded overflow-hidden mx-auto text-center">
                <div className="grid gap-2">
                  <img src={cat.image} alt="" className="w-36 h-36" />
                  <p>{cat.name}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Display Category Products */}
      {
        categoryData.map((c, index) => {
          return (
            <CategoryWiseProductsDisplay key={index || c?._id + "CategorProducts"} id={c?._id} name={c?.name} />

          )
        })
      }
    </section>
  );
};
export default Home;