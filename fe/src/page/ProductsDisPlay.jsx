import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import SummarryApi from '../common/SummaryApi';
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { displayPriceInVND } from '../utils/DisplayPriceInVNd';
import Divider from '../components/Divider';
import shipped from '../assets/icon/411763.png';
import moneyback from '../assets/icon/moneyback.png';
import support from '../assets/icon/support.png';
import { priceWithDiscount } from '../utils/PriceWithDiscount';
import AddToCartBtn from '../components/AddToCartBtn';

const ProductsDisPlay = () => {
  const params = useParams();
  let productsId = params.products.split("-").slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef(null);

  const fetchProductsDetails = async () => {
    try {
      const res = await Axios({
        ...SummarryApi.getProductsDetails,
        data: {
          productsId: productsId
        }
      })

      const { data: responseData } = res;
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 150;
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 150;
  }


  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-3'>
      <div className="">
        <div className="min-h-56 max-h-56 rounded h-full w-full lg:min-h-96 lg:max-h-96 flex items-center justify-center">
          <img src={data.image[image]} alt=""
            className='w-96 h-full object-scale-down'
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-blue-300 w-3 h-3 rounded-full my-2 ${index === image && "bg-blue-500"}`}></div>
              )
            })
          }
        </div>

        <div className="grid relative">
          <div ref={imageContainer} className="flex relative z-10 w-full overflow-x-auto scrollbar-none gap-3">
            {
              data.image.map((img, index) => {
                return (
                  <div key={img + index} className="min-h-20 min-w-20 w-20 h-20 shadow-md flex items-center">
                    <img src={img} alt="mini products"
                      onClick={() => setImage(index)}
                      className='w-full h-full object-cover' />
                  </div>
                )
              })
            }
          </div>

          <div className="absolute flex justify-between items-center h-full -ml-3 w-full">
            <button onClick={handleScrollLeft} className='z-10 bg-white p-1 shadow-lg rounded-full'><MdKeyboardArrowLeft /></button>
            <button onClick={handleScrollRight} className='z-10 bg-white p-1 shadow-lg rounded-full'><MdKeyboardArrowRight /></button>
          </div>
        </div>

        <div className="">

        </div>


      </div>

      <div className="p-4 col-span-2 lg:pl-7 text-base lg:text-lg">
        <p className='bg-blue-300 w-fit px-2 rounded-full'>10 minutes</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>Unit: {data.unit}</p>
        <Divider />
        <div className="">
          <p className=''>Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-blue-600 px-4 py-2 rounded w-fit bg-blue-50">
              <p className='font-semibold text-lg lg:text-xl'>{displayPriceInVND(priceWithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through text-lg'>{displayPriceInVND(data.price)}</p>
              )
            }
            {
              data.discount > 0 && (
                <p className='text-lg lg:text-2xl font-bold text-blue-500'>
                  {data.discount}% <span className='text-base font-normal text-black'>Discount</span>
                </p>
              )
            }
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2 '>Out of stock</p>
          ) : (
            // <button className='my-4 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded'>Add</button>
            <div className="my-2">
              <AddToCartBtn data={data} />
            </div>
          )
        }

        <div className="">
          <h2 className='font-semibold capitalize'>Why you should by in Kurorumi shop?</h2>

          <div className="">
            <div className="flex items-center gap-4 my-4">
              <div className="border rounded-full shadow-lg p-3 flex">
                <img src={shipped} alt="super fast shipping"
                  className='w-12 h-12'
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Super Fast Shipping</div>
                <p>Super fast delivery in about 2 hours</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-4 my-4">
              <div className="border rounded-full shadow-lg p-3 flex">
                <img src={moneyback} alt="super fast shipping"
                  className='w-20 lg:w-12'
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Best Price & Offers</div>
                <p>Best price destination with offers directly from the nanufacture</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-4 my-4">
              <div className="border rounded-full shadow-lg p-3 flex">
                <img src={support} alt="super fast shipping"
                  className='w-12 h-12'
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Suport 24/7</div>
                <p>Support all time for you</p>
              </div>
            </div>
          </div>
        </div>

        {/* only mobile */}
      </div>
      <div className="my-4 gap-3 grid col-span-3">
        <div className="">
          <p className='font-semibold text-center my-2'>Descriptions</p>
          <p className='text-base'>{data.descriptions}</p>
        </div>

        <div className="">
          <p className='font-semibold'>Unit</p>
          <p className='text-base'>{data.unit}</p>
        </div>
        {/* more_detailse */}
        {
          data?.more_details && Object.key(data?.more_details).map((element, index) => {
            return (
              <div className="">
                <p className='font-semibold text-center my-2'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            )
          })
        }
      </div>

    </section>
  )
}

export default ProductsDisPlay;
